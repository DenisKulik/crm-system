<template>
  <div class="history-chart">
    <PieChart
      :data="chartData"
      :options="chartOptions"
      :style="{ height: '320px', width: '320px' }"
    />
  </div>
</template>

<script>
import { localizeFilter } from '@/filters';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Pie as PieChart } from 'vue-chartjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'HistoryChart',
  components: {
    PieChart,
  },
  props: {
    records: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    chartOptions: {
      responsive: true,
    },
  }),
  computed: {
    chartData() {
      if (!this.records.length || !this.categories.length) {
        return {
          labels: [],
          datasets: [],
        };
      }

      return {
        labels: this.categories.map((category) => category.title),
        datasets: [
          {
            label: localizeFilter('CategoryExpenses'),
            data: this.categories.map((category) => this.records.reduce((total, record) => {
              if (record.categoryID === category.id && record.type === 'outcome') {
                total += Number(record.amount);
              }
              return total;
            }, 0)),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    },
  },
};
</script>
