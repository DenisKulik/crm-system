<template>
  <div class="card" :class="record.type === 'income' ? 'green' : 'red'">
    <div class="card-content white-text">
      <p>{{ 'Description' | localize }}: {{ record.description }} </p>
      <p>{{ 'Amount' | localize }}: {{ record.amount | currency('RUB') }}</p>
      <p>{{ 'Category' | localize }}: {{ record.categoryName }}</p>
      <small>{{ record.date | date('date') }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCard',
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
};
</script>
