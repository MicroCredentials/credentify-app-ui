<template>
  <div class="credential-stage">
    <span v-if="stage == 0" class="tag blue">no</span>
    <span v-if="stage == 1" class="tag blue">request</span>
    <span v-if="stage == 2" class="tag red">rejected</span>
    <span v-if="stage == 3" class="tag">canceled</span>
    <span v-if="stage == 4" class="tag yellow">
      pending
    </span>
    <span v-if="stage == 5" class="tag green">complete</span>
    <span v-if="stage == 6" class="tag red">failed</span>
    <span v-if="stage == 7" class="tag yellow">
      <img src="/icons/loader-yellow.svg" alt="Issuing" />
      issuing
    </span>
    <span v-if="stage == 8" class="tag red">issuing failed</span>
  </div>
</template>

<script>
export default {
  props: {
    stage: {
      type: Number,
      default: 0
    }
  }
}
</script>
