<template>
  <notice v-if="!bitskiProvider.isSupported()" error class="mb-2">
    Your browser does not support
    <a href="https://www.bitski.com/" target="_blank">Bitski</a>.
  </notice>
  <div v-else @click="linkBitskiWallet()">
    <slot />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  computed: {
    // ...mapGetters({
    //   isRightNetwork: 'wallet/isRightBitskiNetwork'
    // })
  },
  methods: {
    async linkBitskiWallet() {
      try {
        await this.bitskiProvider.signIn()
        const signature = await this.bitskiProvider.sign(
          process.env.signingMessage
        )
        await this.$axios.put('/profile/wallet', {
          signature,
          kind: 2
        })
        await this.$auth.fetchUser()
        this.$modal.hide('link-wallet-modal')
      } catch (error) {
        this.$modal.hide('link-wallet-modal')
        this.handleErrors(error)
      }
    }
  }
}
</script>
