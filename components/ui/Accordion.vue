<template>
  <div class="accordion">
    <div :class="headingClass" @click="toggle">
      <slot name="header"></slot>
      <img
        src="~/assets/icons/expander.svg"
        class="header-icon"
        :class="{ rotate: show }"
      />
    </div>
    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-show="show" class="section">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showing: {
      type: Boolean,
      default: false
    },
    headingClass: {
      type: String,
      default: 'heading'
    }
  },

  data() {
    return {
      show: this.showing
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
    beforeEnter(el) {
      el.style.height = '0'
    },
    enter(el) {
      el.style.height = `${el.scrollHeight}px`
    },
    beforeLeave(el) {
      el.style.height = `${el.scrollHeight}px`
    },
    leave(el) {
      el.style.height = '0'
    }
  }
}
</script>

<style lang="scss">
.accordion {
  .header-icon {
    margin-left: auto;
    transform: rotate(90deg);
    transition-duration: 0.3s;
  }

  .section {
    overflow: hidden;
    transition: $ease;
  }

  .header-icon.rotate {
    transform: rotate(-90deg);
    transition-duration: 0.3s;
  }
}
</style>
