<template>
  <div>
    <AppLoader v-if="loading"/>
    <p class="center" v-else-if="!record">Запись не найдена</p>
    <div v-else>
      <div class="breadcrumb-wrap">
        <RouterLink to="/history" class="breadcrumb">
          {{ 'History' | localize }}
        </RouterLink>
        <a class="breadcrumb" @click.prevent>
          {{ record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome') }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.type === 'income' ? 'green' : 'red'">
            <div class="card-content white-text">
              <p>{{ 'Description' | localize }}: {{ record.description }} </p>
              <p>{{ 'Amount' | localize }}: {{ record.amount | currency('RUB') }}</p>
              <p>{{ 'Category' | localize }}: {{ record.categoryName }}</p>
              <small>{{ record.date | date('date') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { localizeFilter } from '../filters';

export default {
  name: 'DetailRecordView',
  methods: { localizeFilter },
  components: {},
  data: () => ({
    record: null,
    category: null,
    loading: true,
  }),
  async mounted() {
    const record = await this.$store.dispatch('fetchRecordById', this.$route.params.id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryID);

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
};
</script>
