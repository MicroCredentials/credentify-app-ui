<template>
  <div class="submenu">
    <div v-for="subpage in links" :key="subpage.id">
      <n-link
        v-if="canDisplayLink(subpage.requiredAbilities, institutionId)"
        :to="subpage.url"
        exact
      >
        {{ subpage.title }}
        <span
          v-if="subpage.number"
          class="number-tag"
          v-text="subpage.number"
        />
      </n-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.submenu {
  border-bottom: 1px solid $border;
  display: flex;
  margin-bottom: 1.5rem;
  width: 100%;

  a {
    color: $base;
    cursor: pointer;
    display: block;
    margin-bottom: -1px;
    margin-right: 21px;
    padding: 20px 8px 15px;

    &:hover {
      color: $primary;
      text-decoration: none;
    }
  }

  .category:not(:first-child) {
    margin-left: 15px;
  }

  .active {
    border-bottom: 2px solid;
    color: $primary;
    font-weight: bold;
  }
}
</style>
