<template>
<div class="mdl-layout__drawer">
	<span class="mdl-layout-title">Advanced Scanner</span>
	<nav class="mdl-navigation">
		<a v-link="'/index'" class="mdl-navigation__link" href="">Home</a>
		<a v-link="'/script'" class="mdl-navigation__link" href="">Script</a>
		<a v-link="'/job'" class="mdl-navigation__link" href="">Job</a>
		<a v-link="'/worker'" class="mdl-navigation__link" href="">Worker</a>
		<a v-link="'/result/1'" class="mdl-navigation__link" href="">Result</a>
	</nav>
</div>
</template>
<style>
	.mdl-layout__drawer-button i {
		color: white;
	}
</style>
<script>
</script>