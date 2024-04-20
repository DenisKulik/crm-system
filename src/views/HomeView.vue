<template>
  <div>
    <PageTitle :title-key="'Bill'">
      <ButtonRefresh @onRefresh="refreshCurrency"/>
    </PageTitle>
    <AppLoader v-if="loading"/>
    <section v-else class="row">
      <HomeBill :rates="currency.data"/>
      <HomeCurrency
        :rates="currency.data"
        :date="currency.meta.last_updated_at"
      />
    </section>
  </div>
</template>

<script>
// filters
import { localizeFilter } from '@/filters';
// components
import HomeBill from '@/components/home/HomeBill.vue';
import HomeCurrency from '@/components/home/HomeCurrency.vue';
import ButtonRefresh from '@/components/ui/ButtonRefresh.vue';
import PageTitle from '@/components/ui/PageTitle.vue';

export default {
  name: 'HomeView',
  metaInfo() {
    return { title: localizeFilter('Bill') };
  },
  components: {
    PageTitle,
    ButtonRefresh,
    HomeCurrency,
    HomeBill,
  },
  data: () => ({
    loading: true,
    currency: [],
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  methods: {
    async refreshCurrency() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
};
</script>
