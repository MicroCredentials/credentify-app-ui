<template>
  <div class="search">
    <div class="search--input">
      <input
        v-model="searchFor"
        type="text"
        :placeholder="placeholder"
        @keyup.enter="performSearch(currentSearch)"
      />
      <span
        v-if="$route.query.search"
        class="btn clear"
        @click="performSearch('')"
      >
        <img src="/icons/clear.svg" alt="" />
      </span>
      <span class="btn" @click="performSearch(currentSearch)">
        <img src="/icons/search.svg" alt="Search" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      default: 'Quick search',
      type: String
    }
  },
  data() {
    return {
      currentSearch: ''
    }
  },
  computed: {
    searchFor: {
      get() {
        return this.$route.query.search
      },
      set(newVal) {
        this.currentSearch = newVal
      }
    }
  },
  methods: {
    performSearch(keyword) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          ...{ search: keyword || undefined }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  flex-grow: 1;
}

.search--input {
  align-items: center;
  background: $white;
  border: 1px solid $border;
  border-radius: 6px;
  box-shadow: $box-shadow-light;
  display: flex;
  margin-right: 1rem;
  max-width: 400px;
  overflow: hidden;

  input {
    padding: 12px;
    width: 100%;
  }

  .btn {
    cursor: pointer;
    padding: 9px;

    img {
      display: block;
    }

    &:first-of-type {
      padding-right: 5px;
    }
  }
}
</style>
