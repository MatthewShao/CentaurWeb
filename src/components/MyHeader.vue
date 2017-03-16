<template>
<header class="mdl-layout__header mdl-layout__header--transparent ">
	<div class="mdl-layout__header-row">
		<!-- Title -->
		<span class="mdl-layout-title">Centaur</span>
		<!-- Add spacer, to align navigation to the right -->
		<div class="mdl-layout-spacer"></div>
		<!-- Navigation -->
		<nav class="mdl-navigation">
			<!-- Right aligned menu below button -->
			<button id="top-right"
			class="mdl-button mdl-js-button mdl-button--icon">
			<i class="material-icons">account_circle</i>
			</button>
			<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
				for="top-right">
				<li class="mdl-menu__item">{{user | capitalize}}</li>
				<li class="mdl-menu__item">Another Action</li>
				<li disabled class="mdl-menu__item">Disabled Action</li>
				<li v-on:click="logout" class="mdl-menu__item">Logout</li>
			</ul>
		</nav>
	</div>
</header>
</template>
<style>
.mdl-layout__header{
color: white;
}
</style>
<script>
	export default {
    data: function () {
      return {
      	user: this.$store.state.user
      }
    },
    methods: {
      logout: function () {
      		this.$root.logout()
      }
    }
  }
</script>