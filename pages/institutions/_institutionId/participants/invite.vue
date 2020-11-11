<template>
  <div class="stage">
    <h1>Invite new participant</h1>
    <transition name="layout" mode="out-in">
      <div v-if="state === 'loading'" key="loading" class="loading">
        <img src="~/assets/icons/loader.svg" alt="Loading" />
      </div>
      <div v-if="state === 'form'" key="form" class="billing form">
        <div class="form--heading">
          Send invitation to participant's email
        </div>
        <div class="fields">
          <div class="field--item">
            <label class="equal">Participant</label>
            <v-select
              v-model="data.email"
              v-validate="'required'"
              :options="participants"
              placeholder="Select participant"
              data-vv-value-path="mutableValue"
              :reduce="(participant) => participant.email"
              name="participant"
            >
              <template slot="option" slot-scope="option">
                <span class="name">
                  {{ option.firstName }} {{ option.lastName }}
                </span>
                <span class="email">({{ option.email }})</span>
              </template>
              <template slot="selected-option" slot-scope="option">
                <span class="name">
                  {{ option.firstName }} {{ option.lastName }}
                </span>
                <span class="email">({{ option.email }})</span>
              </template>
              <template slot="no-options">
                No available participants. Invite one first.
              </template>
            </v-select>
          </div>
        </div>
      </div>
      <div v-if="state === 'success'" key="success">
        <p>Infivation has been successfully sent to {{ data.email }}</p>
        <b-link
          :to="`/institutions/${institutionId}/participants`"
          class="mt-2"
          v-text="'Back'"
        />
      </div>
    </transition>
    <toolbar v-if="state === 'form'">
      <b-link @click.native="inviteCollaborator(institutionId)">
        Send invitation
      </b-link>
    </toolbar>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    try {
      const participants = await app.$axios
        .get('/users', {
          params: {
            limit: 100
          }
        })
        .then((res) => res.data.data)
      return { participants }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      state: 'form',
      data: {
        email: ''
      },
      participants: []
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
    async inviteCollaborator(institutionId) {
      try {
        if (await this.$validator.validateAll()) {
          this.state = 'loading'
          await this.$axios.post(
            `/communities/${institutionId}/collaborators/request`,
            { ...this.data }
          )
          this.state = 'success'
        }
      } catch (err) {
        this.state = 'form'
        this.handleErrors(err)
      }
    }
  }
}
</script>
