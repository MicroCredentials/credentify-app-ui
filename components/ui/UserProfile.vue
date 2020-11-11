<template>
  <div class="fields">
    <div class="field--item profile">
      <div class="description">
        <div class="user grid-x grid-margin-x">
          <div class="user--image cell shrink">
            <v-gravatar
              :email="participant.email"
              :alt="`${participant.firstName} ${participant.lastName}`"
              rating="g"
              :size="90"
            />
          </div>
          <div class="user--data cell auto">
            <strong v-if="participant.firstName" class="name">
              {{ participant.firstName }}
              {{ participant.lastName }}
            </strong>
            <span>{{ participant.email }}</span>
            <span
              >Member since:
              {{
                new Date(participant._createdAt) | dateFormat('YYYY-MM-DD')
              }}</span
            >
          </div>
          <div class="cell shrink tags">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    participant: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
.tags {
  align-items: flex-end;
  display: flex;
  flex-flow: column;
  text-align: right;

  .credential-stage .tag {
    font-size: 18px;

    img {
      height: auto;
    }
  }
}
</style>
