<template>
  <div class="stage small center">
    <h1 class="text-center">Signup</h1>
    <transition name="slide-fade" mode="out-in">
      <div v-if="isSubmited" key="requested" class="text-center">
        <p>Your request for new account has been proceeded.</p>
        <p>Please check your email inbox and confirm your account.</p>
        <b-link to="/login" class="mt-2">Log in</b-link>
      </div>
      <div v-else key="signup" class="form small">
        <div class="fields">
          <div class="field--item">
            <label class="equal-small">First name</label>
            <input
              v-model="data.firstName"
              v-validate="'required'"
              data-vv-as="first name"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
            />
            <span
              v-show="errors.has('firstName')"
              class="alert"
              v-text="errors.first('firstName')"
            />
          </div>
          <div class="field--item">
            <label class="equal-small">Last name</label>
            <input
              v-model="data.lastName"
              v-validate="'required'"
              data-vv-as="last name"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
            />
            <span
              v-show="errors.has('lastName')"
              class="alert"
              v-text="errors.first('lastName')"
            />
          </div>
          <div class="field--item">
            <label class="equal-small">Email address</label>
            <input
              v-model="data.email"
              v-validate="'required'"
              data-vv-delay="1000"
              name="email"
              type="text"
              :placeholder="
                errors.first('email')
                  ? errors.first('email')
                  : 'Enter your valid e-mail address'
              "
            />
            <span
              v-show="errors.has('email')"
              class="alert"
              v-text="errors.first('email')"
            />
          </div>
          <div class="field--item">
            <label class="equal-small">Password</label>
            <input
              v-model="data.password"
              v-validate="'required|min:8'"
              data-vv-delay="1000"
              name="password"
              :type="passwordFieldType"
              placeholder="Enter your strong password"
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
          <div class="field--item">
            <label for="alerts" class="pointer legal">
              <input
                id="alerts"
                v-model="data.legal"
                v-validate="'required'"
                name="legal"
                type="checkbox"
                class="switch"
              />
              I agree with
              <a
                href="/Credentify_Privacy_Policy.pdf"
                target="_blank"
                v-text="'Credentify Privacy Policy'"
              />
              and
              <a
                href="/Credenty_Terms_of_Use.pdf"
                target="_blank"
                v-text="'Terms of Use'"
              />.
            </label>
            <span
              v-show="errors.has('legal')"
              class="alert"
              v-text="
                'You have to agree to our Privacy Policy and Terms of Use.'
              "
            />
          </div>
        </div>
        <div class="links">
          <n-link to="/login">Already signed up? Log in</n-link>
        </div>
      </div>
    </transition>

    <toolbar v-if="!isSubmited">
      <b-link to @click.native="createUser()" v-text="'Register'" />
    </toolbar>
  </div>
</template>

<script>
export default {
  auth: false,
  fetch({ store, redirect }) {
    if (store.state.auth.loggedIn) {
      return redirect('/institutions')
    }
  },
  data() {
    return {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        legal: false
      },
      passwordFieldType: 'password',
      isSubmited: false
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Sign Up')
    this.$store.commit('nav/setBackUrl', '')
  },
  methods: {
    async createUser() {
      try {
        if (await this.$validator.validate()) {
          await this.$axios.post('profile/request', this.data)
          this.isSubmited = true
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

<style lang="scss" scoped>
.legal a {
  padding: 0 5px;
  text-decoration: underline;

  &:hover {
    color: $primary;
  }
}
</style>
