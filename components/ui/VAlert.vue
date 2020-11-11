<template>
  <span class="alert" v-text="errors.first(name)" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.alert {
  color: $red;
}
</style>
