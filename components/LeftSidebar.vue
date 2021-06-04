<template>
  <div class="sidebar">
    <div class="sidebartitle">
      <img src="~/assets/icons/credentify.svg" alt="Credentify logo" />
      Credentify
    </div>
    <div v-if="this.$auth.loggedIn" class="links">
      <div
        v-for="menuitem in menu_items"
        :key="menuitem.label"
        class="sidebaritem"
      >
        <NuxtLink :to="menuitem.url">
          <img :src="menuitem.icon" />{{ menuitem.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    menu_items() {
      return this.$store.state.nav.menuItems
    }
  }
}
</script>

<style lang="scss">
.sidebartitle {
  align-items: center;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;

  img {
    padding-right: 10px;
  }
}

.sidebaritem {
  align-items: center;
  display: flex;
  padding-bottom: 1rem;
  padding-left: 20px;
  padding-right: 30px;
  padding-top: 1rem;

  /* For NuxtLinks */
  a {
    color: #fff;

    img {
      margin-right: 10px;
    }
  }
}
</style>
