import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import App from './App'
import DashBoard from './DashBoard'
import Login from './Login'
import Welcome from './components/Welcome'
import Script from './components/Script'
import ScriptDetail from './components/ScriptDetail'
import Job from './components/Job'
import Worker from './components/Worker'
import Result from './components/Result'
import store from './store'
import 'animate.css'
import 'material-design-lite/material'
import VueMdl from 'vue-mdl'

Vue.use(VueMdl)
Vue.use(Router)
Vue.use(Resource)

var router = new Router({
  history: true,
  saveScrollPosition: true,
  transitionOnLoad: true
})

router.map({
  '/': {
  	auth: true,
    component: DashBoard,
    subRoutes: {
    	'/index': {
    		component: Welcome
    	},
      '/script': {
        component: Script
      },
      '/script/:script_name': {
        component: ScriptDetail,
        name: 'scriptDetail'
      },
      '/job': {
        component: Job
      },
      '/worker': {
        component: Worker
      },
      '/result/:pageId': {
        component: Result,
        name: 'resultList'
      }
    } 
  },
  '/login': {
  	component: Login
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach(function (transition) {
  // window.console.log('Transition', transition)
  if (transition.to.auth && (transition.to.router.app.$store.state.token === 'null')) {
    window.console.log('Not authenticated')
    transition.redirect('/login')
  } else {
    transition.next()
  }
})

// Vue.http.interceptors.push({
//   request: function (request) {
//     var headers = request.headers

//     if (window.location.pathname !== '/login' && !headers.hasOwnProperty('Authorization')) {
//       headers.Authorization = this.$store.state.token
//     }
//     // console.log(headers)
//     return request
//   },
//   response: function (response) {
//     return response
//   }
// })

Vue.http.interceptors.push((request, next) => {
    var headers = request.headers.map
    if (window.location.pathname !== '/login' && !headers.hasOwnProperty('Authorization')) {       
      headers.Authorization = ['token ' + store.state.token]
     }
    next((response) => {
      if (response.status === 401) {
        router.go('login')
      }
    })
})

router.start(App, '#root')
