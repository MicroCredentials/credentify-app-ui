<template>
  <div class="search">
    <div class="search--input">
      <input
        v-model="currentTag"
        type="text"
        class="form-field"
        name="search"
        placeholder="Search"
        :disabled="disable"
        @keyup.enter="addTag(currentTag)"
      />
      <span class="btn" @click="addTag(currentTag)">
        <img src="/icons/search.svg" alt="Search" />
      </span>
    </div>
    <div class="search--queries">
      <span v-for="(tag, index) in tags" :key="index" class="chip">
        <span v-text="tag" />
        <a class="remove" @click.prevent.stop="removeTag(index)">
          <img src="/icons/chip-clear.svg" alt="" />
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Search'
    }
  },
  data() {
    return {
      currentTag: '',
      tags: [],
      deleted: false
    }
  },
  watch: {
    '$route.query.search'() {
      this.parseTags()
    }
  },
  created() {
    this.parseTags()
  },
  methods: {
    addTag(newTag) {
      newTag = newTag.replace(/[- ]+/g, ' ').trim()
      if (newTag && !this.tags.includes(newTag)) {
        this.currentTag = ''
        this.tags.push(newTag)

        let searchQuery = this.$route.query.search || ''
        searchQuery = searchQuery ? searchQuery.concat(' ') : searchQuery

        this.$router.replace({
          query: {
            ...this.$route.query,
            ...{ search: searchQuery.concat(newTag.replace(/\s{1,}/g, '-')) }
          }
        })
      }
    },
    removeTag(index) {
      const tag = this.tags[index].replace(/ /g, '-')
      const searchQuery = (this.$route.query.search || '')
        .replace(tag, '')
        .trim()
      this.deleted = true
      this.$router.replace({
        query: {
          ...this.$route.query,
          ...{ search: searchQuery || undefined }
        }
      })
      this.tags.splice(index, 1)
    },
    parseTags() {
      if (this.deleted) {
        this.deleted = false
        return
      }

      if (this.$route.query.search) {
        this.tags = this.$route.query.search.split(' ').map((tag) => {
          if (tag && tag.length > 0) {
            return tag.replace(/-/g, ' ')
          }
        })
        this.tags = this.tags.filter((tag) => tag !== undefined)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  align-items: center;
  display: flex;
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
  min-width: 350px;
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

.chip {
  background-color: #dfdfdf;
  border-radius: 15px;
  color: var(--grey);
  display: inline-flex;
  line-height: 1;
  margin-right: 1rem;
  padding: 8px 16px;

  .remove {
    cursor: pointer;
    margin-left: 0.6rem;
    margin-right: -0.5rem;

    img {
      display: block;
    }
  }
}
</style>
