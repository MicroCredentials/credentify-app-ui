<template>
  <div>
    <div class="controls">
      <div class="search">
        <input
          class="search"
          type="text"
          placeholder="Quick search for a achievement"
        />
      </div>
    </div>
    <div class="options options--table">
      <div class="options--header">
        <div
          v-for="(header, index) in headers"
          :key="header.id"
          :class="['col', { last: index == headers.length - 1 }]"
          v-text="header"
        />
      </div>
      <n-link
        v-for="degree in degrees"
        :key="degree.id"
        :to="`/credentials/requests/${degree.id}`"
        :class="'option--item pointer'"
      >
        <div class="col" v-text="degree.degree" />
        <div class="col" v-text="degree.institution" />
        <div class="col" v-text="degree.achievers" />
        <div class="col last">
          <img height="12" src="~/assets/icons/arrow-right.svg" alt="Details" />
        </div>
      </n-link>
    </div>
    <paginate
      v-model="page"
      :page-count="3"
      :margin-pages="2"
      :prev-text="'&laquo;'"
      :next-text="'Next &raquo;'"
      :container-class="'pager'"
      :next-class="'page-next'"
      :prev-class="'page-prev'"
      :page-class="'page-item'"
    >
    </paginate>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      headers: ['Degree', 'Institution', 'Achievers', 'Details'],
      degrees: [
        {
          id: '123243212',
          degree: 'Business Psihology',
          institution: 'Faculty of Arts ',
          achievers: 37,
          type: 'Video hours'
        },
        {
          id: '123343212',
          degree: 'Business Psihology',
          institution: 'Faculty of Arts ',
          achievers: 37,
          type: 'Video hours'
        },
        {
          id: '123243214',
          degree: 'Business Psihology',
          institution: 'Faculty of Arts ',
          achievers: 37,
          type: 'Video hours'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.options--table {
  .col {
    &:nth-child(1) {
      flex-basis: 33%;
    }

    &:nth-child(2) {
      flex-basis: 33%;
    }

    &:nth-child(5) {
      flex-basis: 12%;
    }

    &:nth-child(6) {
      flex-basis: auto;
    }

    &.last {
      margin-left: auto;
    }
  }
}
</style>
