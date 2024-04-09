<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      <ButtonRefresh @onRefresh="refreshCurrency"/>
    </div>

    <AppLoader v-if="loading"/>
    <div v-else class="row">
      <HomeBill
        :rates="currency.data"
      />
      <HomeCurrency
        :rates="currency.data"
        :date="currency.meta.last_updated_at"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/home/HomeBill.vue';
import HomeCurrency from '@/components/home/HomeCurrency.vue';
import ButtonRefresh from '@/components/ui/ButtonRefresh.vue';

export default {
  name: 'HomeView',
  components: {
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
