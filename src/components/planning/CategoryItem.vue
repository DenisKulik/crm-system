<template>
  <div>
    <p>
      <strong>{{ category.title }}:</strong>
      {{ category.spend | currency('RUB') }} {{ 'Out' | localize }}
      {{ category.limit | currency('RUB') }}
    </p>
    <div class="progress" v-tooltip="category.tooltip">
      <div
        class="determinate"
        :class="category.progressColor"
        :style="{'width': category.progressPercent + '%'}"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>
