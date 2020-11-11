<template>
  <div>
    <div v-if="credentials.length" class="options table--credentials">
      <div class="options--header">
        <div
          v-for="(header, index) in headers"
          :key="header.id"
          :class="['col', { last: index == headers.length - 1 }]"
          v-text="header"
        />
      </div>
      <n-link
        v-for="credential in credentials"
        :key="credential.id"
        :to="`/credentials/mine/${credential.id}`"
        :class="'option--item pointer'"
      >
        <strong class="col" v-text="credential.achievement.name" />
        <div class="col">
          <div
            v-for="item in credential.communities"
            :key="item.id"
            v-text="item.name"
          ></div>
        </div>
        <div class="col"><credential-stage :stage="credential.stage" /></div>
        <div class="col last">
          <img height="12" src="~/assets/icons/arrow-right.svg" alt="Details" />
        </div>
      </n-link>
    </div>
    <div v-else class="fields">
      <div class="field--item align-center">
        You don't have any credentials.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    try {
      const credentials = await app.$axios
        .get('/profile/credentials')
        .then((res) => res.data.data)
      return {
        credentials
      }
    } catch (err) {
      return { asyncDataError: err }
    }
  },
  data() {
    return {
      headers: ['Credential', 'Institution(s)', 'Stage', 'Details'],
      credentials: [],
      institutions: []
    }
  }
}
</script>
