<template>
  <div>
    <div class="controls">
      <tag-search />
      <div v-if="hasAbility([1006])" class="action">
        <b-link to="/institutions/new" add>
          Add new insitution
        </b-link>
      </div>
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
        :to="`/institutions/${community.id}`"
        :class="'option--item pointer'"
      >
        <div class="col">
          <strong>{{ community.name }}</strong>
        </div>
        <div class="col">
          <span class="tag">{{ getRole(community.role) }}</span>
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
      headers: ['Name', 'Role', 'Details'],
      page: 1,
      itemsPerPage: 10,
      infiniteId: +new Date(),
      listing: [],
      roles
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
        const institutions = await this.$axios
          .get('profile/communities', {
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
