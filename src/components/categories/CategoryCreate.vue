<template>
  <div class="col s12 m6">
    <PageSubtitle :subtitle-key="'Create'"/>
    <form @submit.prevent="submitHandler">
      <InputField
        v-model="title"
        :field-id="'title'"
        :label-key="'Title'"
        :has-error="$v.title.$error"
        :error-message="'EnterCategoryTitle' | localize"
      />
      <InputField
        v-model.number="limit"
        :field-id="'limit'"
        :field-type="'number'"
        :label-key="'Limit'"
        :has-error="$v.limit.$error"
        :error-message="errorMessageFieldLimit"
      />
      <BaseButtonSubmit :title-key="'Create'"/>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import BaseButtonSubmit from '@/components/ui/BaseButtonSubmit.vue';
import PageSubtitle from '@/components/ui/PageSubtitle.vue';
import InputField from '@/components/ui/InputField.vue';
import { localizeFilter } from '@/filters';

export default {
  name: 'CategoryCreate',
  components: {
    InputField,
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
  computed: {
    errorMessageFieldLimit() {
      return `${localizeFilter('Message_MinAmount')} ${this.$v.limit.$params.minValue.min}`;
    },
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
