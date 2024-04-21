<template>
  <button class="btn waves-effect waves-light" type="submit">
    {{ titleKey | localize }}
    <SendIcon/>
  </button>
</template>

<script>
import SendIcon from '@/components/icons/SendIcon.vue';

export default {
  name: 'BaseButtonSubmit',
  components: { SendIcon },
  props: {
    titleKey: {
      type: String,
      default: '',
    },
  },
};
</script>
