<template>
  <div class="stage">
    <h1>Participant overview</h1>
    <div class="form--heading">
      Basic data
    </div>
    <user-profile :participant="participant" />
    <div class="form--heading">
      Role
    </div>
    <div class="fields">
      <div class="field--item align-center">
        <label>Participant's role:</label>
        <v-select
          v-model="getParticipantRole"
          :options="roles"
          :clearable="false"
          placeholder="Select a desired role"
          :label="'label'"
          name="role"
          :reduce="(role) => role.role"
        >
          <template #selected-option="role">
            <strong>{{ role.label }}</strong>
          </template>
        </v-select>
        <div
          v-if="
            selectedRole !== 4 &&
              selectedRole &&
              selectedRole !== getParticipantRole
          "
          class="cta ml-2"
        >
          <b-link :loading="updating" @click.native="changeRole(selectedRole)"
            >Change role</b-link
          >
        </div>
      </div>
    </div>
    <div v-if="selectedRole === 4" class="form--heading">
      Custom institution abilities
    </div>
    <div v-if="selectedRole === 4" class="fields">
      <div
        v-for="ability in communityAbilityLabels"
        :key="ability.kind"
        class="field--item"
      >
        <label :for="ability.id" class="pointer">
          <input
            :id="getId(ability.kind)"
            :name="ability.kind"
            :checked="hasCommunityAbility(ability.kind)"
            type="checkbox"
            class="switch"
            @change="toggleAbility($event, institutionId)"
          />
          Ability to {{ ability.label }}
        </label>
      </div>
    </div>
    <sweet-modal
      ref="confirmCancelation"
      title="Delete confirmation"
      overlay-theme="dark"
    >
      <p>
        You're about cancel participant's memberhip in this institution.
        Participant will be able to rejoin only with admin invitation. Are you
        sure?
      </p>
      <b-link class="mr-2" @click.native="cancelMembership()" v-text="'Yes'" />
      <b-link
        inverted
        @click.native="$refs.confirmCancelation.close()"
        v-text="'Cancel'"
      />
    </sweet-modal>
    <div v-if="hasAbility([2002], institutionId)">
      <div class="form--heading danger mt-3">
        Cancel membership
      </div>
      <div class="fields danger">
        <div class="field--item align-center">
          <div class="description">
            Participant will no longer have an access to this institution.
          </div>
          <div class="cta">
            <b-link inverted @click.native="$refs.confirmCancelation.open()"
              >Cancel membership</b-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import communityAbilityLabels from '~/static/data/communityAbilityLabels.json'
import { CommunityPermissionKinds, admin, teacher, student } from '~/types'

export default {
  async asyncData({ app, params }) {
    try {
      const participant = await app.$axios
        .get(
          `/communities/${params.institutionId}/collaborators/${params.participantId}`
        )
        .then((res) => res.data.data)
      return { participant }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      roles: [
        {
          role: 1,
          label: 'Student'
        },
        {
          role: 2,
          label: 'Teacher'
        },
        {
          role: 3,
          label: 'Admin'
        },
        {
          role: 4,
          label: 'Custom'
        }
      ],
      selectedRole: null,
      updating: false,
      admin,
      teacher,
      student,
      communityPermissionKinds: CommunityPermissionKinds,
      communityAbilityLabels
    }
  },
  computed: {
    getParticipantRole: {
      get() {
        const institutionAbilities = this.participant.communityAbilities
          .filter((x) => x.communityId === this.institutionId)
          .map((x) => x.kind)
        if (institutionAbilities.every((a) => this.student.includes(a))) {
          return 1
        }
        if (institutionAbilities.every((a) => this.teacher.includes(a))) {
          return 2
        }
        if (institutionAbilities.every((a) => this.admin.includes(a))) {
          return 3
        }
        if (institutionAbilities.length < 1) {
          return 5
        } else {
          return 4
        }
      },
      set(role) {
        this.selectedRole = role
      }
    }
  },
  created() {
    this.$store.commit(
      'nav/setTitle',
      `${this.$store.state.institution.name} participants`
    )
    this.$store.commit(
      'nav/setBackUrl',
      `/institutions/${this.institutionId}/participants`
    )
  },
  methods: {
    async changeRole(role) {
      if (role === 1) {
        this.updating = true
        await this.disableAbilities(2001)
        await this.enableAbilities(this.student.filter((x) => x !== 2001))
        this.$toast.success('User role has been changed to Student')
        this.updating = false
      }
      if (role === 2) {
        this.updating = true
        await this.disableAbilities(2001)
        await this.enableAbilities(this.teacher.filter((x) => x !== 2001))
        this.$toast.success('User role has been changed to Teacher')
        this.updating = false
      }
      if (role === 3) {
        this.updating = true
        await this.disableAbilities(2001)
        await this.enableAbilities(this.admin.filter((x) => x !== 2001))
        this.$toast.success('User role has been changed to Admin')
        this.updating = false
      }
      this.selectedRole = null
    },
    getId(kind) {
      const abilityObj = this.participant.communityAbilities.find(
        (a) => a.kind === kind
      )
      return abilityObj ? abilityObj.id : ''
    },
    hasCommunityAbility(kind) {
      return !!this.participant.communityAbilities.find(
        (a) => a.kind === kind && a.communityId === this.institutionId
      )
    },
    disableAbilities(exclude = null) {
      const institutionAbilities = this.participant.communityAbilities
        .filter(
          (x) => x.communityId === this.institutionId && x.kind !== exclude
        )
        .map((x) => x.id)
      const calls = institutionAbilities.map((a) =>
        this.$axios
          .delete(`/communities/${this.institutionId}/abilities/${a}`)
          .then((res) => res.data.data)
      )
      return Promise.all(calls).then((res) => {
        this.selectedRole = null
      })
    },
    async cancelMembership() {
      try {
        await this.disableAbilities()
        this.$refs.confirmCancelation.close()
        this.$router.push(`/institutions/${this.institutionId}/participants`)
      } catch (err) {
        this.$refs.confirmCancelation.close()
        this.handleErrors(err)
      }
    },
    enableAbilities(abilities) {
      const calls = abilities.map((kind) =>
        this.$axios
          .post(`/communities/${this.institutionId}/abilities`, {
            profileId: this.participant.id,
            kind
          })
          .then((res) => res.data.data)
      )
      return Promise.all(calls).then((res) => {
        this.selectedRole = null
      })
    },
    async enableAbility(event, institutionId, profileId, kind) {
      try {
        await this.$axios
          .post(`/communities/${institutionId}/abilities`, { profileId, kind })
          .then((res) => (event.target.id = res.data.data.id))
      } catch (err) {
        event.target.checked = false
        this.handleErrors(err)
      }
    },
    async disableAbility(event, institutionId, abilityId) {
      try {
        await this.$axios.delete(
          `/communities/${institutionId}/abilities/${abilityId}`
        )
      } catch (err) {
        event.target.checked = true
        this.handleErrors(err)
      }
    },
    toggleAbility(event, institutionId) {
      event.target.checked
        ? this.enableAbility(
            event,
            institutionId,
            this.participant.id,
            event.target.name
          )
        : this.disableAbility(event, institutionId, event.target.id)
    }
  }
}
</script>
