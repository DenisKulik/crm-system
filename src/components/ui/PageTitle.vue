<template>
  <div class="page-title">
    <h3>{{ titleKey | localize }}</h3>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    titleKey: {
      type: String,
      default: '',
    },
  },
};
</script>
