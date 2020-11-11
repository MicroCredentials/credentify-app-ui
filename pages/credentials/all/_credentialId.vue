<template>
  <div class="stage">
    <div class="icon--title">
      <img src="~/assets/icons/credentials-big.svg" alt="Credentials" />
      <h1>Credential details</h1>
    </div>
    <div class="form--heading">
      Participant details
    </div>
    <user-profile :participant="participant">
      <credential-stage :stage="credential.stage" />
      <div v-if="credential.note" class="reason">
        <div class="label">Reason</div>
        {{ credential.note }}
      </div>
      <div v-if="credential.stage === 5" class="mt-1 cta">
        <b-link inverted @click.native="showTransactionDetails()">
          Show blockchain transaction
        </b-link>
      </div>
    </user-profile>
    <div class="form--heading">
      Credential for achievemnt
    </div>
    <table-achievements
      :institutions="institutions"
      :institution="credential.community"
      :data="[credential.achievement]"
    />
    <div v-if="credential.achievement.dependentAchievementIds.length">
      <div class="form--heading">
        Must consist of
      </div>
      <table-achievements
        :institutions="institutions"
        :institution="credential.community"
        :data="dependentAchievements"
      />
    </div>
    <div v-if="credential.achievement.canConsistOfIds.length">
      <div class="form--heading">
        Can consist of
      </div>
      <table-achievements
        :institutions="institutions"
        :institution="credential.community"
        :data="canConsistOf"
      />
    </div>
    <div v-if="credential.stage == 4 && hasAbility([2024])">
      <div class="form--heading">
        Enter credential results
      </div>
      <div class="fields">
        <div
          v-for="(field, key) in credentialSchema"
          :key="field.id"
          class="field--item"
        >
          <label class="equal-small" v-text="field.label" />
          <input
            v-model="credentialResults[key]"
            :name="key"
            :type="field.type"
            :placeholder="field.description"
          />
        </div>
      </div>
    </div>
    <div v-if="credential.stage === 5">
      <div
        v-if="Object.keys(getCedentialResults).length"
        class="credential-results"
      >
        <div class="form--heading">
          Credential results
        </div>
        <div class="options">
          <div
            v-for="(field, key) in getCedentialResults"
            :key="field.id"
            class="option--item"
          >
            <label class="equal-small" v-text="getKeyLabel(key)" />
            <div
              v-if="field.type === 'date' && credential[key] != null"
              class="value"
            >
              {{ new Date(credential[key]) | dateFormat('YYYY-MM-DD') }}
            </div>
            <div
              v-else-if="credential[key] != null"
              class="value"
              v-text="credential[key]"
            />
            <div v-else v-text="'No data'" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="credential.stage < 5 && hasAbility([2022])">
      <div class="form--heading danger mt-3">
        Danger zone
      </div>
      <div class="fields danger">
        <div class="field--item">
          <div class="description">
            This action will mark the credential as deleted. <br />
            The associated data will be removed after 30 days.
          </div>
          <div class="cta">
            <b-link
              inverted
              @click.native="$refs.confirmDegreRemoval.open()"
              v-text="'Delete credential'"
            />
          </div>
        </div>
      </div>
    </div>

    <sweet-modal
      ref="confirmCredentialApproval"
      title="Confirm"
      overlay-theme="dark"
    >
      <p>You are about to permanently issue a credential.</p>
      <b-link
        class="mr-2"
        :is-loading="loading"
        :disable="loading"
        @click.native="completeCredential()"
        v-text="'Confirm'"
      />
      <b-link
        inverted
        :disable="loading"
        @click.native="$refs.confirmCredentialApproval.close()"
        v-text="'Cancel'"
      />
    </sweet-modal>

    <sweet-modal
      ref="confirmCredentialFail"
      title="Confirm credential failure"
      overlay-theme="dark"
    >
      <p>You are about to permanently mark this credential as failed.</p>
      <b-link
        class="mr-2"
        @click.native="failCredential()"
        v-text="'Confirm'"
      />
      <b-link
        inverted
        @click.native="$refs.confirmCredentialFail.close()"
        v-text="'Cancel'"
      />
    </sweet-modal>
    <sweet-modal
      ref="confirmCredentialRejection"
      title="Rejection confirmation"
      overlay-theme="dark"
    >
      <p>
        You're about to permanently reject this credential. Type a reason for
        rejection bellow:
      </p>
      <div class="fields mb-2">
        <div class="field--item">
          <textarea
            v-model="note"
            v-validate="'required'"
            class="note"
            name="note"
          >
          </textarea>
          <span
            v-show="errors.has('note')"
            class="alert no-padding"
            v-text="errors.first('note')"
          />
        </div>
      </div>
      <b-link
        class="mr-2"
        @click.native="rejectCredential()"
        v-text="'Yes, reject it'"
      />
      <b-link
        inverted
        @click.native="$refs.confirmCredentialRejection.close()"
        v-text="'Go back'"
      />
    </sweet-modal>
    <sweet-modal
      ref="confirmDegreRemoval"
      title="Delete confirmation"
      overlay-theme="dark"
    >
      <p>You're about to permanently reject this credential. Are you sure?</p>
      <b-link
        class="mr-2"
        @click.native="deleteCredential()"
        v-text="'Yes, delete it'"
      />
      <b-link
        inverted
        @click.native="$refs.confirmDegreRemoval.close()"
        v-text="'Cancel'"
      />
    </sweet-modal>

    <toolbar
      v-if="
        credential.stage !== 2 &&
          credential.stage !== 3 &&
          credential.stage !== 5 &&
          credential.stage !== 6 &&
          credential.stage !== 7
      "
      space-between
    >
      <b-link
        v-if="credential.stage === 1"
        @click.native="acceptCredential()"
        v-text="'Accept request'"
      />
      <b-link
        v-if="canPass && credential.stage !== 1 && hasAbility([2024])"
        green
        @click.native="$refs.confirmCredentialApproval.open()"
        v-text="'Credential passed'"
      />
      <b-link
        v-if="credential.stage === 1"
        inverted
        @click.native="$refs.confirmCredentialRejection.open()"
        v-text="'Reject request'"
      />
      <b-link
        v-if="credential.stage >= 4 && hasAbility([2024])"
        red
        @click.native="$refs.confirmCredentialFail.open()"
        v-text="'Failed'"
      />
    </toolbar>
  </div>
