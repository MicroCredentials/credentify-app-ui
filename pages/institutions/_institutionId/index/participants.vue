<template>
  <div>
    <div class="controls">
      <input-search :placeholder="'Search for a member'" />
      <div class="action">
        <b-link :to="`/institutions/${institutionId}/participants/invite`">
          <img
            class="mr-1"
            src="~/assets/icons/add.svg"
            alt="Invite participant"
          />
          Invite participant
        </b-link>
      </div>
    </div>
    <div v-if="participants.length" class="options table--participants">
      <div class="options--header">
        <div
          v-for="(header, index) in headers"
          :key="header.id"
          :class="['col', { last: index == headers.length - 1 }]"
          v-text="header"
        />
      </div>
      <n-link
        v-for="participant in participants"
        :key="participant.id"
        :to="`/institutions/${institutionId}/participants/${participant.id}`"
        class="option--item pointer"
      >
        <strong
          class="col"
          v-text="`${participant.firstName} ${participant.lastName}`"
        />
        <div class="col" v-text="participant.email" />
        <div class="col">
          <span class="tag">
            {{ getParticipantRole(participant.communityAbilities) }}
          </span>
        </div>
        <div class="col last">
          <img height="12" src="~/assets/icons/arrow-right.svg" alt="Details" />
        </div>
      </n-link>
    </div>
    <div v-else class="fields">
      <div class="field--item align-center">
        Institution doesn't have any participants.
      </div>
    </div>
  </div>
</template>

<script>
import { CommunityPermissionKinds, admin, teacher, student } from '~/types'

export default {
  watchQuery: ['search'],
  async asyncData({ app, params, query }) {
    try {
      const search = query.search ? { search: String(query.search) } : ''
      const participants = await app.$axios
        .get(`/communities/${params.institutionId}/collaborators`, {
          params: { ...search }
        })
        .then((res) => res.data.data)
      return {
        participants
      }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      headers: ['Name', 'E-mail', 'Role', 'Details'],
      participants: [],
      admin,
      teacher,
      student,
      communityPermissionKinds: CommunityPermissionKinds
    }
  },
  created() {
    this.$store.commit('nav/setTitle', this.$store.state.institution.name)
    this.$store.commit('nav/setBackUrl', `/institutions/mine`)
  },
  methods: {
    getParticipantRole(communityAbilities) {
      const institutionAbilities = communityAbilities
        .filter((x) => x.communityId === this.institutionId)
        .map((x) => x.kind)
      if (institutionAbilities.every((a) => this.student.includes(a))) {
        return 'Student'
      }
      if (institutionAbilities.every((a) => this.teacher.includes(a))) {
        return 'Teacher'
      }
      if (institutionAbilities.every((a) => this.admin.includes(a))) {
        return 'Admin'
      }
      if (institutionAbilities.length < 1) {
        return 5
      } else {
        return 'Custom'
      }
    }
  }
}
</script>

<style lang="scss">
.participant {
  align-items: center;
  display: flex;

  .label {
    margin-left: 1.4rem;

    h4 {
      color: $base;
      line-height: 1;
      margin-bottom: 4px;
    }
  }

  .avatar img {
    border-radius: 40px;
    overflow: hidden;

    @include breakpoint(small only) {
      width: 30px;
    }
  }
}
</style>
