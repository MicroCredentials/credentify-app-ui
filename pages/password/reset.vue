<template>
  <div class="stage center small">
    <transition name="slide-fade" mode="out-in">
      <form v-if="!isSubmited" key="form" @submit="resetPassword()">
        <h1 class="text-center">Password reset</h1>
        <div class="fields">
          <div class="field--item">
            <label class="equal-small" for="email">Email</label>
            <input
              v-model="data.email"
              v-validate="'required|email'"
              name="email"
              type="text"
              placeholder="Enter your email to reset your password"
            />
            <span
              v-show="errors.has('email')"
              class="alert"
              v-text="errors.first('email')"
            />
          </div>
        </div>
      </form>
      <div v-else key="done" class="text-center">
        <h2 class="mb-1">Confirmation sent</h2>
        <p>
          Check your inbox for confirmation e-mail and click on provided link.
        </p>
      </div>
    </transition>
    <toolbar v-if="!isSubmited">
      <b-link @click.native="resetPassword()" v-text="'Reset password'" />
    </toolbar>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'login',
  data() {
    return {
      isSubmited: false,
      data: {
        email: ''
      }
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Lost password')
    this.$store.commit('nav/setBackUrl', '/login')
  },
  methods: {
    async resetPassword() {
      try {
        if (await this.$validator.validateAll()) {
          await this.$axios.post('profile/reset-password/request', this.data)
          this.isSubmited = true
        }
      } catch (err) {
        this.handleErrors(err)
      }
    }
  }
}
</script>
