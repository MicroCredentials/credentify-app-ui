<template>
  <div class="stage">
    <div class="icon--title mb-2">
      <img src="~/assets/icons/credentials-big.svg" alt="" />
      <h1>Credentials</h1>
    </div>
    <div class="subtitle">List of issued and requested credentials.</div>
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
          title: 'All credentials',
          url: '/credentials/all/',
          requiredAbilities: [1011, 2020]
        },
        {
          title: 'My credentials',
          url: '/credentials',
          requiredAbilities: [1010]
        }
        // {
        //   title: 'Requests',
        //   url: '/credentials/requests',
        //   number: 3,
        // },
      ]
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Credentials')
    this.$store.commit('nav/setBackUrl', '')
  }
}
</script>
