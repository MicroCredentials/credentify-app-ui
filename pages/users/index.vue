<template>
  <div class="stage">
    <div class="icon--title mb-2">
      <img src="~/assets/icons/participants-big.svg" alt="" />
      <h1>Users</h1>
    </div>
    <div class="subtitle">List of registered users.</div>
    <submenu :links="links" />
    <nuxt-child />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.nav.menuItems
    }),
    links() {
      return [
        {
          title: 'All users',
          url: '/users',
          requiredAbilities: [1014]
        },
        {
          title: 'Requests',
          url: '/users/requests',
          number: this.menuItems[2].number
          // requiredAbilities: [2025]
        }
      ]
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Users')
    this.$store.commit('nav/setBackUrl', '')
  }
}
</script>
