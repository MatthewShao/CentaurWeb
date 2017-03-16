<template>
    <router-view></router-view>
</template>

<script>
  import store from './store'
  // Check local storage to handle refreshes
  if (window.localStorage) {
    if (store.state.user !== window.localStorage.getItem('user')) {
      store.dispatch('SET_USER', window.localStorage.getItem('user'))
      store.dispatch('SET_TOKEN', window.localStorage.getItem('token'))
    }
  }
  export default {
    name: 'App',
    store: store,
    data: function () {
      return {
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('SET_USER', null)
        this.$store.dispatch('SET_TOKEN', null)
        if (window.localStorage) {
          window.localStorage.setItem('user', null)
          window.localStorage.setItem('token', null)
        }
        this.$router.go('/login')
        componentHandler.upgradeAllRegistered()
      }
    }
  }
</script>