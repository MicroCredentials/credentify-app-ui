<template>
  <div class="sidebar">
    <div class="sidebartitle">
      <img src="~/assets/icons/credentify.svg" alt="Credentify logo" />
      <span>Credentify</span>
    </div>
    <div v-if="this.$auth.loggedIn" class="sidebaritems">
      <div
        v-for="menuitem in filteredMenuItems"
        :key="menuitem.label"
        class="sidebaritem"
      >
        <NuxtLink :to="menuitem.url">
          <img :src="menuitem.icon" />
          <span>{{ menuitem.label }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="zeroxcert-advertisement">
      <a href="https://github.com/0xcert/framework">
        Powered by <br />0xcert framework
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      menuItems: (state) => state.nav.menuItems
    }),
    ...mapState({
      profileAbilities: (state) => state.profile.profileAbilities
    }),
    ...mapState({
      requiredUserViewRights: (state) =>
        state.nav.menuItems[2].requiredAbilities
    }),
    filteredMenuItems() {
      const filteredItems = []
      for (const item of this.menuItems) {
        if (item.label === 'Users') {
          let allowedToViewUsers = false
          for (const ability of this.$auth.user.communityAbilities) {
            if (ability.kind === 2002) {
              allowedToViewUsers = true
              break
            }
          }
          if (allowedToViewUsers) {
            filteredItems.push(item)
          }
        } else {
          filteredItems.push(item)
        }
      }
      return filteredItems
    }
  }
}
</script>

<style lang="scss">
.sidebartitle {
  align-items: center;
  border-bottom-style: solid;
  border-color: $gray;
  color: $white;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;

  img {
    padding-right: 10px;
  }

  span {
    font-weight: bold;
  }
}

.sidebaritem {
  align-items: center;
  display: flex;
  width: 100%;

  > div {
    display: none;
  }

  /* For NuxtLinks inside sidebaritems */
  > a {
    align-items: center;
    border-bottom-style: dotted;
    border-color: $gray;
    color: $white;
    display: flex;
    height: 70px;
    padding: 1rem;
    width: 100%;

    img {
      margin-right: 15px;
      width: 25px;
    }
  }
}

.sidebaritem:hover {
  border-left-color: $blue-light;
  border-left-style: solid;
}

.zeroxcert-advertisement {
  align-items: center;
  bottom: 0;
  font-weight: bold;
  left: 0;
  padding: 1rem;
  position: absolute;

  > a {
    color: $gray-light;
  }
}
</style>
