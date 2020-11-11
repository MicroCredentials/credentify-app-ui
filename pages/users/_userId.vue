<template>
  <div class="stage">
    <h1>Profile overview</h1>
    <div class="form--heading">
      Basic data
    </div>
    <user-profile :participant="profile" />

    <div class="form--heading">
      Profile abilities
    </div>
    <div class="options">
      <div
        v-for="ability in profileAbilities"
        :key="ability.kind"
        class="option--item"
      >
        <label> Ability to {{ ability.label }} </label>
      </div>
    </div>
    <div class="form--heading">
      Institution abilities
    </div>
    <div v-if="communityAbilities.length" class="options">
      <div
        v-for="ability in communityAbilities"
        :key="ability.kind"
        class="option--item"
      >
        <label> Ability to {{ ability.label }} </label>
      </div>
    </div>
    <div v-else class="fields">
      <div class="field--item">User has no institution abilities</div>
    </div>
  </div>
</template>

<script>
import communityAbilityLabels from '~/static/data/communityAbilityLabels.json'
import profileAbilityLabels from '~/static/data/profileAbilityLabels.json'

export default {
  async asyncData({ app, params }) {
    try {
      const profile = await app.$axios
        .get('/users', { params: { filterIds: [params.userId] } })
        .then((res) => res.data.data[0])
      return { profile }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      communityAbilityLabels,
      profileAbilityLabels
    }
  },
  computed: {
    profileAbilities() {
      return this.profileAbilityLabels.filter((x) =>
        this.hasUserAbility(x.kind)
      )
    },
    communityAbilities() {
      return this.communityAbilityLabels.filter((x) =>
        this.hasUserAbility(x.kind)
      )
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'User profile')
    this.$store.commit('nav/setBackUrl', '/users')
  },
  methods: {
    hasUserAbility(ability) {
      if (this.profile) {
        const allAbilities = [
          ...this.profile.profileAbilities,
          ...this.profile.communityAbilities
        ]
        return ability ? allAbilities.some((el) => el.kind === ability) : true
      }
    }
  }
}
</script>
