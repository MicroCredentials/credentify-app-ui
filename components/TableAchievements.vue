<template>
  <div>
    <div v-if="data.length" class="options table--achievements">
      <div class="options--header">
        <div :class="appendClass">Achievement</div>
        <div :class="appendClass">Institution(s)</div>
        <div :class="appendClass">Type</div>
        <div v-if="data[0].credentialStage >= 0" :class="appendClass">
          Credential
        </div>
        <div class="col last">Details</div>
      </div>
      <n-link
        v-for="achievement in data"
        :key="achievement.id"
        :to="`/achievements/${achievement.id}`"
        :class="'option--item pointer'"
      >
        <div :class="appendClass" v-text="achievement.name" />
        <div :class="appendClass">
          <div
            v-for="item in getInstitutions(
              achievement.communityIds,
              institutions
            )"
            :key="item.id"
            v-text="item.name"
          ></div>
        </div>
        <div :class="appendClass">
          <span
            v-for="tag in achievement.tag"
            :key="tag.id"
            class="tag mr-1"
            v-text="tag"
          >
          </span>
        </div>
        <div v-if="achievement.credentialStage >= 0" :class="appendClass">
          <credential-stage :stage="achievement.credentialStage" />
        </div>
        <div class="col last">
          <img height="12" src="~/assets/icons/arrow-right.svg" alt="Details" />
        </div>
      </n-link>
    </div>
    <div v-else class="fields">
      <div class="field--item align-center">
        There are no achievements yet to display.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    institutions: {
      type: Array,
      default: () => []
    },
    institution: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    appendClass() {
      return this.data[0].credentialStage >= 0 ? 'colStage' : 'col'
    }
  }
}
</script>

<style scoped lang="scss">
.table--achievements {
  .col {
    &:nth-child(1) {
      flex-basis: 35%;
      font-weight: bold;
    }

    &:nth-child(2) {
      flex-basis: 35%;
    }

    &:nth-child(3) {
      flex-basis: 25%;
    }

    &:nth-child(4) {
      flex-basis: auto;
    }

    &.last {
      margin-left: auto;
    }
  }

  .colStage {
    &:nth-child(1) {
      flex-basis: 32%;
      font-weight: bold;
    }

    &:nth-child(2) {
      flex-basis: 25%;
    }

    &:nth-child(3) {
      flex-basis: 20%;
    }

    &:nth-child(4) {
      flex-basis: 8%;
    }

    &:nth-child(5) {
      flex-basis: auto;
    }

    &.last {
      margin-left: auto;
    }
  }
}
</style>
