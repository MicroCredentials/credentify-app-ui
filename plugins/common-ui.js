import Vue from 'vue'
import InputSearch from '~/components/InputSearch.vue'
import Toolbar from '~/components/Toolbar.vue'
import BLink from '~/components/ui/BLink.vue'
import CredentialStage from '~/components/ui/CredentialStage.vue'
import Submenu from '~/components/ui/Submenu.vue'
import UserProfile from '~/components/ui/UserProfile.vue'
import { CommunityRequestRole } from '~/types'

Vue.component('submenu', Submenu)
Vue.component('b-link', BLink)
Vue.component('toolbar', Toolbar)
Vue.component('user-profile', UserProfile)
Vue.component('credential-stage', CredentialStage)
Vue.component('input-search', InputSearch)

Vue.mixin({
  computed: {
    institutionId() {
      const institutionId = this.$route.params.institutionId
      return institutionId || ''
    },
    currentPage: {
      get() {
        return this.$route.query.page ? Number(this.$route.query.page) : 1
      },
      set(newVal) {
        this.$router.push({ query: { page: newVal } })
      }
    }
  },
  created() {
    if (this.asyncDataError) {
      this.handleErrors(this.asyncDataError)
    }
  },
  methods: {
    getRole(role) {
      switch (role) {
        case CommunityRequestRole.STUDENT:
          return 'Student'
        case CommunityRequestRole.TEACHER:
          return 'Teacher'
        case CommunityRequestRole.ADMIN:
          return 'Admin'
        case CommunityRequestRole.CUSTOM:
          return 'Custom'
        case CommunityRequestRole.NONE:
          return 'Not a member'
        default:
          break
      }
    },
    getInstitutionName(id, institutions) {
      const institution = institutions.find((i) => i.id === id)
      return institution ? institution.name : null
    },
    getInstitutions(ids, institutions) {
      const filtered = institutions.filter((i) => ids.includes(i.id))
      return filtered.length ? filtered : null
    },
    hasAbility(input, communityId) {
      const abilities = input || []
      let allAbilities

      if (this.$store.state.auth) {
        if (communityId) {
          allAbilities = [
            ...this.$store.state.auth.user.profileAbilities,
            ...this.$store.state.auth.user.communityAbilities.filter(
              (x) => x.communityId === communityId
            )
          ]
        } else {
          allAbilities = [
            ...this.$store.state.auth.user.profileAbilities,
            ...this.$store.state.auth.user.communityAbilities
          ]
        }
        return allAbilities.some((el) => abilities.includes(el.kind))
      }
    },
    canDisplayLink(array, communityId) {
      return array ? this.hasAbility(array, communityId) : true
    },
    handleErrors(err) {
      if (!err.response) {
        this.$modal.show('dialog', {
          title: 'An error occurred',
          text: 'Unable to reach API server',
          buttons: [{ title: 'Close' }]
        })
      } else {
        err.response.data.errors.forEach((err) => {
          if (err.code === 400003) {
            this.$validator.errors.add({
              field: 'response',
              msg: 'Request token is invalid.'
            })
          } else if (err.code === 422003) {
            this.$validator.errors.add({
              field: 'email',
              msg: 'User with this email is already registered'
            })
          } else if (err.code === 400002) {
            this.$validator.errors.add({
              field: 'email',
              msg: 'This user does not have valid credentials.'
            })
          } else if (err.code === 422009) {
            this.$validator.errors.add({
              field: 'email',
              msg: 'User with this email does not exists.'
            })
          } else {
            const error = err.message
              ? err.message
              : `Error with code ${err.code} ocurred.`
            this.$validator.errors.add({
              field: 'response',
              msg: error
            })
            this.$modal.show('dialog', {
              title: 'An error occurred',
              text: error,
              buttons: [{ title: 'Close' }]
            })
          }
        })
      }
    }
  }
})
