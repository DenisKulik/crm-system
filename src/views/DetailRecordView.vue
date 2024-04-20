<template>
  <div>
    <AppLoader v-if="loading"/>
    <p class="center" v-else-if="!record">{{ 'DetailRecordError' | localize }}</p>
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
          <DetailCard :record="record"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// components
import DetailCard from '@/components/detail-records/DetailCard.vue';
// filters
import { localizeFilter } from '../filters';

export default {
  name: 'DetailRecordView',
  metaInfo() {
    return { title: localizeFilter('History') };
  },
  methods: { localizeFilter },
  components: { DetailCard },
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
