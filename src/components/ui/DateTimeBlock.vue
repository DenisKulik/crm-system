<template>
  <span class="white-text">{{ date | date('datetime') }}</span>
</template>

<script>
export default {
  name: 'DateTimeBlock',
  data: () => ({
    date: new Date(),
    interval: null,
  }),
  mounted() {
    this.interval = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    updateTime() {
      this.date = new Date();
    },
  },
};
</script>
