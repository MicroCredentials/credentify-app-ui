<template>
  <div class="stage">
    <transition name="layout" mode="out-in">
      <div v-if="loading" key="loading" class="loading">
        <img src="~/assets/icons/loader.svg" alt="Loading" />
      </div>
      <div v-else class="form">
        <div class="icon--title">
          <img src="~/assets/icons/achievements-big.svg" alt="" />
          <h1>Add new achievement</h1>
        </div>
        <div class="form--heading">
          Enter achievement details
        </div>
        <div class="fields">
          <div class="field--item">
            <label class="equal-small">Title</label>
            <input
              v-model="achievement.name"
              v-validate="'required'"
              name="name"
              type="text"
              placeholder="Enter achievement title"
            />
            <span
              v-show="errors.has('name')"
              class="alert"
              v-text="errors.first('name')"
            />
          </div>
          <div class="field--item">
            <label class="equal-small">Institution(s)</label>
            <v-select
              v-model="achievement.communityIds"
              v-validate="'required'"
              :options="institutions"
              multiple
              placeholder="Select instituion"
              :label="'name'"
              name="institution"
              :reduce="(institution) => institution.id"
            >
              <span slot="no-options"
                >There are no available institutions.</span
              >
            </v-select>
            <span
              v-show="errors.has('institution')"
              class="alert"
              v-text="errors.first('institution')"
            />
          </div>
          <div class="field--item">
            <label class="equal-small">Tag(s)</label>
            <tag-input
              :tags="achievement.tag"
              placeholder="Enter comma separated tags"
            />
            <span
              v-show="validationError"
              class="alert"
              v-text="'The tags field is required.'"
            />
          </div>
          <div class="field--item">
            <label class="equal-small">Consists of</label>
            <v-select
              v-model="achievement.dependentAchievementIds"
              :options="achievements"
              multiple
              placeholder="Other credentials which make up this credential"
              :label="'name'"
              name="dependentAchievementIds"
              :reduce="(achievement) => achievement.id"
            >
              <span slot="no-options"
                >There are no available achievements.</span
              >
            </v-select>
            <span
              v-show="errors.has('dependentAchievementIds')"
              class="alert"
              v-text="errors.first('dependentAchievementIds')"
            />
          </div>
          <div class="field--item">
            <label class="equal-small">Can consists of</label>
            <v-select
              v-model="achievement.canConsistOfIds"
              :options="achievements"
              multiple
              placeholder="Other credentials which make up this credential"
              :label="'name'"
              name="canConsistOfIds"
              :reduce="(achievement) => achievement.id"
            >
              <span slot="no-options"
                >There are no available achievements.</span
              >
            </v-select>
            <span
              v-show="errors.has('canConsistOfIds')"
              class="alert"
              v-text="errors.first('canConsistOfIds')"
            />
          </div>
        </div>
        <div class="form--heading">
          Additional fields
        </div>
        <div class="fields">
          <div
            v-for="(field, key) in schema"
            :key="field.id"
            class="field--item"
          >
            <label class="equal-small" v-text="field.label" />
            <input
              v-model="achievement[key]"
              :name="key"
              type="text"
              :placeholder="field.description"
            />
          </div>
        </div>
        <toolbar>
          <b-link @click.native="createAchievement(achievement)">
            Create new achievement
          </b-link>
        </toolbar>
      </div>
    </transition>
    <sweet-modal ref="errorModal" title="Error" overlay-theme="dark">
      <p>{{ errors.first('response') }}</p>
      <b-link @click.native="$refs.errorModal.close()">
        Close
      </b-link>
    </sweet-modal>
  </div>
</template>

<script>
import TagInput from '~/components/ui/TagInput.vue'
import schema from '~/static/data/schema.json'

export default {
  components: {
    TagInput
  },
  async asyncData({ app, params }) {
    try {
      const institutions = await app.$axios
        // Get communities with 'create achievemet' ability
        .get('/communities/', {
          params: {
            filterPermissionKinds: ['2016'],
            limit: 100
          }
        })
        .then((res) => res.data.data)
      const achievements = await app.$axios
        .get('/achievements', {
          params: {
            limit: 100
          }
        })
        .then((res) => res.data.data)
      return { achievements, institutions }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      schema,
      loading: false,
      institutions: [],
      validationError: false,
      achievement: {
        communityIds: [],
        tag: [],
        dependentAchievementIds: []
      }
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Achievements')
    this.$store.commit('nav/setBackUrl', '/achievements')
  },
  methods: {
    async createAchievement(data) {
      try {
        if (this.achievement.tag.length === 0) {
          this.validationError = true
        } else {
          this.validationError = false
        }

        if ((await this.$validator.validateAll()) && !this.validationError) {
          this.loading = true
          await this.$axios.post('/achievements', { ...data })
          this.$router.push('/achievements')
        }
      } catch (err) {
        this.handleErrors(err)
        this.loading = false
      }
    }
  }
}
</script>
