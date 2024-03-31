<template>
  <div class="grey darken-1 empty-layout">
    <RouterView/>
  </div>
</template>

<script>
import { messages } from '@/utils';

export default {
  name: 'EmptyLayout',
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    },
  },
};
</script>
