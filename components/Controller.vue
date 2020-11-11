<template>
  <div class="controller align-stretch">
    <div
      v-if="this.$auth.loggedIn"
      class="col divided space-left btn menuToggler"
      @click="$store.commit('nav/toggleSidebar')"
    >
      <div :class="['align-self-middle hamburger', { sidebarOpen }]">
        <span v-for="n in 3" :key="n" class="line" />
      </div>
    </div>
    <n-link
      v-if="backUrl"
      :to="backUrl"
      class="col divided space-left btn"
      tag="div"
    >
      <img src="~/assets/icons/back.svg" alt="Back" />
    </n-link>
    <div class="col flex-child-grow align-self-middle align-center">
      <span class="title">{{ title }}</span>
    </div>
    <n-link
      v-if="this.$auth.loggedIn"
      to="/profile"
      class="col align-middle align-self-middle space-right user"
    >
      <div class="mr-1">
        {{ this.$auth.user.role }}
      </div>
      <div class="avatar">
        <v-gravatar
          :email="$auth.user.email"
          :alt="$auth.user.name"
          rating="g"
          :size="40"
        />
      </div>
      <div class="more">
        <img src="~/assets/icons/arrow-down.svg" alt="More" />
      </div>
      <ul class="user--dropdown">
        <li><n-link to="/profile">My profile</n-link></li>
        <li><n-link to="/institutions/mine">My institutions</n-link></li>
        <!-- <li><n-link to="/profile/security">Security</n-link></li> -->
        <li><n-link to="" @click.native="logout()">Log out</n-link></li>
      </ul>
    </n-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('nav', {
      title: (state) => state.title,
      sidebarOpen: (state) => state.sidebarOpen,
      backUrl: (state) => state.backUrl
    })
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.controller {
  .col {
    display: flex;
  }

  .divided {
    border-right: 1px solid $border;
    padding-right: var(--space);
  }

  .space-left {
    padding-left: var(--space);
  }

  .space-right {
    padding-right: var(--space);
  }

  .btn {
    cursor: pointer;
    transition: all $transition-quick;

    &:hover {
      background-color: $highlight;
    }
  }

  .user {
    cursor: pointer;
    height: var(--controller-height);
    position: relative;

    .name,
    .more {
      display: none;

      @include breakpoint(medium) {
        display: block;
        padding-left: var(--space);
      }
    }

    &:hover {
      .user--dropdown {
        opacity: 1;
        transition-delay: 0.2s, 0.1s;
        visibility: visible;
      }
    }
  }

  .avatar img {
    border-radius: 40px;
    overflow: hidden;

    @include breakpoint(small only) {
      width: 30px;
    }
  }

  .menuToggler {
    @include breakpoint(medium) {
      display: none;
    }
  }
}

.user--dropdown {
  box-shadow: $box-shadow-strong;
  color: #fff;
  list-style: none;
  margin: 0;
  min-width: 180px;
  opacity: 0;
  padding: 0;
  position: absolute;
  right: 18px;
  text-align: right;
  top: calc(var(--controller-height));
  transition-delay: 0s, 0.4s;
  transition-duration: 0.4s, 0s;
  transition-property: opacity, visibility;
  visibility: hidden;

  li {
    padding: 0;
  }

  a {
    background-color: $heading;
    border-bottom: 1px solid lighten($heading, 6%);
    color: #fff;
    display: block;
    padding: 12px 35px;
    transition: background-color $transition-quick;

    &:hover {
      background-color: $dark-hover;
      text-decoration: none;
    }
  }
}

.circle {
  background-color: $main-bg;
  border-radius: var(--avatar-size);
  height: var(--avatar-size);
  width: var(--avatar-size);
}

.hamburger {
  cursor: pointer;
  z-index: 501;

  .line {
    background-color: #9fa5af;
    display: block;
    height: 3px;
    margin: 6px auto 0;
    transition: all $ease;
    width: 28px;

    &:first-child {
      margin-top: 0;
    }
  }

  &.sidebarOpen {
    .line:nth-child(2) {
      opacity: 0;
    }

    .line:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .line:nth-child(3) {
      transform: translateY(-10px) rotate(-45deg);
    }
  }
}
</style>
