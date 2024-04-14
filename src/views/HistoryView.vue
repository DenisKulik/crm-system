<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <AppLoader v-if="loading"/>
    <p class="center" v-else-if="!records.length">
      Записей пока нет.
      <RouterLink to="/record">Добавьте первую запись</RouterLink>
    </p>
    <section v-else>
      <HistoryTable :records="records"/>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/history/HistoryTable.vue';

export default {
  name: 'HistoryView',
  components: { HistoryTable },
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords');
    const records = await this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetchCategories');
    this.records = this.formatRecords(records);
    this.loading = false;
  },
  methods: {
    formatRecords(records) {
      return records.map((record) => ({
        ...record,
        categoryName: this.categories.find((category) => category.id === record.categoryID).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }));
    },
  },
};
</script>
