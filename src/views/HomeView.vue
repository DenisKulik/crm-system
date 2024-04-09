<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <HomeBill/>
      <HomeCurrency/>
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/home/HomeBill.vue';
import HomeCurrency from '@/components/home/HomeCurrency.vue';

export default {
  name: 'HomeView',
  components: {
    HomeCurrency,
    HomeBill,
  },
};
</script>
