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
      <HistoryTable :records="items"/>

      <AppPaginate
        v-model="currentPage"
        :page-count="pageCount"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
        :click-handler="pageChangeHandler"
      />
    </section>
  </div>
</template>

<script>
import { paginationMixin } from '@/mixins';
import HistoryTable from '@/components/history/HistoryTable.vue';

export default {
  name: 'HistoryView',
  components: { HistoryTable },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setupPagination(this.formatRecords(this.records, categories));
    this.loading = false;
  },
  methods: {
    formatRecords(records, categories) {
      return records.map((record) => ({
        ...record,
        categoryName: categories.find((category) => category.id === record.categoryID).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }));
    },
  },
};
</script>
