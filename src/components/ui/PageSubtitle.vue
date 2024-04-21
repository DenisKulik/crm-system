<template>
  <div class="page-subtitle">
    <h4>{{ subtitleKey | localize }}</h4>
  </div>
</template>

<script>
export default {
  name: 'PageSubtitle',
  props: {
    subtitleKey: {
      type: String,
      default: '',
    },
  },
};
</script>
