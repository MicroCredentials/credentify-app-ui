<template>
  <form class="billing form">
    <div class="form--heading">
      KYC information
    </div>
    <div class="fields">
      <div class="field--item">
        <div class="description">
          To use ZXC option, you first need to confirm your information. <br />
          You will be redirected to our KYC provider service.
        </div>
        <div class="cta">
          <b-link blue inverted>
            Start KYC
          </b-link>
        </div>
      </div>
    </div>
    <div class="form--heading">
      ZXC Wallet
    </div>
    <div class="fields">
      <div class="field--item">
        <div class="description message">
          Your ZXC wallet will appear here after completed KYC.
        </div>
      </div>
    </div>
    <div class="fields mt-2">
      <div class="field--item">
        <label class="equal">Deposit address</label>
        <div class="value">
          0x8578497cc89F71fD99537059ED525e0888f8fd59
        </div>
      </div>
      <div class="field--item">
        <label class="equal">ZXC ballance</label>
        <div class="value">
          1.123.123,003293876 ZXC
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import BLink from '~/components/ui/BLink.vue'

export default {
  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },
  components: {
    BLink
  }
}
</script>