</template>

<script>
import TableAchievements from '~/components/TableAchievements'
import credentialSchema from '~/static/data/credentialSchema.json'

export default {
  components: {
    TableAchievements
  },
  async asyncData({ app, params }) {
    try {
      const credential = await app.$axios
        .get('/credentials', { params: { filterIds: [params.credentialId] } })
        .then((res) => res.data.data[0])
      const participant = await app.$axios
        .get('/users', { params: { filterIds: [credential.profileId] } })
        .then((res) => res.data.data[0])
      let dependentAchievements = []
      let canConsistOf = []
      let dependentCredentials = []
      if (credential.achievement.dependentAchievementIds.length > 0) {
        dependentAchievements = await app.$axios
          .get('/achievements', {
            params: {
              filterIds: credential.achievement.dependentAchievementIds
            }
          })
          .then((res) => res.data.data)
      }
      if (
        'canConsistOfIds' in credential.achievement &&
        credential.achievement.canConsistOfIds.length > 0
      ) {
        canConsistOf = await app.$axios
          .get('/achievements', {
            params: {
              filterIds: credential.achievement.canConsistOfIds
            }
          })
          .then((res) => res.data.data)
      }
      if (
        'canConsistOfIds' in credential.achievement ||
        'dependentAchievementIds' in credential.achievement
      ) {
        dependentCredentials = await app.$axios
          .get('/credentials', {
            params: {
              filterAchievementIds: [
                ...credential.achievement.dependentAchievementIds,
                ...credential.achievement.canConsistOfIds
              ],
              filterProfileIds: [credential.profileId]
            }
          })
          .then((res) => res.data.data)
      }
      const institutions = await app.$axios
        .get('/communities', {
          params: {
            filterIds: [...credential.achievement.communityIds]
          }
        })
        .then((res) => res.data.data)
      return {
        dependentCredentials,
        dependentAchievements: dependentCredentials.length
          ? dependentAchievements.map((d) => ({
              ...d,
              credentialStage: dependentCredentials.find(
                (i) => i.achievement.id === d.id
              )
                ? dependentCredentials.find((i) => i.achievement.id === d.id)
                    .stage
                : 0
            }))
          : dependentAchievements.map((d) => ({
              ...d,
              credentialStage: 0
            })),
        canConsistOf: dependentCredentials.length
          ? canConsistOf.map((d) => ({
              ...d,
              credentialStage: dependentCredentials.find(
                (i) => i.achievement.id === d.id
              )
                ? dependentCredentials.find((i) => i.achievement.id === d.id)
                    .stage
                : 0
            }))
          : canConsistOf.map((d) => ({
              ...d,
              credentialStage: 0
            })),
        institutions,
        credential,
        participant
      }
    } catch (error) {
      return { asyncDataError: error }
    }
  },
  data() {
    return {
      loading: false,
      credentialSchema,
      note: '',
      dependentCredentials: [],
      dependentAchievements: [],
      institutions: [],
      credential: {},
      credentialResults: {},
      participant: {}
    }
  },
  computed: {
    canPass() {
      if (this.dependentAchievements) {
        return this.dependentAchievements.every((c) => c.credentialStage === 5)
      } else {
        return true
      }
    },
    getCedentialResults() {
      const obj = JSON.parse(JSON.stringify(this.credential))
      const exclude = [
        'actionsOrderId',
        'metadata',
        'txHash',
        'achievement',
        'id',
        'communities',
        'profileId',
        'stage',
        '_createdAt',
        'awardingBodyId',
        'wallet'
      ]
      exclude.forEach((key) => delete obj[key])
      for (const [key] of Object.entries(obj)) {
        if (obj[key] === null || obj[key].length === 0) {
          delete obj[key]
        }
      }
      return obj
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Credential details')
    const backUrl = this.hasAbility([2024])
      ? '/credentials/all'
      : '/credentials'
    this.$store.commit('nav/setBackUrl', backUrl)
  },
  methods: {
    showTransactionDetails() {
      window.open(
        `${process.env.etherscanUrl}/tx/${this.credential.txHash}`,
        '_blank'
      )
    },
    async completeCredential() {
      this.loading = true
      try {
        await this.$axios.post(`/credentials/${this.credential.id}/complete`, {
          ...this.credentialResults
        })
        this.credential.stage = 7
        Object.assign(this.credential, this.credentialResults)
      } catch (err) {
        this.handleErrors(err)
      } finally {
        this.loading = false
      }
      this.$refs.confirmCredentialApproval.close()
    },
    async failCredential() {
      try {
        await this.$axios.post(`/credentials/${this.credential.id}/fail`)
        this.credential.stage = 6
      } catch (err) {
        this.handleErrors(err)
      }
      this.$refs.confirmCredentialFail.close()
    },
    async acceptCredential() {
      try {
        await this.$axios.post(`/credentials/${this.credential.id}/accept`)
        this.credential.stage = 4
      } catch (err) {
        this.handleErrors(err)
      }
    },
    async rejectCredential() {
      if (!(await this.$validator.validateAll())) {
        return
      }

      try {
        if (await this.$validator.validateAll()) {
          await this.$axios.post(`/credentials/${this.credential.id}/reject`, {
            note: this.note
          })
          this.credential.stage = 2
        }
      } catch (err) {
        this.$refs.confirmCredentialRejection.close()
        this.handleErrors(err)
      }
      this.$refs.confirmCredentialRejection.close()
    },
    async deleteCredential() {
      try {
        await this.$axios.delete(`/credentials/${this.credential.id}`)
        this.$router.push('/credentials/all')
      } catch (err) {
        this.handleErrors(err)
      }
      this.$refs.confirmDegreRemoval.close()
    },
    getKeyLabel(key) {
      return this.credentialSchema[key] ? this.credentialSchema[key].label : key
    }
  }
}
</script>

<style scoped lang="scss">
.col {
  label {
    margin-bottom: 5px;
  }
}

.reason {
  margin-top: 1rem;

  .label {
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
