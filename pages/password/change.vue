<template>
  <div class="stage center small">
    <transition name="slide-fade" mode="out-in">
      <form
        v-if="state == 0"
        key="form"
        class="form small"
        @submit="changePassword()"
      >
        <h1>Change your password</h1>
        <div class="fields">
          <div class="field--item">
            <label class="equal-small" for="password">New password</label>
            <input
              ref="password"
              v-validate="'required|min:8'"
              name="password"
              type="password"
              placeholder="Enter new password"
            />
            <span
              v-show="errors.has('password')"
              class="alert"
              v-text="errors.first('password')"
            />
          </div>
          <div class="field--item">
            <label class="equal-small" for="password">Confirm password</label>
            <input
              v-model="data.password"
              v-validate="'required|confirmed:password'"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              data-vv-as="password"
            />
            <span
              v-show="errors.has('confirmPassword')"
              class="alert"
              v-text="errors.first('confirmPassword')"
            />
          </div>
        </div>
      </form>
      <div v-if="state == 1" key="success" class="center">
        <h2>Your new password is saved</h2>
        <p>Your password has been changed successfully. You can now login.</p>
        <b-link :to="'/login'" class="mt-2">login</b-link>
      </div>

      <div v-else key="error">
        <p>We were unable to change your password. Please try again later.</p>
      </div>
    </transition>
    <toolbar v-if="state == 0">
      <b-link @click.native="submit()" v-text="'Change password'" />
    </toolbar>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      state: 0,
      data: {
        requestToken: '',
        confirmPassword: '',
        password: ''
      }
    }
  },
  mounted() {
    this.data.requestToken = this.$route.query.requestToken
    this.$store.commit('nav/setTitle', 'Change password')
    this.$store.commit('nav/setBackUrl', '/login')
  },
  methods: {
    async submit() {
      try {
        if (await this.$validator.validateAll()) {
          await this.$axios.put('/profile/reset-password', this.data)
          this.state = 1
        }
      } catch (err) {
        this.state = 2
      }
    }
  }
}
</script>
