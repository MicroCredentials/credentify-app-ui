<template>
  <div class="toolbar">
    <div :class="['actions', { 'space-between': spaceBetween }]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    spaceBetween: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.toolbar {
  align-items: center;
  display: flex;
  justify-content: center;

  .actions {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    max-width: 1200px;
    width: 100%;

    @include breakpoint(medium) {
      padding: 0 55px;
    }

    &.space-between {
      justify-content: space-between;
    }
  }
}
</style>
