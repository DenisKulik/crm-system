<template>
  <div class="button-burger" @click.stop="onClickHandler" @keyup.enter="onClickHandler">
    <BurgerIcon/>
  </div>
</template>

<script>
import BurgerIcon from '@/components/icons/BurgerIcon.vue';

export default {
  name: 'ButtonBurger',
  components: { BurgerIcon },
  methods: {
    onClickHandler() {
      this.$emit('onClick');
    },
  },
};
</script>

<style scoped>
.button-burger {
  margin-right: 10px;
  cursor: pointer;
}
</style>
