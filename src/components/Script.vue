<template>
<div class="mdl-grid">
	<div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
	<div class="mdl-cell mdl-cell--8-col">
		<ul class="demo-list-three mdl-list">
		<li v-for="script in scripts" class="script-item mdl-list__item mdl-list__item--three-line mdl-color--white">
				<span class="mdl-list__item-primary-content">
					<i class="material-icons mdl-list__item-avatar">code</i>
					<a v-link="{ name: 'scriptDetail', params: {script_name: script.name}}">{{script.name | uppercase}}</a>
					<span class="mdl-list__item-text-body">
							{{script.desc}}</span>
					
				</span>
				<span class="mdl-list__item-secondary-content">
					<mdl-switch @click.prevent="toggle(script)" :checked.sync="script.is_enable" class="mdl-js-ripple-effect mdl-list__item-secondary-action">{{script.is_enable? 'Enable': 'Disable'}}</mdl-switch>

					<span class="mdl-list__item-secondary-info mdl-chip mdl-chip--contact">
    					<span class="mdl-chip__contact mdl-color--red-700 mdl-color-text--white">{{script.rule_type}}</span>
    					<span class="mdl-chip__text">{{script.rule_pattern}}</span>
					</span>
				</span>
			</li>
 </ul>
		</div>
	</div>
</div>
</template>
<style>
	.script-item{
		margin: 5px;
	}
	a {
		text-decoration: none;
	}
   .mdl-list__item-secondary-content >.mdl-chip{
		width: 100px;
	}
</style>
<script>
export default {
	data () {
		return {
			scripts: []
		}
	},
	methods: {
		toggle: function (script) {
			this.$http.post('/api/script/' + script.name, {'action': 'toggle'}).then((response) => {
					script.is_enable = !script.is_enable
			}, (response) => {

			})
		}
	},

	ready () {	
		this.$http.get('/api/list/script').then((response) => {
			this.$set('scripts', response.body.scripts)
			for (var i = this.scripts.length - 1; i >= 0; i--) {
				var script = this.scripts[i]
			 	var rules = script.invoke_rule
			 	if (rules[0] == '-'){
			 		script.rule_type = rules[1]
			 		script.rule_pattern = rules[2]
			 	}
			 	else if (rules[0] == '&' || rules[0] == '|' ){
			 		script.rule_type = rules[0]
			 		script.rule_pattern = rules.length
			 	}
			 	else{
			 		script.rule_type = 'A'
			 		script.rule_pattern = 'Accept All'
			 	}

			}
		}, (response) => {
			console.log(response.body)
		})
  }
}
</script>
