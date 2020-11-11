<template>
  <div class="stage">
    <div class="icon--title mb-2">
      <img src="~/assets/icons/institutions-big.svg" alt="" />
      <h1>Institution membership</h1>
    </div>
    <div class="form--heading">
      Institution details
    </div>
    <div class="fields">
      <div class="field--item">
        <label class="equal">Institution</label>
        <strong>{{ institution.name }}</strong>
      </div>
      <div class="field--item">
        <label class="equal">Description</label>
        <div class="data shrink">{{ institution.description }}</div>
      </div>
      <div class="field--item">
        <label class="equal">Requsted role</label>
        <div v-if="request.status > 0" class="tag">
          {{ getRole(request.role) }}
        </div>
        <v-select
          v-else
          v-model="selected"
          :options="roles"
          :clearable="false"
          placeholder="Select a desired role"
          :label="'label'"
          name="role"
          :reduce="(role) => role.role"
        >
        </v-select>
      </div>
    </div>

    <div class="mt-2">
      <div v-if="request.status >= 1">
        <div v-if="request.status === 1">
          <div class="tag big framed yellow" v-text="'Requested'" />
          <p class="pt-1">
            Your request for membership in this insitution has been sent.
            <br />
            The institution will review your request and approve it.
          </p>
        </div>
        <div v-if="request.status === 2">
          <div class="tag big framed green" v-text="'Accepted'" />
          <p class="pt-1">
            Institution's Admin has accepted your membership. <br />
            You can now access it's achievements
          </p>
        </div>
        <div v-if="request.status === 3">
          <div class="tag big framed red" v-text="'Rejected'" />
          <p v-if="request.note" class="pt-1">
            <strong>Reaseon:</strong> {{ request.note }}
          </p>
        </div>
      </div>
      <b-link
        v-else
        inverted
        @click.native="requestMembership($route.params.id)"
        v-text="'Request membership'"
      />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, app, store }) {
    try {
      const institution = await app.$axios
        .get('/communities', { params: { filterIds: [params.id] } })
        .then((res) => res.data.data[0])
      const requests = await app.$axios
        .get('/profile/communities/requests')
        .then((res) => res.data.data)
      const requestExists = requests.filter(
        (id) => id.communityId === institution.id
      )[0]
      const request = requestExists || { status: 0 }
      return { institution, request, requests }
    } catch (err) {
      return { asyncDataError: err }
    }
  },

  data() {
    return {
      roles: [
        {
          role: 1,
          label: 'Student'
        },
        {
          role: 2,
          label: 'Teacher'
        },
        {
          role: 3,
          label: 'Admin'
        }
      ],
      selected: 1
    }
  },
  created() {
    this.$store.commit('nav/setTitle', 'Institution')
    this.$store.commit('nav/setBackUrl', '/institutions')
  },
  methods: {
    getRole(role) {
      return this.roles.find((x) => x.role === role)
        ? this.roles.find((x) => x.role === role).label
        : ''
    },
    async requestMembership(institutionId) {
      try {
        await this.$axios.post(
          `/profile/communities/${this.$route.params.id}/request`,
          { role: this.selected }
        )
        this.request.status = 1
        this.request.role = this.selected
      } catch (err) {
        this.handleErrors(err)
        this.request.status = 0
      }
    }
  }
}
</script>
