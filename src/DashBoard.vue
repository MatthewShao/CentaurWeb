<template>
  <div class="main mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <my-header></my-header>
    <side-bar></side-bar>
    <main class="mdl-layout__content">
      <div class="mdl-container">
      <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style>

	@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://example.com/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: local('Material Icons'),
       local('MaterialIcons-Regular'),
       url(/static/MaterialIcons-Regular.woff2) format('woff2'),
       url(/static/MaterialIcons-Regular.woff) format('woff'),
       url(/static/MaterialIcons-Regular.ttf) format('truetype');
}
	
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
  .main {
      background: url('assets/wallhaven-239458.jpg') center / cover;
  }

  .main-container{
    margin: 0 auto;
    max-width: 1600px;
    width: calc(100% - 16px);
  }
</style>

<script>
import MyHeader from './components/MyHeader'
import SideBar from './components/SideBar'

export default {
  components: {
    MyHeader, SideBar 
  }
}
</script>


