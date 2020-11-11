<template>
  <div
    class="logo tag"
    :style="
      `
      background-color: ${stringToHslColor(name, s, 90)};
      color: ${stringToHslColor(name, s, l)};
      border: 1px solid ${stringToHslColor(name, s, l)};
    `
    "
  >
    {{ getFirstChar(name) }}
  </div>
</template>

<script>
export default {
  props: {
    s: {
      type: Number,
      default: 75
    },
    l: {
      type: Number,
      default: 55
    },
    name: {
      type: String,
      default: 'o'
    }
  },
  methods: {
    getFirstChar(str) {
      return str.charAt(0)
    },
    stringToHslColor(str, s, l) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }
      const h = hash % 360
      return `hsl(${h}, ${s}%, ${l}%)`
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 18px;
  font-weight: bold;
  line-height: 32px;
  text-align: center;
  text-transform: uppercase;
  width: 38px;

  @include breakpoint(medium) {
    font-size: 20px;
    line-height: 42px;
    width: 48px;
  }
}
</style>
