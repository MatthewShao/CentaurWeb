<template>
<div class="mdl-grid">
	<div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
	<!-- script card -->
	<div class="card-cell mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--8-col-phone">
		<div id="script-card" v-on:click="go('/script')" v-on:mouseover="mouseover('#script-card')" v-on:mouseout="mouseout('#script-card')" class=" mdl-card mdl-shadow--8dp">
			<div class="mdl-card__title">
				<h3>Script</h3>
			</div>
			<div class="mdl-card__supporting-text">
				Mange all scripts configuration
			</div>
			<div class="mdl-card__menu">
				<i class="material-icons">code</i>
			</div>
		</div>
	</div>
	<!-- script card end -->

	<!-- job card -->
	<div class="card-cell mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--8-col-phone">
		<div id="job-card" v-on:click="go('/job')" v-on:mouseover="mouseover('#job-card')" v-on:mouseout="mouseout('#job-card')" class=" mdl-card mdl-shadow--8dp">
			<div class="mdl-card__title">
				<h3>Job</h3>
			</div>
			<div class="mdl-card__supporting-text">
				View all undergoing jobs	
			</div>
			<div class="mdl-card__menu">
				<i class="material-icons">assignment</i>
			</div>
		</div>
	</div>
	<!-- job card end -->
</div>

<div class="mdl-grid">
	<div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
	<!-- worker card -->
	<div class="card-cell mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--8-col-phone">
		<div id="worker-card" v-on:click="go('/worker')" v-on:mouseover="mouseover('#worker-card')" v-on:mouseout="mouseout('#worker-card')" class=" mdl-card mdl-shadow--8dp">
			<div class="mdl-card__title">
				<h3>Worker</h3>
			</div>
			<div class="mdl-card__supporting-text">
				All your reliable Workers
			</div>
			<div class="mdl-card__menu">
				<i class="material-icons">find_in_page</i>
			</div>
		</div>
	</div>
	<!-- worker card end -->

	<!-- result card -->
	<div class="card-cell mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--8-col-phone">
		<div id="result-card" v-on:click="go('/result/1')" v-on:mouseover="mouseover('#result-card')" v-on:mouseout="mouseout('#result-card')" class=" mdl-card mdl-shadow--8dp">
			<div class="mdl-card__title">
				<h3>Result</h3>
			</div>
			<div class="mdl-card__supporting-text">
				Juicy result	
			</div>
			<div class="mdl-card__menu">
				<i class="material-icons">bug report</i>
			</div>
		</div>
	</div>
	<!-- result card end -->
</div>

</template>
<style>
.card-cell > .mdl-card {
width: 100%;
}
.card-cell {
	margin: 20px;
	cursor: pointer;
}
.mdl-card > .mdl-card__menu {
color: #fff;
}

#script-card > .mdl-card__title {
color: #fff;
height: 130px;
background: #C62828;
}

#job-card > .mdl-card__title{
	color:#fff;
	height:130px;
	background: #AD1457;
}
#worker-card > .mdl-card__title{
	color:#fff;
	height:130px;
	background: #6A1B9A;
}#result-card > .mdl-card__title{
	color:#fff;
	height:130px;
	background: #4527A0;
}
</style>

<script>
import $ from 'jquery'

	export default {
		methods: {
			go: function (path) {
				this.$router.go(path)
			},
			mouseover: function (id) {
				$(id).addClass('mdl-shadow--16dp')
			},
			mouseout: function (id) {
				$(id).removeClass('mdl-shadow--16dp')
			}
		}
  }

</script>