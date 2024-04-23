<template>
  <div class="input-field">
    <input
      :id="fieldId"
      :type="fieldType"
      :value="value"
      :class="{invalid: hasError}"
      @input="onInput"
    >
    <label :for="fieldId">
      {{ labelKey | localize }}
    </label>
    <span v-if="hasError" class="helper-text invalid">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>

export default {
  name: 'InputField',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    fieldId: {
      type: String,
      default: 'input-field',
    },
    fieldType: {
      type: String,
      default: 'text',
    },
    labelKey: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.$nextTick(() => {
      M.updateTextFields();
    });
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
