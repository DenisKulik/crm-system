<template>
  <button
    class="btn waves-effect waves-light btn-small"
    @click.stop="$emit('onRefresh')"
  >
    <i class="material-icons">refresh</i>
  </button>
</template>

<script>
export default {
  name: 'ButtonRefresh',
  components: {},
};
</script>
