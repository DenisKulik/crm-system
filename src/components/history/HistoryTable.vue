<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ 'Amount' | localize }}</th>
      <th>{{ 'Date' | localize }}</th>
      <th>{{ 'Category' | localize }}</th>
      <th>{{ 'Type' | localize }}</th>
      <th>{{ 'Open' | localize }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) in records" :key="record.id">
      <td>{{ index + 1 }}</td>
      <td>{{ record.amount | currency('RUB') }}</td>
      <td>{{ record.date | date('date') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span class="white-text badge" :class="record.typeClass">
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button
          v-tooltip="buttonTitle"
          class="btn-small btn"
          @click="openDetailRecord(record.id)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { localizeFilter } from '@/filters';

export default {
  name: 'HistoryTable',
  components: {},
  props: {
    records: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    buttonTitle() {
      return localizeFilter('ViewRecord');
    },
  },
  methods: {
    openDetailRecord(recordID) {
      this.$router.push(`/detail-record/${recordID}`);
    },
  },
};
</script>
