<template>
  <div class="stage">
    <div class="icon--title mb-2">
      <img src="~/assets/icons/institutions-big.svg" alt="" />
      <h1>Request for membership</h1>
    </div>
    <div class="form--heading">
      Request details
    </div>
    <div class="fields">
      <div class="field--item">
        <label class="equal">User</label>
        <strong
          >{{ request.profile.firstName }}
          {{ request.profile.lastName }}</strong
        >
      </div>
      <div class="field--item">
        <label class="equal">Institution</label>
        {{ request.community.name }}
      </div>
      <div class="field--item">
        <label class="equal">Requested on</label>
        {{ new Date(request.createdAt) | dateFormat('YYYY-MM-DD') }}
      </div>
      <div v-if="request.status < 2" class="field--item">
        <label class="equal">Desired role</label>
        <v-select
          v-model="request.role"
          :options="roles"
          :clearable="false"
          placeholder="Select a desired role"
          :label="'label'"
          name="role"
          :reduce="(role) => role.role"
        >
          <span slot="no-options">There are no available achievements.</span>
        </v-select>
      </div>
      <div class="field--item">
        <label class="equal">Status</label>
        <div
          v-if="request.status === 1"
          class="tag yellow"
          v-text="'Pending request'"
        />
        <div v-if="request.status === 2" class="tag green">
          Accepted as {{ getRole(request.role) }}
        </div>
        <div v-if="request.status === 3" class="tag red" v-text="'Rejected'" />
      </div>
    </div>
    <sweet-modal
      ref="confirmReject"
      title="Rejection confirmation"
      overlay-theme="dark"
    >
      <p>
        You're about to permanently reject this request. Enter the reason
        bellow:
      </p>
      <div class="fields mb-2">
        <div class="field--item">
          <textarea
            v-model="note"
            v-validate="'required'"
            class="note"
            name="note"
            placeholder="Write a short reaseon for rejection"
          >
          </textarea>
          <span
            v-show="errors.has('note')"
            class="alert no-padding"
            v-text="errors.first('note')"
          />
        </div>
      </div>
      <b-link class="mr-2" @click.native="reject()" v-text="'Reject'" />
      <b-link
        inverted
        @click.native="$refs.confirmReject.close()"
        v-text="'Cancel'"
      />
    </sweet-modal>
    <toolbar v-if="request.status <= 1" space-between>
      <b-link @click.native="accept()" v-text="'Accept request'" />
      <b-link
        inverted
        @click.native="$refs.confirmReject.open()"
        v-text="'Reject request'"
      />
    </toolbar>
  </div>
</template>

<script>
export default {
  async asyncData({ params, app, store }) {
    try {
      const request = await app.$axios
        .get('/communities/requests', {
          params: {
            filterIds: [params.requestId]
          }
        })
        .then((res) => res.data.data[0])

      return { request }
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
      selected: 1,
      requested: false,
      note: ''
    }
  },
  created() {
    this.$store.commit('nav/setTitle', `Request`)
    this.$store.commit('nav/setBackUrl', '/users/requests')
  },
  methods: {
    async accept() {
      try {
        await this.$axios.post(
          `/communities/requests/${this.request.id}/accept`,
          { role: this.request.role }
        )
        this.$router.push('/users/requests')
      } catch (err) {
        this.handleErrors(err)
      }
    },
    async reject() {
      try {
        await this.$axios.post(
          `/communities/requests/${this.request.id}/reject`,
          {
            note: this.note
          }
        )
        this.$router.push('/users/requests')
      } catch (err) {
        this.handleErrors(err)
      }
    }
  }
}
</script>
