<template>
  <div class="stage">
    <VerifyModal />
    <div class="icon--title">
      <img src="~/assets/icons/credentials-big.svg" alt="" />
      <h1>Credential details</h1>
    </div>
    <div class="form--heading">
      Participant details
    </div>
    <user-profile :participant="$auth.user">
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
      :institutions="credential.communities"
      :data="[credential.achievement]"
    />
    <div
      v-if="credential.achievement.dependentAchievementIds.length"
      class="form--heading"
    >
      Dependent credential(s) of achievemnt(s)
    </div>
    <table-achievements
      v-if="credential.achievement.dependentAchievementIds.length"
      :institutions="credential.communities"
      :data="dependentAchievements"
    />
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
              v-if="field.type == 'date' && credential[key] != null"
              class="value"
            >
              {{ new Date(credential[key]) | dateFormat('YYYY-MM-DD') }}
            </div>
            <div v-else-if="key == 'txHash'" class="value">
              <a
                :href="`https://rinkeby.etherscan.io/tx/${credential[key]}`"
                target="_blank"
              >
                Check transaction on blockchain
              </a>
            </div>
            <div v-else-if="credential[key] != null" class="value">
              {{ credential[key] }}
            </div>
            <div v-else v-text="'No data'" />
          </div>
        </div>
      </div>
      <div class="form--heading">
        Credential metadata
      </div>
      <div class="options">
        <Metadata :data="JSON.stringify(credential.metadata)" />
      </div>
      <b-link class="mt-1" inverted @click.native="openVerifyModal()">
        Verify credential
      </b-link>
    </div>
    <sweet-modal ref="errorModal" title="Error" overlay-theme="dark">
      <p>{{ errors.first('response') }}</p>
      <b-link @click.native="$refs.errorModal.close()">
        Close
      </b-link>
    </sweet-modal>
    <sweet-modal
      ref="confirmRequestCancelation"
      title="Cancelation confirmation"
      overlay-theme="dark"
    >
      <p>You're about to cancel this credential request.</p>
      <b-link
        class="mr-2"
        @click.native="cancelRequest()"
        v-text="'Yes, cancel request'"
      />
      <b-link
        inverted
        @click.native="$refs.confirmRequestCancelation.close()"
        v-text="'Go back'"
      />
    </sweet-modal>
    <toolbar v-if="credential.stage === 1" space-between>
      <b-link
        @click.native="$refs.confirmRequestCancelation.open()"
        v-text="'Cancel request'"
      />
    </toolbar>
  </div>
</template>

<script>
import TableAchievements from '~/components/TableAchievements'
import Metadata from '~/components/Metadata'
import credentialSchema from '~/static/data/credentialSchema.json'
import VerifyModal from '~/components/modals/VerifyModal'

export default {
  components: {
    TableAchievements,
    Metadata,
    VerifyModal
  },
  async asyncData({ app, params }) {
    try {
      const credential = await app.$axios
        .get('/profile/credentials', {
          params: { filterIds: [params.credentialId] }
        })
        .then((res) => res.data.data[0])
      return {
        credential
      }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      credentialSchema,
      page: 1,
      note: ''
    }
  },
  computed: {
    getCedentialResults() {
      const obj = JSON.parse(JSON.stringify(this.credential))
      const exclude = [
        'actionsOrderId',
        'txHash',
        'metadata',
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
  mounted() {
    this.$store.commit('nav/setBackUrl', '/credentials')
  },
  methods: {
    openVerifyModal() {
      this.$modal.show('verify-modal')
    },
    showTransactionDetails() {
      window.open(
        `${process.env.etherscanUrl}/tx/${this.credential.txHash}`,
        '_blank'
      )
    },
    getKeyLabel(key) {
      return this.credentialSchema[key] ? this.credentialSchema[key].label : key
    },
    async cancelRequest() {
      try {
        await this.$axios.post(
          `/profile/credentials/${this.credential.id}/cancel`
        )
        this.credential.stage = 3
      } catch (err) {
        this.handleErrors(err)
      }
      this.$refs.confirmRequestCancelation.close()
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
