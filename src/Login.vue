<template>
<div class="mdl-color--grey-800 mdl-layout mdl-js-layout">
	<div class="mdl-grid">
		<div class="mdl-card mdl-shadow--16dp util-center util-spacing-h--80px animated" :class="{'shake': failed}">
			<div class="mdl-card__title mdl-color--black">
				<h2 class="mdl-card__title-text mdl-color-text--white">User Login</h2>
			</div>
			<div class="mdl-card__supporting-text mdl-grid">
				
				<b v-if="msg" class="mdl-color-text--red">{{msg }}</b>
				
				<form method="POST" @submit.prevent="login">
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
						<label class="mdl-textfield__label mdl-color-text--grey" for="textfield_username">Username</label>
						<input v-model="username" class="mdl-textfield__input" type="text" id="textfield_username" name="username"/>
					</div>
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
						<label class="mdl-textfield__label mdl-color-text--grey" for="textfield_password">Password</label>
						<input v-model="password" class="mdl-textfield__input" type="password" id="textfield_password" name="password"/>
					</div>
					<div class="mdl-cell mdl-cell--12-col send-button" align="center">
						<button type="submit"  class="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored mdl-color--red-700 mdl-color-text--white">
						Log In
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</template>

<style>
    .util-center {
        margin: auto;
    }

    .util-max-512px {
        max-width: 512px;
    }

    .util-spacing-h--80px {
        margin-top: 80px;
        margin-bottom: 80px
    }
    .util-no-decoration {
        text-decoration: none;
    }

</style>

<script>
	module.exports = {
		name: 'Login',
		data: function (router) {
			return {
				password: '',
				username: '',
				msg: '',
				failed: false,
				success: false
			}
		},

		methods: {
			login: function () {
				this.failed = false
				this.$http.post('/api/login', 
				{	username: this.username,
					password: this.password
				}).then((response) => {
					var data = response.data
					if (data.token) {
						this.$store.dispatch('SET_USER',this.username)
						this.$store.dispatch('SET_TOKEN', data.token)
					}

					if (window.localStorage) {
						window.localStorage.setItem('user', this.username)
						window.localStorage.setItem('token', data.token)
					}
					this.$router.go('/index')
					componentHandler.upgradeAllRegistered()
				}, (response) => {
					var data = response.data
					if (data.msg) {
						this.msg = data.msg
						this.failed = true
					}
				})
			}
		}

	}
</script>