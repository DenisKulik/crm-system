<template>
  <div class="col s12 m6">
    <div>
      <PageSubtitle :subtitle-key="'Create'"/>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$error}"
          >
          <label for="name">{{ 'Title' | localize }}</label>
          <span
            v-if="$v.title.$error"
            class="helper-text invalid"
          >
            {{ 'EnterCategoryTitle' | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$error}"
          >
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span
            v-if="$v.limit.$error"
            class="helper-text invalid"
          >
            {{ 'Message_MinAmount' | localize }} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <BaseButtonSubmit :title-key="'Create'"/>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import BaseButtonSubmit from '@/components/ui/BaseButtonSubmit.vue';
import PageSubtitle from '@/components/ui/PageSubtitle.vue';

export default {
  name: 'CategoryCreate',
  components: {
    PageSubtitle,
    BaseButtonSubmit,
  },
  props: {},
  data: () => ({
    title: '',
    limit: 100,
  }),
  validations: {
    title: { required },
    limit: {
      minValue: minValue(1),
      required,
    },
  },
  mounted() {
    this.$nextTick(() => {
      M.updateTextFields();
    });
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });

        // reset
        this.title = '';
        this.limit = 1;
        this.$v.$reset();

        this.$message('Категория была создана');
        this.$emit('created', category);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
