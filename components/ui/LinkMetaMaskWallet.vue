<template>
  <transition mode="out-in" name="layout">
    <notice v-if="!metamaskProvider.isSupported()" key="not-supported" warning>
      <span
        >Your browser does not support
        <a href="https://metamask.io/" target="_blank">MetaMask</a>.</span
      >
    </notice>
    <div v-else key="good" @click="linkMetamaskWallet()">
      <slot />
    </div>
  </transition>
</template>

<script>
import Notice from '~/components/ui/Notice'

export default {
  components: {
    Notice
  },
  methods: {
    async linkMetamaskWallet() {
      await this.metamaskProvider.enable()
      try {
        const signature = await this.metamaskProvider.sign(
          process.env.signingMessage
        )
        await this.$axios.put('/profile/wallet', {
          signature,
          kind: 1
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
