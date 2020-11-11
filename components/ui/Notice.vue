<template>
  <transition appear appear-active-class="fade-enter-active">
    <div class="notice">
      <div :class="['inner', { success, error, warning }]">
        <span v-if="success" class="material-icons">check_circle</span>
        <span v-else-if="error" class="material-icons">cancel</span>
        <span v-else-if="warning" class="material-icons">error</span>
        <span v-else class="material-icons">info</span>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    success: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.notice {
  margin-bottom: 10px;

  .inner {
    --color: var(--primary-color);

    background-color: var(--primary-lighter);
    border: 1px solid var(--color);
    border-radius: var(--global-radius);
    color: var(--color);
    display: inline-flex;
    line-height: 1.5;
    padding: 8px 14px;

    .material-icons {
      margin-right: 8px;
    }

    &.success {
      --color: var(--success);

      background: var(--success-lighter);
    }

    &.error {
      --color: var(--secondary-color);

      background: var(--secondary-lighter);
    }

    &.warning {
      --color: var(--warning);

      background: var(--warning-lighter);
    }
  }
}
</style>
