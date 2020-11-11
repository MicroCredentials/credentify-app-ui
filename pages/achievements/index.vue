<template>
  <div class="stage">
    <div class="icon--title mb-2">
      <img src="~/assets/icons/achievements-big.svg" alt="" />
      <h1>Achievements</h1>
    </div>
    <div class="subtitle">
      List of all available achievements users can participate.
    </div>
    <div class="controls">
      <tag-search />
      <div v-if="hasAbility([2016])" class="action">
        <b-link to="/achievements/new">
          <img class="mr-1" src="~/assets/icons/add.svg" alt="" />
          Add new achievement
        </b-link>
      </div>
    </div>
    <table-achievements :institutions="institutions" :data="listing" />
    <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
      <div slot="no-more" class="mt-2">No more achievements</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import TagSearch from '~/components/TagSearch'
import TableAchievements from '~/components/TableAchievements.vue'

export default {
  components: {
    TableAchievements,
    TagSearch,
    InfiniteLoading
  },
  data() {
    return {
      headers: ['Achievement', 'Institution', 'Type', 'Details'],
      page: 1,
      itemsPerPage: 10,
      listing: [],
      institutionIds: [],
      institutions: [],
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
    this.$store.commit('nav/setTitle', 'Achievements')
    this.$store.commit('nav/setBackUrl', '')
  },
  methods: {
    changeSearch() {
      this.page = 1
      this.listing = []
      this.infiniteId += 1
    },
    flatten(arr) {
      return arr.reduce((flat, toFlatten) => {
        return flat.concat(
          Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten
        )
      }, [])
    },
    async infiniteHandler($state) {
      try {
        const skip = (Number(this.page) - 1) * this.itemsPerPage
        const search = this.$route.query.search
          ? this.$route.query.search.replace(/-/g, ' ')
          : undefined
        const achievements = await this.$axios
          .get('/achievements', {
            params: { limit: this.itemsPerPage, skip, search }
          })
          .then((res) => res.data.data)
        if (achievements.length) {
          const newIds = new Set(
            this.flatten(achievements.map((a) => a.communityIds))
          )
          this.institutionIds.push(...newIds)
          const institutions = await this.$axios
            .get('/communities', {
              params: {
                filterIds: [...this.institutionIds]
              }
            })
            .then((res) => res.data.data)
          this.page += 1
          this.listing.push(...achievements)
          this.institutions = institutions

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
