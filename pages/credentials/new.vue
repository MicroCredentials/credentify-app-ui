<template>
  <div class="stage">
    <transition name="layout" mode="out-in">
      <div v-if="loading" key="loading" class="loading">
        <img src="~/assets/icons/loader.svg" alt="Loading" />
      </div>
      <div v-else class="form">
        <div class="icon--title">
          <img src="~/assets/icons/credentials-big.svg" alt="" />
          <h1>Issue new credential</h1>
        </div>
        <form class="billing form">
          <div class="form--heading">
            Enter credential details
          </div>
          <div class="fields">
            <div class="field--item">
              <label class="equal-small">Select achievement</label>
              <v-select
                v-model="credential.achievementId"
                v-validate="'required'"
                :options="achievements"
                placeholder="Select achievement"
                :reduce="(achievement) => achievement.id"
                :label="'name'"
                name="achievement"
              >
                <span slot="no-options"
                  >No available achievements. Create one first.</span
                >
              </v-select>
              <span
                v-show="errors.has('achievement')"
                class="alert"
                v-text="errors.first('achievement')"
              />
            </div>
            <div class="field--item">
              <label class="equal-small">Select participant</label>
              <v-select
                v-model="credential.profileId"
                v-validate="'required'"
                :options="participants"
                placeholder="Select participant"
                :reduce="(participant) => participant.id"
                :label="'id'"
                name="participant"
              >
                <template slot="option" slot-scope="option">
                  <span class="name"
                    >{{ option.firstName }} {{ option.lastName }}</span
                  >
                  <span class="email">({{ option.email }})</span>
                </template>
                <template slot="selected-option" slot-scope="option">
                  <span class="name"
                    >{{ option.firstName }} {{ option.lastName }}</span
                  >
                </template>
                <template slot="no-options">
                  No available participants. Invite one first.
                </template>
              </v-select>
              <span
                v-show="errors.has('participant')"
                class="alert"
                v-text="errors.first('participant')"
              />
            </div>
          </div>
        </form>
        <toolbar>
          <b-link
            @click.native="issueDegree()"
            v-text="'Issue new credential'"
          />
        </toolbar>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    try {
      const achievements = await app.$axios
        .get('/achievements', {
          params: {
            limit: 500
          }
        })
        .then((res) => res.data.data)
      const participants = await app.$axios
        .get('/users', {
          params: {
            limit: 500
          }
        })
        .then((res) => res.data.data)
      return {
        achievements,
        participants
      }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      loading: false,
      credential: {
        achievementId: '',
        profileId: ''
      }
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'New credential')
    this.$store.commit('nav/setBackUrl', '/credentials')
  },
  methods: {
    async issueDegree() {
      if (!(await this.$validator.validateAll())) {
        return
      }

      try {
        this.loading = true
        await this.$axios.post('/credentials', this.credential)
        this.$router.push('/credentials/all')
      } catch (err) {
        this.handleErrors(err)
        this.loading = false
      }
    }
  }
}
</script>
