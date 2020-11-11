<template>
  <div v-if="Object.keys(achievement).length > 0" class="stage">
    <div class="icon--title">
      <img src="~/assets/icons/achievements-big.svg" alt="Achievement" />
      <h1 v-if="achievement.name" class="name">{{ achievement.name }}</h1>
    </div>
    <div class="form--heading">
      Achievement details
    </div>
    <div class="fields">
      <div class="field--item achievement">
        <div class="achievement--data col">
          <div class="line">
            <label>Date issued:</label>
            <div class="data">
              {{ new Date(achievement._createdAt) | dateFormat('YYYY-MM-DD') }}
            </div>
          </div>
          <div class="line">
            <label>Institution(s):</label>
            <ul class="data">
              <li
                v-for="item in getInstitutions(
                  achievement.communityIds,
                  institutions
                )"
                :key="item.id"
                v-text="item.name"
              />
            </ul>
          </div>
          <div v-if="achievement.publisherId" class="line">
            <label>Publisher:</label>
            <div class="data">
              {{ achievement.publisherId }}
            </div>
          </div>
          <div class="line">
            <label>Tag(s):</label>
            <div class="data">
              <span
                v-for="tag in achievement.tag"
                :key="tag"
                class="tag mr-1"
                v-text="tag"
              />
            </div>
          </div>
          <n-link
            v-if="hasAbility([2018, institutionId])"
            class="link"
            :to="`/achievements/${$route.params.achievementId}/update`"
          >
            Update achievement
          </n-link>
        </div>
        <div v-if="!hasLinkedWallet()" warning class="fields danger no-wallet">
          Before you can <strong>request</strong> this credential you must link
          your digital wallet with your profile. You can link your wallet in
          your
          <strong><nuxt-link to="/profile">profile</nuxt-link></strong>
          section.
        </div>
        <div v-else-if="!requested && !existingCredential" class="cta">
          <b-link
            inverted
            @click.native="requestCredential($route.params.achievementId)"
            >Request a credential</b-link
          >
        </div>
        <div v-else class="cta">
          <div class="tag big">Requested</div>
        </div>
      </div>
    </div>
    <div v-if="dependentAchievements.length">
      <div class="form--heading">
        Consists of
      </div>
      <table-achievements
        :data="dependentAchievements"
        :institutions="institutions"
      />
    </div>
    <div v-if="canConsistOf.length">
      <div class="form--heading">
        Can consists of
      </div>
      <table-achievements :data="canConsistOf" :institutions="institutions" />
    </div>
    <div v-if="Object.keys(additionalInformation).length != 0">
      <div class="form--heading">
        Additional information
      </div>
      <div class="options">
        <div
          v-for="(field, key) in additionalInformation"
          :key="key"
          class="option--item"
        >
          <label class="equal-small label" v-text="getKeyLabel(key)" />
          <div class="value">
            {{ field }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasAbility([2017])">
      <div class="form--heading danger">
        Danger zone
      </div>
      <div class="fields danger">
        <div class="field--item">
          <div class="description">
            This action will mark the achievement as deleted. <br />
            The associated data will be removed after 30 days.
          </div>
          <div class="cta">
            <b-link
              inverted
              @click.native="
                deleteCourse(
                  achievement.communityId,
                  achievement.id,
                  $refs.confirmCourseRemoval
                )
              "
              v-text="'Delete achievement'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="stage">
    <div class="icon--title">
      <h1 class="name">Achievement not found</h1>
    </div>
    The achievement with such ID does not exists or was deleted.
  </div>
</template>

<script>
import TableAchievements from '~/components/TableAchievements'
import schema from '~/static/data/schema.json'

// /credentials?filterAchievementIds=[ID] stage
export default {
  components: {
    TableAchievements
  },
  async asyncData({ app, params }) {
    try {
      const achievement = await app.$axios
        .get('/achievements', {
          params: {
            filterIds: [params.achievementId]
          }
        })
        .then((res) => res.data.data[0])
      let dependentAchievements = []
      let canConsistOf = []
      let institutions = []

      const existingCredential = await app.$axios
        .get('/profile/credentials', {
          params: {
            filterAchievementIds: [params.achievementId],
            filterStages: [1]
          }
        })
        .then((res) => res.data.data[0])

      if (Object.keys(achievement).length > 0) {
        if (achievement.dependentAchievementIds.length > 0) {
          dependentAchievements = await app.$axios
            .get('/achievements', {
              params: { filterIds: achievement.dependentAchievementIds }
            })
            .then((res) => res.data.data)
        }
        if (
          'canConsistOfIds' in achievement &&
          achievement.canConsistOfIds.length > 0
        ) {
          canConsistOf = await app.$axios
            .get('/achievements', {
              params: { filterIds: achievement.canConsistOfIds }
            })
            .then((res) => res.data.data)
        }
        institutions = await app.$axios
          .get('/communities', {
            params: { limit: 100 }
          })
          .then((res) => res.data.data)
      }
      return {
        achievement,
        institutions,
        dependentAchievements,
        existingCredential,
        canConsistOf
      }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      schema,
      requested: false,
      achievement: {}
    }
  },
  computed: {
    additionalInformation() {
      const obj = JSON.parse(JSON.stringify(this.achievement))
      const exclude = [
        'id',
        'name',
        'tag',
        'communityIds',
        'dependentAchievementIds',
        'publisherId',
        'canConsistOfIds',
        '_createdAt',
        '_updatedAt'
      ]
      exclude.forEach((key) => delete obj[key])
      for (const [key] of Object.entries(obj)) {
        if (obj[key] === null || obj[key].length === 0) {
          delete obj[key]
        }
      }
      return obj
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Achievement details')
    this.$store.commit('nav/setBackUrl', '/achievements')
  },
  methods: {
    hasLinkedWallet() {
      return (
        this.$auth.user &&
        this.$auth.user.wallet &&
        this.$auth.user.wallet.address
      )
    },
    async requestCredential(achievementId) {
      // TODO: Check for wallet!
      try {
        await this.$axios.post('/profile/credentials/', { achievementId })
        this.requested = true
      } catch (err) {
        this.handleErrors(err)
        this.requested = false
      }
    },
    deleteCourse(communityId, achievementId, modal) {
      this.$modal.show('dialog', {
        title: 'Delete confirmation',
        text:
          "You're about to permanently delete this achievement. Are you sure?",
        buttons: [
          { title: 'Close' },
          {
            title: 'Yes, delete it',
            class: 'button blue',
            handler: async () => {
              this.$modal.hide('dialog')
              try {
                await this.$axios.delete(`/achievements/${achievementId}`)
                this.$router.push('/achievements')
              } catch (err) {
                this.handleErrors(err)
              }
            }
          }
        ]
      })
    },
    getKeyLabel(key) {
      return this.schema[key] ? this.schema[key].label : key
    }
  }
}
</script>

<style scoped lang="scss">
.achievement {
  padding-bottom: 20px;
  padding-top: 20px;

  @include breakpoint(medium) {
    align-items: flex-start;
    display: flex;
    flex-wrap: nowrap;
  }

  &--data {
    flex: 1;

    .name {
      font-size: 25px;
      margin-bottom: 1.5rem;
    }

    a {
      color: $primary;
    }
  }

  .line {
    display: flex;
    margin-bottom: 10px;

    .data {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  .col {
    font-size: 17px;
    margin-right: 1rem;

    label {
      display: inline-block;
      font-weight: bold;
      min-width: 150px;
    }
  }

  .link {
    display: inline-block;
    font-weight: bold;
    margin-top: 2rem;
  }

  .cta .button {
    min-width: 220px;
  }
}

.no-wallet {
  max-width: 370px;
  padding: 10px;
}

.options .value {
  flex-basis: 65%;
}
</style>
