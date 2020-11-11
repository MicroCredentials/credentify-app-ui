<template>
  <div class="input-tag" @click="focusNewTag()">
    <span v-for="(tag, index) in tags" :key="index" class="tag green">
      <span>{{ tag }}</span>
      <a class="remove" @click.prevent.stop="remove(index)">×</a>
    </span>

    <input
      ref="newTag"
      v-model="newTag"
      :placeholder="placeholder"
      type="text"
      class="new-tag"
      @keydown.delete.stop="removeLastTag()"
      @keydown.enter.188.tab.prevent.stop="addNew(newTag)"
      @blur.stop="addNew(newTag)"
    />
  </div>
</template>

<script lang="javascript">
const validators = {
  email: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  url: new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
  text: new RegExp(/^[a-zA-Z]+$/),
  digits: new RegExp(/^[\d() .:\-+#]+$/),
  isodate: new RegExp(/^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/),
};

export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    validate: {
      type: String,
      default: '',
    },
    onPasteSeparator: {
      type: String,
      default: null,
    },
    length: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      newTag: '',
    };
  },

  methods: {
    focusNewTag() {
      if (this.readOnly) { return; }
      this.$nextTick(() => this.$refs.newTag.focus());
    },

    addNew(tag) {
      if (this.onPasteSeparator && tag.includes(this.onPasteSeparator)) {
        tag.split(this.onPasteSeparator)
          .map((t) => t.trim())
          .map(this.addNew);
        return;
      }

      if (tag && !this.tags.includes(tag) && this.validateIfNeeded(tag) && this.validateLengthIfNeeded(tag)) {
        this.tags.push(tag);
        this.tagChange();
      }
      this.newTag = '';
    },

    validateIfNeeded(tagValue) {
      if (this.validate === '' || this.validate === undefined) {
        return true;
      } else if (Object.keys(validators).includes(this.validate)) {
        return validators[this.validate].test(tagValue);
      }
      return true;
    },

    validateLengthIfNeeded(tagValue) {
      if (this.length === null || this.length === undefined) {
        return true;
      } else if (this.length.min && this.length.max) {
        return tagValue.length >= this.length.min && tagValue.length <= this.length.max;
      } else if (this.length.min) {
        return tagValue.length >= this.length.min;
      } else if (this.length.max) {
        return tagValue.length <= this.length.max;
      }
      return true;
    },

    remove(index) {
      this.tags.splice(index, 1);
      this.tagChange();
    },

    removeLastTag() {
      if (this.newTag) { return; }
      this.tags.pop();
      this.tagChange();
    },

    tagChange() {
      if (this.onChange) {
        // avoid passing the observer
        this.onChange(JSON.parse(JSON.stringify(this.tags)));
      }
    },
  },
};
</script>

<style lang="scss">
.input-tag {
  align-items: center;
  cursor: text;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  overflow: hidden;
  text-align: left;

  .tag {
    align-items: center;
    display: flex;
    margin-right: 10px;
  }

  .remove {
    color: inherit;
    cursor: pointer;
    font-size: 15px;
    padding-left: 8px;

    &:hover {
      text-decoration: none;
    }
  }

  .new-tag {
    flex: 1;
    width: 100%;
  }

  &.read-only {
    cursor: default;
  }
}
</style>
