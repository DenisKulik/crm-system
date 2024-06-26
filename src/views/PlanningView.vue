<template>
  <div>
    <PageTitle :title-key="'Planning'">
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </PageTitle>
    <AppLoader v-if="loading"/>
    <p v-else-if="!categories.length">
      {{ 'NoCategories' | localize }}
      <router-link to="/categories">
        {{ 'AddNewCategory' | localize }}
      </router-link>
    </p>
    <section v-else>
       <CategoryItem
         v-for="category in categories"
         :key="category.id"
         :category="category"
       />
    </section>
  </div>
</template>

<script>
// libs
import { mapGetters } from 'vuex';
// filters
import { currencyFilter, localizeFilter } from '@/filters';
// components
import PageTitle from '@/components/ui/PageTitle.vue';
import CategoryItem from '@/components/planning/CategoryItem.vue';

export default {
  name: 'PlanningView',
  metaInfo() {
    return { title: localizeFilter('Planning') };
  },
  components: { CategoryItem, PageTitle },
  data: () => ({
    loading: true,
    categories: [],
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.categories = this.formatCategories(categories, records);
    this.loading = false;
  },
  computed: {
    ...mapGetters(['info']),
  },

  methods: {
    formatCategories(categories, records = []) {
      return categories.map((category) => {
        const spend = records
          .filter((record) => record.categoryID === category.id)
          .filter((record) => record.type === 'outcome')
          .reduce((acc, record) => acc + Number(record.amount), 0);

        const percent = (100 * spend) / category.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red';

        const tooltipValue = category.limit - spend;
        const tooltip = `${tooltipValue < 0
          ? localizeFilter('Excess')
          : localizeFilter('Left')} ${currencyFilter(Math.abs(tooltipValue))}`;

        return {
          ...category,
          progressPercent,
          progressColor,
          spend,
          tooltip,
        };
      });
    },
  },
};
</script>
