<template>
  <div>
    <div class="fields">
      <div class="field--item">
        <label class="equal">Name</label>
        <input
          v-model="name"
          v-validate="'required'"
          name="name"
          type="text"
          placeholder="Enter name of your new institution"
        />
        <span
          v-show="errors.has('name')"
          class="alert"
          v-text="errors.first('name')"
        />
      </div>
      <div class="field--item">
        <label class="equal align-self-top">Description</label>
        <textarea
          v-model="description"
          v-validate="'required'"
          name="description"
          type="text"
          rows="6"
          placeholder="Enter descriptiion of your new institution"
        >
        </textarea>
        <span
          v-show="errors.has('description')"
          class="alert"
          v-text="errors.first('description')"
        />
      </div>
      <div class="field--item">
        <label class="equal">Role</label>
        <div class="data shrink">
          <span class="tag">{{ getRole(institution.role) }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAbility([2003], institutionId)">
      <div class="form--heading danger">
        Danger zone
      </div>
      <div class="fields danger">
        <div class="field--item">
          <div class="description">
            This action will mark the institution as terminated. <br />
            The associated data will be removed after 30 days.
          </div>
          <div class="cta">
            <b-link inverted @click.native="$refs.modal.open()"
              >Delete institution</b-link
            >
          </div>
        </div>
      </div>
    </div>

    <sweet-modal ref="modal" title="Confirmation" overlay-theme="dark">
      <p>
        This action will remove this institution and all API keys related to it.
        Are you sure?
      </p>
      <b-link @click.native="deleteCommunity(institutionId)">
        Yes, remove the institution
      </b-link>
    </sweet-modal>

    <toolbar v-if="hasAbility([2002], institutionId)">
      <b-link
        @click.native="
          updateCommunity(institutionId, update.name, update.description)
        "
      >
        Update Institution
      </b-link>
    </toolbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      update: {
        name: '',
        descrption: ''
      }
    }
  },
  computed: {
    ...mapState('institution', {
      institution: (state) => state
    }),
    name: {
      get() {
        return this.institution.name
      },
      set(name) {
        this.update.name = name
      }
    },
    description: {
      get() {
        return this.institution.description
      },
      set(description) {
        this.update.description = description
      }
    },
    role: {
      get() {
        return this.institution.role
      }
    }
  },
  mounted() {
    this.update.name = this.name
    this.update.description = this.description
    this.$store.commit('nav/setBackUrl', '/institutions/mine')
  },
  methods: {
    async updateCommunity(institutionId, name, description) {
      try {
        if (await this.$validator.validateAll()) {
          await this.$axios.put(`/communities/${institutionId}`, {
            name,
            description
          })
          this.$store.commit('institution/updateIntitution', {
            name,
            description
          })
        }
      } catch (err) {
        this.handleErrors(err)
      }
    },
    async deleteCommunity(institutionId) {
      try {
        await this.$axios.delete(`/communities/${institutionId}`)
        this.$router.push('/institutions')
      } catch (err) {
        this.handleErrors(err)
      }
    }
  }
}
</script>
