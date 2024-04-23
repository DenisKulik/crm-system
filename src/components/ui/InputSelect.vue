<template>
  <div class="input-field">
    <select
      ref="select"
      :value="value"
      @change="onChange"
    >
      <option
        v-for="option in optionList"
        :key="option.id"
        :value="option.id"
      >
        {{ option.title }}
      </option>
    </select>
    <label>{{ labelKey | localize }}</label>
  </div>
</template>

<script>

export default {
  name: 'InputSelect',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    labelKey: {
      type: String,
      default: '',
    },
    optionList: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    select: null,
  }),
  mounted() {
    this.$nextTick(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    });
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
