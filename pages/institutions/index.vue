<template>
  <div class="stage">
    <div class="icon--title mb-2">
      <img src="~/assets/icons/institutions-big.svg" alt="" />
      <h1>Institutions</h1>
    </div>
    <div class="subtitle">
      List of available institutions and the ones you are memeber of. To become
      a member of new institution, request an access among available
      insitutions.
    </div>
    <submenu :links="links" />
    <nuxt-child />
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: 'Available institutions',
          url: '/institutions'
        },
        {
          title: 'My institutions',
          url: '/institutions/mine'
        }
      ]
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Institutions')
    this.$store.commit('nav/setBackUrl', '')
  }
}
</script>
