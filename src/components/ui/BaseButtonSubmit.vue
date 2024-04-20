<template>
  <button class="btn waves-effect waves-light" type="submit">
    {{ titleKey | localize }}
    <i class="material-icons right">send</i>
  </button>
</template>

<script>
export default {
  name: 'BaseButtonSubmit',
  props: {
    titleKey: {
      type: String,
      default: '',
    },
  },
};
</script>
