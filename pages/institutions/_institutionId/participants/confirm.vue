<template>
  <div class="stage small center text-center">
    <transition name="slide-fade" mode="out-in">
      <div v-if="state === 'loading'" key="loading">
        <img src="~/assets/icons/loader.svg" alt="Loading" />
      </div>
      <div v-if="state === 'success'" key="success">
        <h2 class="mb-1">Welcome to a new institution</h2>
        <p>You are now successfuly joined to a new institution!</p>
        <b-link to="/institutions" class="mt-1">Check my institutions</b-link>
      </div>
      <div v-if="state === 'error'" key="error">
        <h2>Something went wrong</h2>
        <p class="mt-1">
          We were unable to resolve your invitation <br />
          Make sure you are logged in.
        </p>
        <b-link to="/login" class="mt-2">Log in</b-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      state: 'loading',
      communityId: '',
      data: {
        requestToken: ''
      }
    }
  },
  mounted() {
    this.data.requestToken = this.$route.query.requestToken
    this.data.requestToken
      ? this.submit(this.institutionId, this.data)
      : (this.state = 'error')
  },
  methods: {
    async submit(institutionId, data) {
      try {
        await this.$axios.post(
          `/communities/${institutionId}/collaborators`,
          data
        )
        // this.$router.push('/institutions');
        this.state = 'success'
      } catch (err) {
        this.state = 'error'
      }
    }
  }
}
</script>
