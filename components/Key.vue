<template>
  <div class="api-key">
    <div class="icon">
      <img src="~/assets/icons/key.svg" alt="" />
    </div>
    <div class="col grow">
      <div class="api">
        {{ key.label }}
        <span v-if="key.isDev" class="tag yellow framed is-dev">DEV</span>
      </div>
      <div class="description">
        {{ key.description }}
      </div>
    </div>
    <div class="col">
      <div class="label">
        API ID
      </div>
      <div class="id">
        {{ key.id }}
      </div>
    </div>
    <div class="col">
      <div class="label">
        Requests
      </div>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        class="chart"
        :height="chartHeight"
        width="80"
        aria-labelledby="title"
        role="img"
      >
        <title id="title">A bart chart showing information</title>
        <g
          v-for="(n, i) in 20"
          :key="n"
          class="bar"
          :transform="`translate(${i * 4},0)`"
        >
          <rect
            :height="getRandomInt(2, chartHeight)"
            :y="chartHeight - randomInt"
            width="3"
          />
        </g>
      </svg>
    </div>
    <div class="col">
      <div class="label">
        Status
      </div>
      <div class="status">
        <span v-if="key.status == 1" class="tag green round">Healthy</span>
        <span v-if="key.status == 2" class="tag red round">Alert</span>
      </div>
    </div>
    <div class="cta">
      <img src="~/assets/icons/arrow-right.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartHeight: 15
    }
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      const randomInt = Math.floor(Math.random() * (max - min + 1)) + min
      this.randomInt = randomInt
      return randomInt
    }
  }
}
</script>

<style lang="scss" scoped>
.api-key {
  .icon {
    padding-right: var(--space);
  }

  .col {
    flex-basis: 20%;
    padding-right: var(--space);
  }

  .cta {
    margin-left: auto;
  }

  .label,
  .api {
    font-size: 13px;
    font-weight: bold;
    padding-bottom: 4px;
  }

  .api {
    font-size: 17px;
  }

  .description,
  .id {
    color: $help;
  }

  .status .tag {
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    margin-top: 4px;
    padding: 3px 10px;
  }

  .is-dev {
    font-size: 13px;
    margin-left: 10px;
    padding: 1px 6px;
  }

  .chart {
    margin-top: 5px;

    .bar {
      fill: lighten($help, 10%);

      &:hover {
        fill: $blue;
      }
    }
  }
}
</style>
