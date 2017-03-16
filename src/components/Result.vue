<template>
<div class="mdl-grid">
	<div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
	<div class="result-container mdl-cell mdl-cell--8-col mdl-shadow--4dp mdl-color-text--grey-800">
		<div class="result-header mdl-color--deep-purple-800 mdl-color-text--white">
			<h4>Result</h4>
			
			<mdl-textfield id="demo-expandable-button" :value.sync="search" expandable="search"></mdl-textfield>
			<button v-on:click="update_result()" class="mdl-button mdl-js-button mdl-button--icon">
  			<i class="material-icons">refresh</i>
			</button>

		</div>	
		<table class="result-table mdl-data-table mdl-js-data-table mdl-data-table mdl-shadow--2dp">
			<thead>
				<tr>
					<th class="mdl-data-table__cell--non-numeric">URL</th>
					<th class="mdl-data-table__cell--non-numeric">Script</th>
					<th class="mdl-data-table__cell--non-numeric">Status</th>
					<th>Code</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="result in results | filterBy search ">
				<tr>
					<td class="mdl-data-table__cell--non-numeric"><a href="{{result.url}}">{{result.url | truncate '50'}}</a></td>
					<td class="mdl-data-table__cell--non-numeric">{{result.poc | uppercase}}</td>
					<td class="mdl-data-table__cell--non-numeric">{{result.msg | truncate '15'}}</td>
					<td>{{result.code}}</td>
					<td>
						<button v-on:click="delete(result)" class="mdl-button mdl-js-button mdl-button--icon">
  						<i class="material-icons">delete</i>
						</button>

						<button v-on:click="mark(result)" v-bind:class="{'mdl-button--accent':result.mark}" class="mdl-button mdl-js-button mdl-button--icon">
  						<i class="material-icons">priority_high</i>
						</button>
					</td>
				</tr>
				</template>
			</tbody>
		</table>
		<div class=item-counter mdl-color-text--grey-800>
			<p>{{item_each_page}} items/page</p>
			<mdl-slider v-on:mouseup="update_item_each_page()" :value.sync="item_each_page" min="10" max="50" step="5"></mdl-slider>
			<button v-bind="{'disabled':!has_prev}" v-on:click="prev_page()" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
  			<i class="material-icons">navigate_before
</i>
			</button>
			<p>{{pageId}}</p>
			<button v-on:click="next_page()" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
  			<i class="material-icons">navigate_next
</i>
			</button>
		</div>
	</div>
</div>
</div>
	<mdl-snackbar display-on="msg"></mdl-snackbar>
</template>
<style>
	.result-table {
		width: 100%;
	}
	.result-container{
		border-radius: 4px;
	}
	.result-header {
		display: flex;
		justify-content: flex-end;
	}
	.result-header > h4 {
		margin-top: 10px;
		padding: 10px;
		margin-right:auto;
	}
	.result-header > .mdl-textfield {
		margin-top:auto;
	}
	.result-header > button {
		margin-top: 25px;

	}
	.item-counter {
		display: flex;
		background: #fff;
		padding:10px;
	}
	.item-counter > * {
		margin: auto;
	}
	.status {
		max-width: 40px;
	}
	.mdl-data-table td {
		padding: 3px 9px;
	}
</style>
<script>
import Vue from 'vue'

export default{
	data () {
		return {
			item_each_page: 30,
			pageId: parseInt(this.$route.params['pageId']),
			results: '',
			search: ''
		}
	},

	ready () {
		//	retrive how many item in one page
		this.$http.get('/api/update/result').then((response) => {
			this.item_each_page = response.body.item_each_page
		}, (respopnse) => {
			this.$broadcast('msg', {message: 'Network Error.'})
		})
		this.get_results()
	},
	methods: {
		update_item_each_page: function () {
			this.$http.get('/api/update/result?item_each_page=' + this.item_each_page).then((response) => {
			}, (response) => {
				this.$broadcast('msg', {message: 'Network Error.'})
			})
		},

		get_results: function () {
			this.$http.get('/api/list/result/' + this.pageId).then((response) => {
				this.results = response.body
			}, (response) => {
				this.$broadcast('msg', {message: 'Network Error'})
			})
		},

		update_result: function () {
			this.$http.post('/api/update/result').then((response) => {
				this.$broadcast('msg', {message: 'Result Updated'})
				this.get_results()
			}, (response) => {
				this.$broadcast('msg', {message: response.body.msg})
			})
		},

		next_page: function () {
			this.pageId += 1
			this.$router.go({name: 'resultList', params: {pageId: this.pageId}})
			this.get_results()

		},

		prev_page: function () {
			this.pageId -= 1
			this.$router.go({name: 'resultList', params: {pageId: this.pageId}})
			this.get_results()

		},

		mark: function (result) {
			this.$http.post('/api/result/' + result._id, {'mark': !result.mark}).then((response) => {
				Vue.set(result, 'mark', !result.mark)
			}, (response) => {
				this.$broadcast('msg', {message: 'Network Error.'})
			})
		},

		delete: function (result) {
			this.$http.delete('/api/result/' + result._id).then((response) => {
				this.results.$remove(result)
			}, (response) => {
				this.$broadcast('msg', {message: 'Network Error.'})
			})
		}

	},
	computed: {
		has_prev: function () {
			return this.pageId > 1
		}
	},

	filters : {
		truncate: function (string, value) {
			if (string.length > value){
				return string.substring(0, value) + '...';
			}
			else {
				return string
			}
		}
	}
}
</script>