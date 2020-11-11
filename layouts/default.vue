<template>
  <div :class="['layout', { loggedin: this.$auth.loggedIn }]">
    <v-dialog />
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

export default {
  components: {
    Controller
  },
  computed: {
  }
}
</script>
