import { BitskiProvider } from '@0xcert/ethereum-bitski-frontend-provider'
import { MetamaskProvider } from '@0xcert/ethereum-metamask-provider'
import Vue from 'vue'

/**
 * Bitski provider.
 */
const bitskiProvider = new BitskiProvider({
  clientId: '44c1a01d-f611-4c90-a9b3-11ff53db8224',
  // orderGatewayId: process.env.orderGatewayId,
  redirectUrl: process.env.bitskiRedirect,
  signMethod: 3,
  network: 'rinkeby',
  gatewayConfig: {
    actionsOrderId: '0x2e697eAcdCEc69A9695fb4908a35D04C80aB7E49',
    assetLedgerDeployOrderId: '0xBdd421cfD425BC952d704c2C68D902672FF7738D',
    valueLedgerDeployOrderId: '0xa5ff982d4b054F777DC3eFe77b5D91236A389800'
  }
})

/**
 * Metamask provider
 */
const metamaskProvider = new MetamaskProvider({
  // orderGatewayId: process.env.orderGatewayId,
  signMethod: 3,
  gatewayConfig: {
    actionsOrderId: '0x2e697eAcdCEc69A9695fb4908a35D04C80aB7E49',
    assetLedgerDeployOrderId: '0xBdd421cfD425BC952d704c2C68D902672FF7738D',
    valueLedgerDeployOrderId: '0xa5ff982d4b054F777DC3eFe77b5D91236A389800'
  }
})

Vue.mixin({
  data() {
    return {
      bitskiProvider,
      metamaskProvider
    }
  }
})
