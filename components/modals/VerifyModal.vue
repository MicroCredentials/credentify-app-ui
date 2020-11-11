<template>
  <modal
    name="verify-modal"
    transition="nice-modal-fade"
    height="auto"
    @before-open="beforeOpen"
  >
    <div class="close" @click="hideModal()" v-text="'×'" />
    <h3>Verify your credential</h3>
    <div v-if="loading" key="loading" class="loading">
      <img src="~/assets/icons/loader.svg" alt="Loading" />
    </div>
    <div v-else>
      <div class="field mt-2">
        <label v-text="'Asset ID'" />
        <img
          class="icon copy"
          src="~/assets/images/copy.svg"
          alt="Copy to clipboard"
          @click="copyToClipboard(assetId)"
        />
        <p v-text="assetId" />
      </div>
      <div class="field">
        <label v-text="'Ledger ID'" />
        <img
          class="icon copy"
          src="~/assets/images/copy.svg"
          alt="Copy to clipboard"
          @click="copyToClipboard(ledgerId)"
        />
        <p v-text="ledgerId" />
      </div>
      <div class="field">
        <label v-text="'Asset schema'" />
        <img
          class="icon copy"
          src="~/assets/images/copy.svg"
          alt="Copy to clipboard"
          @click="copyToClipboard(schema)"
        />
        <pre class="code">{{ schema }}</pre>
      </div>
      <div class="field">
        <label v-text="'Asset evidence'" />
        <img
          class="icon copy"
          src="~/assets/images/copy.svg"
          alt="Copy to clipboard"
          @click="copyToClipboard(evidence)"
        />
        <pre class="code">{{ evidence }}</pre>
      </div>
      <div class="field">
        <label v-text="'Asset metadata'" />
        <img
          class="icon copy"
          src="~/assets/images/copy.svg"
          alt="Copy to clipboard"
          @click="copyToClipboard(metadata)"
        />
        <pre class="code">{{ metadata }}</pre>
      </div>
      <div class="field">
        <label v-text="'Network'" />
        <p>Ethereum - Rinkeby</p>
      </div>
      <b-link inverted @click.native="openVerifier()">
        Verify credential
      </b-link>
    </div>
  </modal>
</template>

<script>
import * as BN from 'bn.js'

export default {
  props: {
    credential: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      assetId: new BN(this.$route.params.credentialId, 16).toString(),
      ledgerId: process.env.ledgerId,
      schema: '',
      metadata: '',
      evidence: '',
      loading: false
    }
  },
  methods: {
    copyToClipboard(text) {
      this.$toast.success('Coppied to clipboard.')
      navigator.clipboard.writeText(text)
    },
    hideModal() {
      this.$modal.hide('verify-modal')
    },
    openVerifier() {
      window.open(
        `https://verify.0xcert.org?assetId=${this.assetId}&ledgerId=${this.ledgerId}&network=2`,
        '_blank'
      )
    },
    async beforeOpen(event) {
      this.loading = true
      try {
        this.schema = await this.$axios
          .get('/credentials/schema')
          .then((res) => JSON.stringify(res.data))
        this.metadata = await this.$axios
          .get(`/credentials/${this.$route.params.credentialId}/metadata`)
          .then((res) => JSON.stringify(res.data))
        this.evidence = await this.$axios
          .get(`/credentials/${this.$route.params.credentialId}/evidence`)
          .then((res) => JSON.stringify(res.data))
      } catch (error) {
        this.handleErrors(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.code {
  margin-top: 5px;
  overflow: scroll;
}

.field {
  margin-bottom: 15px;

  label {
    font-weight: bold;
  }

  p {
    margin-top: 5px;
  }
}

.copy {
  cursor: pointer;
  height: 15px;
}

.close {
  color: #3651ff;
  cursor: pointer;
  font-size: 24px;
  height: 15px;
  line-height: 1;
  position: absolute;
  right: 9px;
  text-decoration: none;
  top: 3px;
  z-index: 20;

  &:hover {
    color: darken(#3651ff, 10);
  }
}
</style>
