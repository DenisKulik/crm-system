<template>
  <div>
    <AppLoader v-if="loading"/>
    <p class="center" v-else-if="!record">Запись с id = {{ $route.params.id }} не найдена</p>
    <div v-else>
      <div class="breadcrumb-wrap">
        <RouterLink to="/history" class="breadcrumb">История</RouterLink>
        <a class="breadcrumb" @click.prevent>
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.type === 'income' ? 'green' : 'red'">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }} </p>
              <p>Сумма: {{ record.amount | currency('RUB') }}</p>
              <p>Категория: {{ record.categoryName }}</p>
              <small>{{ record.date | date('date') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailRecordView',
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
