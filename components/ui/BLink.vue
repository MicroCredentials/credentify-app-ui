<template>
  <button
    v-if="native"
    :class="[
      'button',
      { blue, red, green, inverted },
      { 'is-loading': loading }
    ]"
    type="submit"
    :disabled="disable"
  >
    <slot />
  </button>
  <nuxt-link
    v-else
    :to="to"
    :class="[
      'button',
      { blue, red, green, inverted },
      { 'is-loading': loading }
    ]"
  >
    <img v-if="add" class="icon" src="~/assets/icons/add.svg" alt="" />
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      default: '',
      type: String
    },
    native: {
      default: false,
      type: Boolean
    },
    add: {
      default: false,
      type: Boolean
    },
    blue: {
      type: Boolean,
      default: true
    },
    red: {
      type: Boolean,
      default: false
    },
    green: {
      type: Boolean,
      default: false
    },
    inverted: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
$hover-shadow-opaxity: 0.5;
$hover-lighten: 3%;

.button {
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  font-weight: bold;
  justify-content: center;
  line-height: 1;
  min-width: 140px;
  padding: 14px 15px;
  transition: all $transition-quick;

  @include breakpoint(medium) {
    display: inline-flex;
    font-size: 16px;
    padding: 13px 20px;
  }

  .icon {
    margin: -2px 1rem -2px 0;
  }

  &:hover {
    text-decoration: none;
  }

  &.is-loading {
    color: transparent !important;
    pointer-events: none;

    &::after {
      animation: spinAround 0.5s infinite linear;
      border: 2px solid #fff;
      border-radius: 290486px;
      border-right-color: transparent;
      border-top-color: transparent;
      content: '';
      display: block;
      height: 1em;
      position: relative;
      right: calc(50% - 16px);
      top: calc(50% - (1em / 2));
      width: 1em;
    }
  }
}

.blue {
  background: $blue;
  color: $white;
  text-transform: uppercase;
  transition: all $transition-quick;

  &:hover {
    background: lighten($blue, 10%);
  }

  &:active {
    background: darken($blue, 10%);
  }
}

.red {
  background: $red;
  color: $white;
  text-transform: uppercase;
  transition: all $transition-quick;

  &:hover {
    background: lighten($red, 10%);
  }

  &:active {
    background: darken($red, 10%);
  }
}

.green {
  background: $green;
  color: $white;
  text-transform: uppercase;
  transition: all $transition-quick;

  &:hover {
    background: lighten($green, 10%);
  }

  &:active {
    background: darken($green, 10%);
  }
}

.blue.inverted {
  background: $white;
  border: 1px solid $blue;
  color: $blue;
  text-shadow: none;
  text-shadow: 1px 1px 1px $white;

  &:hover {
    background: lighten($blue, 35%);
  }

  &:active {
    background: lighten($blue, 30%);
  }

  .danger & {
    border-color: $red;
    color: $red;

    &:hover {
      background: lighten($red, 35%);
    }

    &:active {
      background: lighten($red, 30%);
    }
  }
}

@keyframes spinAround {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(359deg);
  }
}
</style>
