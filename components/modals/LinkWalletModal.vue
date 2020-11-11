<template>
  <modal name="link-wallet-modal" transition="nice-modal-fade" height="auto">
    <h3>Link your digital wallet</h3>
    <div class="options d-flex mt-2">
      <!-- <LinkBitskiWallet class="block-option">
        <img
          class="icon"
          src="~/assets/images/bitski.svg"
          alt="Link your Bitski wallet"
        />
        <p for="bitski">Link Bitski wallet</p>
      </LinkBitskiWallet> -->
      <LinkMetaMaskWallet class="block-option">
        <img
          class="icon"
          src="~/assets/images/metamask.svg"
          alt="Link your MetaMask wallet"
        />
        <p for="metamask">Link Metamask wallet</p>
      </LinkMetaMaskWallet>
    </div>
  </modal>
</template>

<script>
// import LinkBitskiWallet from '~/components/ui/LinkBitskiWallet.vue'
import LinkMetaMaskWallet from '~/components/ui/LinkMetaMaskWallet.vue'

export default {
  components: {
    // LinkBitskiWallet,
    LinkMetaMaskWallet
  }
}
</script>

<style lang="scss" scoped>
.block-option {
  align-items: center;
  border: 1px solid transparent;
  border-radius: var(--global-radius);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  transition: all var(--quick);

  .icon {
    display: inline-block;
    height: 75px;
    margin-bottom: 1rem;
    margin-top: auto;
    width: auto;
  }

  p {
    color: var(--grey);
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--active-bg);
    border: 1px solid var(--border-color);
    cursor: pointer;
  }
}

.options {
  justify-content: space-around;
  text-align: center;

  .block-option {
    flex-basis: 50%;
  }
}
</style>
