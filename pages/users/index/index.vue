<template>
  <div>
    <div class="controls">
      <tag-search />
    </div>
    <div class="options table--participants">
      <div class="options--header">
        <div
          v-for="(header, index) in headers"
          :key="header.id"
          :class="['col', { last: index == headers.length - 1 }]"
          v-text="header"
        />
      </div>
      <n-link
        v-for="user in listing"
        :key="user.id"
        :to="`/users/${user.id}`"
        :class="'option--item'"
      >
        <strong class="col" v-text="`${user.firstName} ${user.lastName}`" />
        <div class="col" v-text="user.email" />
        <div class="col last">
          {{ new Date(user._createdAt) | dateFormat('YYYY-MM-DD - H:mm') }}
        </div>
      </n-link>
    </div>
    <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
      <div slot="no-more" class="mt-2">No more users</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import TagSearch from '~/components/TagSearch'

export default {
  components: {
    TagSearch,
    InfiniteLoading
  },
  data() {
    return {
      headers: ['Name', 'E-mail', 'Joined on'],
      page: 1,
      itemsPerPage: 10,
      listing: [],
      infiniteId: +new Date()
    }
  },
  watch: {
    '$route.query.search'() {
      this.changeSearch()
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Users')
    this.$store.commit('nav/setBackUrl', '')
  },
  methods: {
    changeSearch() {
      this.page = 1
      this.listing = []
      this.infiniteId += 1
    },
    async infiniteHandler($state) {
      try {
        const skip = (Number(this.page) - 1) * this.itemsPerPage
        const search = this.$route.query.search
          ? this.$route.query.search.replace(/-/g, ' ')
          : undefined
        const users = await this.$axios
          .get('/users', {
            params: { limit: this.itemsPerPage, skip, search }
          })
          .then((res) => res.data.data)
        if (users.length) {
          this.page += 1
          this.listing.push(...users)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (err) {
        this.handleErrors(err)
      }
    }
  }
}
</script>
