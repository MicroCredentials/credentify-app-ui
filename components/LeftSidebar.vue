<template>
  <div class="sidebar">
    <div class="icon--title">
      <img
        class="mr-1"
        src="~/assets/icons/credentify.svg"
        alt="Credentify logo"
      />
      Credentify
    </div>
    <div v-if="this.$auth.loggedIn" class="links">
      <ul>
        <li
          v-for="menuitem in menu_items"
          :key="menuitem.label"
          class="sidebaritem"
        >
          <NuxtLink :to="menuitem.url">
            <img :src="menuitem.icon" />
            {{ menuitem.label }}
          </NuxtLink>
        </li>
      </ul>
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
.sidebaritem {
  align-items: left;
  list-style-type: none;
  width: 100%;

  img {
    margin-right: 10px;
  }
}
</style>
