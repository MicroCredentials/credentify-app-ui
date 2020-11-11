<template>
  <div class="stage">
    <div class="icon--title mb-2">
      <img src="~/assets/icons/institutions-big.svg" alt="" />
      <h1>{{ institution.name }}</h1>
    </div>
    <div class="subtitle">
      {{ institution.description }}
    </div>
    <submenu :links="links" />
    <nuxt-child :data="institution" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async asyncData({ params, app, store }) {
    try {
      await app.$axios
        .get('/communities', { params: { filterIds: [params.institutionId] } })
        .then((res) =>
          store.commit('institution/loadInstitution', res.data.data[0])
        )
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  computed: {
    links() {
      return [
        {
          title: 'Overview',
          url: `/institutions/${this.institutionId}`
        },
        {
          title: 'Members',
          url: `/institutions/${this.institutionId}/participants`,
          requiredAbilities: [2012]
        }
        // { title: 'Achievements', url: `/institutions/${this.institutionId}/achievements` },
        // { title: 'Credentials', url: `/institutions/${this.institutionId}/credentials` },
      ]
    },
    ...mapState('institution', {
      institution: (state) => state
    })
  },
  created() {
    this.$store.commit('nav/setTitle', 'Institution')
    this.$store.commit('nav/setBackUrl', '/institutions')
  }
}
</script>

<style lang="scss">
.api-key {
  .label,
  .api {
    font-size: 13px;
    font-weight: bold;
    padding-bottom: 4px;
  }
}
</style>
