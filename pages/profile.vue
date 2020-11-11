<template>
  <div class="stage">
    <!-- <submenu :links="links" /> -->
    <nuxt-child />
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { title: 'Profile', url: '/profile' },
        { title: 'Billing', url: '/profile/billing' },
        { title: 'Security', url: '/profile/security' }
      ]
    }
  }
}
</script>
