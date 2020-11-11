<template>
  <div>
    <div class="controls">
      <tag-search />
    </div>
    <div class="options table--institutions">
      <div class="options--header">
        <div
          v-for="(header, index) in headers"
          :key="header.id"
          :class="['col', { last: index == headers.length - 1 }]"
          v-text="header"
        />
      </div>
      <n-link
        v-for="community in listing"
        :key="community.id"
        :to="`/institutions/request/${community.id}`"
        :class="'option--item pointer'"
      >
        <div class="col">
          <strong>{{ community.name }}</strong>
        </div>
        <div class="col">
          <div
            v-if="getStatus(community.id) === 1"
            class="tag yellow"
            v-text="'Pending request'"
          />
          <div v-if="getStatus(community.id) === 2">
            <span v-if="community.role === 5" class="tag red">
              {{ getRole(community.role) }}
            </span>
            <span v-else class="tag green">
              {{ getRole(community.role) }}
            </span>
          </div>
          <div
            v-if="getStatus(community.id) === 3"
            class="tag red"
            v-text="'Request rejected'"
          />
          <div
            v-if="getStatus(community.id) === 0"
            class="tag"
            v-text="'Not a member'"
          />
        </div>
        <div class="col last">
          <img height="12" src="~/assets/icons/arrow-right.svg" alt="Details" />
        </div>
      </n-link>
    </div>
    <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
      <div slot="no-more" class="mt-2"></div>
      <div slot="no-results" class="mt-2">No results to show</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import TagSearch from '~/components/TagSearch'
import { roles } from '~/static/data/roles.js'

export default {
  components: {
    TagSearch,
    InfiniteLoading
  },
  data() {
    return {
      headers: ['Name', 'Membership', 'Details'],
      page: 1,
      roles,
      itemsPerPage: 10,
      infiniteId: +new Date(),
      listing: [],
      requests: []
    }
  },
  watch: {
    '$route.query.search'() {
      this.changeSearch()
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Institutions')
    this.$store.commit('nav/setBackUrl', '')
    this.getRequests()
  },
  methods: {
    changeSearch() {
      this.page = 1
      this.listing = []
      this.infiniteId += 1
    },
    getRole(role) {
      return this.roles.find((x) => x.role === role)
        ? this.roles.find((x) => x.role === role).label
        : ''
    },
    getStatus(institutionId) {
      return this.requests.find((x) => x.communityId === institutionId)
        ? this.requests.find((x) => x.communityId === institutionId).status
        : 0
    },
    async getRequests() {
      this.requests = await this.$axios
        .get('/profile/communities/requests')
        .then((res) => res.data.data)
    },
    async infiniteHandler($state) {
      try {
        const skip = (Number(this.page) - 1) * this.itemsPerPage
        const search = this.$route.query.search
          ? this.$route.query.search.replace(/-/g, ' ')
          : undefined
        const institutions = await this.$axios
          .get('/communities', {
            params: { limit: this.itemsPerPage, skip, search }
          })
          .then((res) => res.data.data)
        if (institutions.length) {
          this.page += 1
          this.listing.push(...institutions)
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
