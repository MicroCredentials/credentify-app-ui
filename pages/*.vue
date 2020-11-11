<template>
  <div class="page center">
    <div class="stage small">
      <h1>Oops...</h1>
      <h4>The page you are looking for does not exist.</h4>
      <b-link to="/" class="mt-2">Go home</b-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  auth: false,
  created() {
    this.$store.commit('nav/setTitle', 'Page not found')
  }
}
</script>

<style lang="scss">
.login {
  width: 100%;
}
</style>
