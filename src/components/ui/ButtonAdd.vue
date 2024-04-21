<template>
  <div class="fixed-action-btn">
    <RouterLink to="/record" class="btn-floating btn-large blue">
      <AddIcon/>
    </RouterLink>
  </div>
</template>

<script>
import AddIcon from '@/components/icons/AddIcon.vue';

export default {
  name: 'ButtonAdd',
  components: { AddIcon },
};
</script>
