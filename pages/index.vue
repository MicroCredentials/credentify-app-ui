<template>
  <div class="stage center small text-center intro">
    <img src="/images/credentify_logo.svg" alt="" />
    <p class="small">
      Welcome to the first European issuer of blockchain-secured stackable ECTS
      credentials that are university and student owned, and verifiable.
    </p>
    <div v-if="!this.$auth.loggedIn">
      <p>To continue, sign up or log in.</p>
      <b-link to="/login" inverted class="mt-2">Log in</b-link>
      <b-link to="/signup" class="signup">Sign up</b-link>
    </div>
    <div v-else>
      <p class="strong">
        Explore the insitutions and request their membership to get access to
        available achievements you can acquire.
      </p>
      <b-link to="/institutions" class="mt-2">Go to institutions</b-link>
      <b-link to="/achievements" inverted class="mt-2 ml-1"
        >Go to achievements</b-link
      >
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  created() {
    this.$store.commit('nav/setTitle', 'Welcome')
  }
}
</script>

<style lang="scss" scoped>
.intro {
  p {
    font-size: 19px;
    margin-top: 2rem;
  }

  .strong {
    font-weight: bold;
  }
}

.signup {
  margin-top: 2rem;

  @include breakpoint(medium) {
    margin-left: 2rem;
  }
}
</style>
