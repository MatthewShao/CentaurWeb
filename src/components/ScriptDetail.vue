<template>
<div class="mdl-grid">
	<div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
<div class="script-detail mdl-cell mdl-cell--8-col mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800">
	<h3>{{script_name | uppercase}}</h3>
	<button class="rule-box" v-on:click="$refs.change.open()">{{{render_rules}}}</button>
	<editor :content.sync="content" lang="python" theme="tomorrow" height="600px"></editor>
	<button v-on:click="$refs.update.open()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Update</button>
</div>
</div>

<mdl-dialog v-ref:change title="Change Rules">
	<mdl-textfield :value.sync="json_rules" floating-label="Rules" textarea rows="2"></mdl-textfield>
	<template slot="actions">
    <mdl-button primary @click="$refs.change.close()">close</mdl-button>
    <mdl-button accent primary @click="update_rules()">Change</mdl-button>
  </template>
</mdl-dialog>

<mdl-dialog v-ref:update title="Update Script?">
    <template slot="actions">
    <mdl-button primary @click="$refs.update.close()">No</mdl-button>
    <mdl-button accent primary @click="update_script()">Yes</mdl-button>
  </template>
</mdl-dialog>
<mdl-snackbar display-on="msg"></mdl-snackbar>
</template>
<style>
	.script-detail{
		border-radius: 2px;
		margin-bottom: 80px;
		padding: 28px 28px;
	}
	.script-detail > h3{
		margin: 5px 0;
	}

	.is-small-screen .script-detail{
		padding:14px 14px;
	}

	.script-detail > button {
		margin-top: 10px;
	}

	.rule-box {
		outline: none;
		border: none;
		cursor:pointer;
		background: 0 0;
	}

	.relation {
		display: flex;
		border-radius: 4px;
		background-color: #ff5252;
		padding: 3px 7px;
		color :#fff;
		text-align: center;

	}
	.rule {
		display: inline-block;
		min-width: 10px;
		padding: 3px 7px;
		color: #fff;
		text-align: center;
		background-color: #C62828;
		margin: 5px;
		border-radius: 4px;
	}
	.ace_editor {
		margin-top: 5px;
	}
</style>

<script>
export default {
	data () {
		return {
			script_name: this.$route.params['script_name'],
			content: '',
			rules: [],
			render_rules : ''
		}
	},

	methods: {
		parse_rules: function(r) {
			if (r[0] == "-") {
				return `<div class='rule'><b>${r[1]}</b>   ${r[2]}</div>`
			}
			else if (r[0] == '|' || r[0] == '&') {
				if (r[0] == '|'){
					var relation = "OR"	
				}
				else if (r[0] == '&'){
					var relation = "AND"
				}
				return `<div class='relation'><b>${relation}</b> ${this.parse_rules(r[1])} ${this.parse_rules(r[2])}</div>`
			}
			else{
				return "<div class='rule'><b>All</b></div>"
			}
		},

		update_rules: function() {
			this.$http.post('/api/script/' + this.script_name, {'action':'set_rule', 'invoke_rule': this.rules})
				.then((response) => {
					this.$broadcast('msg', {message: 'Rules Updates.'})
					this.$refs.change.close()	
					this.render_rules = this.parse_rules(this.rules)
				}, (response) => {
					this.$broadcast('msg', {message: 'Failed.'})
				})
		},

		update_script: function() {
			this.$http.put('/api/script/' + this.script_name, {'file': this.content})
				.then((response) => {
					this.$broadcast('msg', {message: 'Script Updated.'})
					this.$refs.update.close()	
				}, (response) => {
					this.$broadcast('msg', {message: 'Failed.'})
				})
		}
	},

	ready () {
		this.$http.get('/api/script/' + this.script_name)
			.then((response) => {
				this.rules = response.body.invoke_rule
				this.render_rules = this.parse_rules(this.rules)
			}, (response) => {
				this.$broadcast('msg', {message: 'Network Error.'})
			})

		this.$http.get('/api/download/script/' + this.script_name).then((response) => {
				this.content = response.body
		}, (response) => {
			this.content = 'Unavaliable.'
			//failed
		})

	},

	components: {
		editor: require('vue-ace-editor')
	},

	events: {
		'vue-ace-editor:init':function () {
			require('brace/mode/python')
			require('brace/theme/tomorrow')
		}
	},

	computed: {
		json_rules: {
			get: function () {
				return JSON.stringify(this.rules)
			},
			set: function (v) {
				this.rules = JSON.parse(v)
			}
		} 
	}
}
</script>