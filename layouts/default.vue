<template>
  <div :class="['layout', { sidebarOpen, loggedin: this.$auth.loggedIn }]">
    <v-dialog />
    <LeftSidebar />
    <div class="main-canvas">
      <controller />
      <div class="page">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Controller from '~/components/Controller'
import LeftSidebar from '~/components/LeftSidebar'

export default {
  components: {
    Controller,
    LeftSidebar
  },
  computed: mapState({
    sidebarOpen: (state) => state.nav.sidebarOpen
  })
}
</script>
