<template>
  <div class="stage small center">
    <transition name="layout" mode="out-in">
      <div v-if="state === 'loading'" key="loading" class="loading">
        <img src="~/assets/icons/loader.svg" alt="Loading" />
      </div>
      <div v-if="state === ''" key="form">
        <h1 class="text-center">Log in</h1>
        <form class="form small" @keyup.enter="userLogin()">
          <div class="fields">
            <div class="field--item">
              <label class="equal-small" for="email">Email</label>
              <input
                v-model="email"
                v-validate="'required|email'"
                name="email"
                type="text"
                placeholder="Enter your email"
              />
              <span
                v-show="errors.has('email')"
                class="alert"
                v-text="errors.first('email')"
              />
            </div>
            <div class="field--item">
              <label class="equal-small" for="password">Password</label>
              <input
                v-model="password"
                v-validate="'required'"
                name="password"
                :type="passwordFieldType"
                placeholder="Enter identifier which fits here"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :style="{ cursor: 'pointer' }"
                width="29"
                height="21"
                viewBox="0 0 29 21"
                fill-rule="evenodd"
                clip-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                @click="switchVisibility()"
              >
                <path
                  d="M28 10.3v.1l-.4.4c-1.6 1.6-3.5 3.5-5.7 5a14.1 14.1 0 0 1-7.9 2.7c-6 0-9.5-3.6-13.5-7.7l-.5-.5c3-3 5-4.7 7-6a13 13 0 0 1 7-2.1c6 0 10.6 4.3 14 8.1zm-14 5.9c3.2 0 5.8-2.7 5.8-5.9S17.2 4.5 14 4.5a5.9 5.9 0 0 0-5.8 5.8c0 3.2 2.6 5.9 5.8 5.9zm-.4-8c0 1.4 1.1 2.6 2.5 2.6.5 0 1-.2 1.4-.5A3.5 3.5 0 1 1 14 6.8c-.3.4-.4.9-.4 1.4z"
                  fill="#E4E4E7"
                  fill-rule="nonzero"
                />
                <path
                  v-if="passwordFieldType === 'text'"
                  fill="#E4E4E7"
                  d="M22.7 0l1.6 1.7-19 19L3.7 19z"
                />
              </svg>
              <span
                v-show="errors.has('password')"
                class="alert"
                v-text="errors.first('password')"
              />
            </div>
          </div>
          <div class="links">
            <n-link to="/password/reset">
              Forgot password?
            </n-link>
            <n-link to="/signup" class="ml-1">
              Sign up
            </n-link>
          </div>
        </form>
      </div>
      <div v-if="state === 'error'" key="error" class="small">
        {{ errors.first('response') }}
      </div>
    </transition>
    <toolbar>
      <b-link @click.native="userLogin()">
        Log in
      </b-link>
    </toolbar>
    <sweet-modal ref="errorModal" title="Error" overlay-theme="dark">
      <p>{{ errors.first('response') }}</p>
      <b-link @click.native="$refs.errorModal.close()">
        Close
      </b-link>
    </sweet-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: '',
      email: '',
      password: '',
      passwordFieldType: 'password'
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Welcome to Credentify')
    this.$store.commit('nav/setBackUrl', '')
  },
  methods: {
    async userLogin() {
      try {
        if (await this.$validator.validateAll()) {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
        }
      } catch (err) {
        this.handleErrors(err)
      }
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
    }
  }
}
</script>
