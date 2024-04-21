<template>
  <div class="switch">
    <label>
      {{ titleLeft }}
      <input type="checkbox" :checked="value" @change="onChangeHandler">
      <span class="lever"></span>
      {{ titleRight }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseSwitcher',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    titleLeft: {
      type: String,
      default: '',
    },
    titleRight: {
      type: String,
      default: '',
    },
  },
  methods: {
    onChangeHandler(event) {
      this.$emit('input', event.target.checked);
    },
  },
};
</script>
