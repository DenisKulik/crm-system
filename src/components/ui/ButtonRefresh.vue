<template>
  <button class="btn waves-effect waves-light btn-small" @click.stop="onRefresh">
    <RefreshIcon/>
  </button>
</template>

<script>
import RefreshIcon from '@/components/icons/RefreshIcon.vue';

export default {
  name: 'ButtonRefresh',
  components: { RefreshIcon },
  methods: {
    onRefresh() {
      this.$emit('onRefresh');
    },
  },
};
</script>
