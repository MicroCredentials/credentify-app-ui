<template>
  <div class="box">
    <table v-if="Object.keys(data).length != 0" class="metadata">
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, key) in flattenObject(parsedData)" :key="row[key]">
          <td v-if="key">{{ key }}</td>
          <td v-if="row">{{ row }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      default: '',
      type: String
    }
  },
  computed: {
    parsedData() {
      return this.data ? JSON.parse(this.data) : {}
    }
  },
  methods: {
    flattenObject(obj) {
      for (const [key] of Object.entries(obj)) {
        if (obj[key] === null || obj[key].length === 0) {
          delete obj[key]
        }
      }
      const result = {}
      for (const i in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, i)) {
          continue
        }
        if (typeof obj[i] === 'object' && obj[i] !== null) {
          const flatObject = this.flattenObject(obj[i])
          for (const x in flatObject) {
            // eslint-disable-next-line no-prototype-builtins
            if (!Object.prototype.hasOwnProperty.call(flatObject, x)) {
              continue
            }
            result[i + '.' + x] = flatObject[x]
          }
        } else {
          result[i] = obj[i]
        }
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.metadata {
  border-collapse: collapse;
  font-size: 15px;
  width: 100%;

  td,
  th {
    padding: 10px 15px;
    text-align: left;
  }

  thead {
    border-bottom: 1px solid var(--border-color);
    font-weight: 500;

    th {
      font-weight: 500;
    }
  }

  td:first-child {
    color: var(--black);
    font-weight: 500;
    padding-right: 2rem;
    vertical-align: top;
  }

  td:nth-child(2) {
    width: 100%;
  }
}

tbody tr:nth-child(even) {
  td {
    background-color: rgba(0, 0, 0, 0.03);
  }
}
</style>
