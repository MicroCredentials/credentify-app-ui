<template>
  <div class="sidebar">
    <div class="sidebartitle">
      <img src="~/assets/icons/credentify.svg" alt="Credentify logo" />
      Credentify
    </div>
    <div v-if="this.$auth.loggedIn" class="sidebaritems">
      <div
        v-for="menuitem in menu_items"
        :key="menuitem.label"
        class="sidebaritem"
      >
        <NuxtLink :to="menuitem.url">
          <img :src="menuitem.icon" />
          <span>{{ menuitem.label }}</span>
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
  border-bottom-style: solid;
  border-color: $gray;
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
  border-bottom-style: dotted;
  border-color: $gray;
  display: flex;
  padding: 1rem;
  width: 100%;

  /* For NuxtLinks inside sidebaritems */
  a {
    align-items: center;
    color: #fff;
    display: flex;
    width: 100%;

    img {
      margin-right: 15px;
      width: 25px;
    }
  }
}
</style>
