<template>
  <div class="stage center small text-center">
    <transition name="slide-fade" mode="out-in">
      <div v-if="state == 0" key="loading">
        <img src="~/assets/icons/loader.svg" alt="Loading" />
      </div>
      <div v-else-if="state == 1" key="success">
        <h2>Success!</h2>
        <p>Your account has been created successfully!</p>
        <b-link to="/login" class="mt-1">Log in</b-link>
      </div>
      <div v-else key="error">
        <h2>Something went wrong</h2>
        We were unable to create an account. <br />
        Please check yout URL and try again.
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      state: 0,
      data: {
        requestToken: ''
      }
    }
  },
  mounted() {
    this.data.requestToken = this.$route.query.requestToken
    this.data.requestToken ? this.submit() : (this.state = 2)
  },
  methods: {
    async submit() {
      try {
        const res = await this.$axios.post('/profile', this.data)
        await this.$auth.setToken('local', res.data.data.authToken)
        await this.$axios.setToken(res.data.data.authToken)
        await this.$auth.fetchUser().then(this.$router.push('/achievements'))
      } catch (err) {
        this.state = 2
      }
    }
  }
}
</script>
