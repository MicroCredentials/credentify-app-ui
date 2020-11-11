<template>
  <form class="billing form" @submit.prevent="submit()">
    <div class="form--heading">
      Add PayPal Credit to your account
    </div>
    <div class="fields">
      <div class="field--item">
        <label for="username">Select amount</label>
        <v-select :options="options" :label="'title'">
          <template slot="option" slot-scope="option">
            {{ option.title }}
            <span class="description">{{ option.description }}</span>
          </template>
        </v-select>
      </div>
    </div>
    <div class="help">
      This is a one-time payment and may take up to five minutes to process.
    </div>
  </form>
</template>

<script>
export default {
  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },
  data() {
    return {
      options: [
        {
          title: '€49 - 500 API calls',
          description: '(€0,098 / call)'
        },
        {
          title: '€99 - 1200 API calls',
          description: '(€0,083 / call)'
        },
        {
          title: '€149 - 2000 API calls',
          description: '(€0,0745 / call)'
        },
        {
          title: '€299 - 5000 API calls',
          description: '(€0,0598 / call)'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.description {
  opacity: 0.5;
  padding-left: 1rem;
}
</style>
