<template>
  <div class="form">
    <LinkWalletModal />
    <h1>User profile</h1>
    <div class="form--heading">
      Basic data
    </div>
    <div class="fields">
      <div class="field--item profile">
        <div class="description">
          <div class="user grid-x grid-margin-x">
            <div class="user--image cell shrink">
              <v-gravatar
                :email="$auth.user.email"
                :alt="`${$auth.user.firstName} ${$auth.user.lastName}`"
                rating="g"
                :size="106"
              />
            </div>
            <div class="user--data cell auto">
              <span v-if="$auth.user.firstName" class="name">
                {{ $auth.user.firstName }}
                {{ $auth.user.lastName }}
              </span>
              <span>{{ $auth.user.email }}</span>
              <span
                >Member since:
                {{
                  new Date($auth.user._createdAt) | dateFormat('YYYY/MM/DD')
                }}</span
              >
              <!-- <span><n-link to="">Add your address</n-link></span> -->
            </div>
          </div>
        </div>
        <!-- <div class="cta">
          <b-link inverted>Edit profile</b-link>
        </div> -->
      </div>
    </div>
    <div class="form--heading">
      Wallet
    </div>
    <div class="fields">
      <div class="field--item align-center">
        <div class="description">
          <div class="user grid-x grid-margin-x">
            <div class="user--data cell auto">
              <span
                v-if="$auth.user.wallet && $auth.user.wallet.address"
                class="large-label wallet"
              >
                {{ $auth.user.wallet.address }}
              </span>
              <span v-else class="name wallet">
                Please add your digital wallet.
              </span>
            </div>
          </div>
        </div>
        <div class="cta">
          <b-link
            v-if="$auth.user.wallet && $auth.user.wallet.address"
            inverted
            @click.native="openLinkWalletModal()"
            >Update wallet</b-link
          >
          <b-link v-else inverted @click.native="openLinkWalletModal()"
            >Add wallet</b-link
          >
        </div>
      </div>
    </div>

    <div class="form--heading">
      My institutions
    </div>
    <div class="fields">
      <div class="field--item align-center">
        <div class="description large-label">
          You are member in
          <strong>{{ profileInstitutions }}</strong> institutions.
        </div>
        <div class="cta">
          <b-link inverted to="/institutions/mine">View my institutions</b-link>
        </div>
      </div>
    </div>
    <div class="form--heading">
      Profile abilities
    </div>
    <div class="options">
      <div
        v-for="ability in profileAbilities"
        :key="ability.kind"
        class="option--item"
      >
        <label> Ability to {{ ability.label }} </label>
      </div>
    </div>

    <!-- <div class="form--heading">
      E-mail subscription
    </div>
    <div class="fields">
      <div class="field--item">
        <label for="subscription" class="pointer">
          <input id="subscription" type="checkbox" v-model="profile.subscription" class="switch">
          Subscribe to newsletter updates
        </label>
      </div>
      <div class="field--item">
        <div class="cta">
          <p>By subscribing to our email newsletter, you will be opting to receive updates about new feature releases, discounts and promotional codes, security updates, and more.</p>
          <p>If you’re not interested in receiving this content, please uncheck the box below to unsubscribe.</p>
          </div>
      </div>      
    </div>  -->
    <div class="form--heading danger">
      Deactivate account
    </div>
    <div class="fields danger">
      <div class="field--item">
        <div class="description">
          This will permanently delete this account.
        </div>
        <div class="cta">
          <b-link inverted @click.native="$refs.confirmUserDelete.open()"
            >Delete account</b-link
          >
        </div>
      </div>
    </div>
    <sweet-modal ref="errorModal" title="Error" overlay-theme="dark">
      <p>{{ errors.first('response') }}</p>
      <b-link @click.native="$refs.errorModal.close()">
        Close
      </b-link>
    </sweet-modal>
    <sweet-modal
      ref="confirmUserDelete"
      title="Delete confirmation"
      overlay-theme="dark"
    >
      <p>You're about to permanently delete your account.</p>
      <b-link
        class="mr-2"
        @click.native="deleteUser()"
        v-text="'Yes, detele it'"
      />
      <b-link
        inverted
        @click.native="$refs.confirmUserDelete.close()"
        v-text="'Cancel'"
      />
    </sweet-modal>
  </div>
</template>

<script>
import LinkWalletModal from '~/components/modals/LinkWalletModal.vue'
import communityAbilityLabels from '~/static/data/communityAbilityLabels.json'
import profileAbilityLabels from '~/static/data/profileAbilityLabels.json'

export default {
  components: {
    LinkWalletModal
  },
  async asyncData({ app }) {
    try {
      const profileInstitutions = await app.$axios
        .get('profile/communities')
        .then((res) => res.data.meta.totalCount)
      return { profileInstitutions }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      communityAbilityLabels,
      profileAbilityLabels,
      profile: {
        subscription: true
      }
    }
  },
  computed: {
    profileAbilities() {
      return this.profileAbilityLabels.filter((x) => this.hasAbility([x.kind]))
    }
  },
  methods: {
    openLinkWalletModal() {
      this.$modal.show('link-wallet-modal')
    },
    async deleteUser() {
      try {
        await this.$axios.delete('profile')
        await this.$auth.logout()
      } catch (err) {
        this.handleErrors(err)
      }
      this.$refs.confirmUserDelete.close()
    }
  }
}
</script>

<style lang="scss" scoped>
main p {
  line-height: 1.35;
  padding-bottom: 10px;

  &:last-child {
    padding-bottom: 0;
  }
}

.large-label {
  font-size: 22px;
}
</style>
