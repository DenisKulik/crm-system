<template>
  <p>
    <label>
      <input
        class="with-gap"
        type="radio"
        data-testid="type-radio"
        :name="name"
        :value="value"
        :checked="checked"
        @change="onChange"
      />
      <span>
        {{ (value === 'income' ? 'Income' : 'Outcome') | localize }}
      </span>
    </label>
  </p>
</template>

<script>

export default {
  name: 'InputRadio',
  props: {
    value: {
      type: String,
      default: 'income',
    },
    name: {
      type: String,
      default: 'type',
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(event) {
      this.$emit('change', event.target.value);
    },
  },
};
</script>
