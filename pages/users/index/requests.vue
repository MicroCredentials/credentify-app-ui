<template>
  <div>
    <div class="options table--requests">
      <div class="options--header">
        <div
          v-for="(header, index) in headers"
          :key="header.id"
          :class="['col', { last: index == headers.length - 1 }]"
          v-text="header"
        />
      </div>
      <n-link
        v-for="request in listing"
        :key="request.id"
        :to="`/users/requests/${request.id}`"
        :class="'option--item'"
      >
        <strong class="col">
          {{ request.profile.firstName }}
          {{ request.profile.lastName }}
        </strong>
        <div class="col" v-text="request.community.name" />
        <div class="col">
          <div
            v-if="request.status === 1"
            class="tag yellow"
            v-text="'Pending request'"
          ></div>
          <div v-if="request.status === 2">
            <span class="tag green">
              Accepted as {{ getRole(request.role) }}
            </span>
          </div>
          <div
            v-if="request.status === 3"
            class="tag red"
            v-text="'Rejected'"
          ></div>
        </div>
        <div class="col last">
          {{ new Date(request.createdAt) | dateFormat('YYYY-MM-DD') }}
        </div>
      </n-link>
    </div>
    <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
      <div slot="no-more" class="mt-2">No more requests</div>
      <div slot="no-results" class="mt-2">No requests</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { roles } from '~/static/data/roles.js'

export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      headers: ['User', 'Institution', 'Status', 'Requested on'],
      page: 1,
      roles,
      itemsPerPage: 10,
      listing: [],
      infiniteId: +new Date()
    }
  },
  computed: {
    skip() {
      return (Number(this.page) - 1) * this.itemsPerPage
    }
  },
  watch: {
    '$route.query.search'() {
      this.changeSearch()
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'User requests')
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
        const requests = await this.$axios
          .get('/communities/requests', {
            params: { limit: this.itemsPerPage, skip }
          })
          .then((res) => res.data.data)
        const pending = requests.filter((r) => r.status === 1).length
        await this.$store.dispatch('nav/getRequests', pending)

        if (requests.length) {
          this.page += 1
          this.listing.push(...requests)
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
