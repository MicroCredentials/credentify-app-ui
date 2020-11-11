<template>
  <div>
    <div class="controls">
      <tag-search />
      <div v-if="hasAbility([1007])" class="action">
        <b-link to="/credentials/new">
          <img class="mr-1" src="~/assets/icons/add.svg" alt="" />
          Issue new credential
        </b-link>
      </div>
    </div>

    <div key="listing" class="options table--credentials">
      <div class="options--header">
        <div
          v-for="(header, index) in headers"
          :key="header.id"
          :class="['col', { last: index == headers.length - 1 }]"
          v-text="header"
        />
      </div>
      <n-link
        v-for="credential in listing"
        :key="credential.id"
        :to="`/credentials/all/${credential.id}`"
        :class="'option--item pointer'"
      >
        <div class="col">
          <strong v-text="credential.achievement.name"></strong>
          <div
            v-for="item in credential.communities"
            :key="item.id"
            class="meta"
            v-text="item.name"
          ></div>
        </div>
        <div class="col">
          <div class="participant">
            <span class="icon show-for-small-only">
              <img width="14" src="/icons/participants.svg" alt="" />
            </span>
            {{ credential.participantName }}
          </div>
        </div>
        <div class="col"><credential-stage :stage="credential.stage" /></div>
        <div class="col last">
          <img height="12" src="~/assets/icons/arrow-right.svg" alt="Details" />
        </div>
      </n-link>
    </div>

    <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
      <div slot="no-more" class="mt-2">No more credentials</div>
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
      headers: ['Credential', 'Participant', 'Stage', 'Details'],
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
        const credentials = await this.$axios
          .get('/credentials', {
            params: { limit: this.itemsPerPage, skip, search }
          })
          .then((res) => res.data.data)
        const participants = await this.$axios
          .get('/users', {
            params: {
              filterIds: [...new Set(credentials.map((a) => a.profileId))]
            }
          })
          .then((res) => res.data.data)
        const result = credentials.map((a) => ({
          ...a,
          participantName: participants.find((p) => p.id === a.profileId)
            ? `${participants.find((p) => p.id === a.profileId).firstName}
              ${participants.find((p) => p.id === a.profileId).lastName}`
            : a.profileId
        }))
        if (credentials.length) {
          this.page += 1
          this.listing.push(...result)
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
