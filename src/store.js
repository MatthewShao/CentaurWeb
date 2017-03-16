import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	user: null,
	token: null,
	test: 'test abc'
}

const mutations = {
	SET_USER (state, user) {
		state.user = user
	},

	SET_TOKEN (state, token) {
		state.token = token
	}
}

export default new Vuex.Store({
	state, mutations
})
