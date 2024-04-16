<template>
  <div>
    <div class="page-title">
      <h3>{{ 'HistoryTitle' | localize }}</h3>
    </div>
    <HistoryChart
      :records="records"
      :categories="categories"
    />
    <AppLoader v-if="loading"/>
    <p class="center" v-else-if="!records.length">
      {{ 'NoRecords' | localize }}
      <RouterLink to="/record">{{ 'AddNewRecord' | localize }}</RouterLink>
    </p>
    <section v-else>
      <HistoryTable :records="items"/>
      <AppPaginate
        v-model="currentPage"
        :page-count="pageCount"
        :prev-text="prevButtonTitle"
        :next-text="nextButtonTitle"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
        :click-handler="pageChangeHandler"
      />
    </section>
  </div>
</template>

<script>
// mixins
import { paginationMixin } from '@/mixins';
// filters
import { localizeFilter } from '@/filters';
// components
import HistoryTable from '@/components/history/HistoryTable.vue';
import HistoryChart from '@/components/history/HistoryChart.vue';

export default {
  name: 'HistoryView',
  metaInfo() {
    return { title: localizeFilter('History') };
  },
  components: {
    HistoryChart,
    HistoryTable,
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetchCategories');
    this.setupPagination(this.formatRecords(this.records, this.categories));
    this.loading = false;
  },
  computed: {
    prevButtonTitle() {
      return localizeFilter('Back');
    },
    nextButtonTitle() {
      return localizeFilter('Next');
    },
  },
  methods: {
    formatRecords(records, categories) {
      return records.map((record) => ({
        ...record,
        categoryName: categories.find((category) => category.id === record.categoryID).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
      }));
    },
  },
};
</script>
