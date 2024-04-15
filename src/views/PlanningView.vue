<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Planning' | localize }}</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>

    <AppLoader v-if="loading"/>

    <p v-else-if="!categories.length">
      {{ 'NoCategories' | localize }}
      <router-link to="/categories">
        {{ 'AddNewCategory' | localize }}
      </router-link>
    </p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currency('RUB') }} {{ 'Out' | localize }}
          {{ category.limit | currency('RUB') }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            :class="category.progressColor"
            :style="{'width': category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { currencyFilter, localizeFilter } from '@/filters';

export default {
  name: 'PlanningView',
  components: {},
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
