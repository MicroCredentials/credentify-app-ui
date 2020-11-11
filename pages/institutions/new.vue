<template>
  <transition name="layout" mode="out-in">
    <div v-if="loading" key="loading" class="stage loading">
      <img src="~/assets/icons/loader.svg" alt="Loading" />
    </div>
    <div v-else class="stage">
      <div class="icon--title">
        <img src="~/assets/icons/institutions-big.svg" alt="" />
        <h1>Add new institution</h1>
      </div>
      <form class="billing form" @keyup.enter="createCommunity(institution)">
        <div class="form--heading">
          Enter institution details
        </div>
        <div class="fields">
          <div class="field--item">
            <label class="equal-small">Name</label>
            <input
              v-model="institution.name"
              v-validate="'required'"
              name="name"
              type="text"
              placeholder="Enter institution's title"
            />
            <span
              v-show="errors.has('name')"
              class="alert"
              v-text="errors.first('name')"
            />
          </div>
          <div class="field--item">
            <label class="equal-small">Description</label>
            <resizable-textarea>
              <textarea
                v-model="institution.description"
                v-validate="'required'"
                name="description"
                type="text"
                placeholder="Enter descriptiion of institution"
              >
              </textarea>
            </resizable-textarea>
            <span
              v-show="errors.has('description')"
              class="alert"
              v-text="errors.first('description')"
            />
          </div>
        </div>
      </form>
      <toolbar>
        <b-link @click.native="createCommunity(institution)">
          Add new institution
        </b-link>
      </toolbar>
    </div>
  </transition>
</template>

<script>
import ResizableTextarea from '~/components/ui/ResizableTextarea'
import Toolbar from '~/components/Toolbar.vue'
import BLink from '~/components/ui/BLink.vue'

export default {
  components: {
    BLink,
    Toolbar,
    ResizableTextarea
  },
  data() {
    return {
      loading: false,
      institution: {
        name: '',
        description: ''
      }
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Institutions')
    this.$store.commit('nav/setBackUrl', '/institutions')
  },
  methods: {
    async createCommunity(newInstitution) {
      try {
        if (await this.$validator.validateAll()) {
          this.loading = true
          await this.$axios.post('/communities', { ...newInstitution })
          await this.$auth.fetchUser()
          this.$router.push('/institutions/mine')
        }
      } catch (err) {
        this.loading = false
        this.handleErrors(err)
      }
    }
  }
}
</script>
