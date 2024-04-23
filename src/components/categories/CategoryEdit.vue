<template>
  <div class="col s12 m6">
    <PageSubtitle :subtitle-key="'Edit'"/>
    <form @submit.prevent="submitHandler">
      <InputSelect
        v-model="current"
        :option-list="categories"
        :label-key="'SelectCategory'"
      />
      <InputField
        v-model.trim="title"
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
      <BaseButtonSubmit :title-key="'Update'"/>
    </form>
  </div>
</template>

<script>
// libs
import { minValue, required } from 'vuelidate/lib/validators';
// filters
import { localizeFilter } from '@/filters';
// components
import BaseButtonSubmit from '@/components/ui/BaseButtonSubmit.vue';
import PageSubtitle from '@/components/ui/PageSubtitle.vue';
import InputField from '@/components/ui/InputField.vue';
import InputSelect from '@/components/ui/InputSelect.vue';

export default {
  name: 'CategoryEdit',
  components: {
    InputSelect,
    InputField,
    PageSubtitle,
    BaseButtonSubmit,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
  }),
  validations: {
    title: { required },
    limit: {
      minValue: minValue(1),
      required,
    },
  },
  created() {
    const {
      id,
      title,
      limit,
    } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
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
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', categoryData);
        const updateMessage = `${localizeFilter('Category')} ${localizeFilter('Updated')}`;
        this.$message(updateMessage);
        this.$emit('updated', categoryData);
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    current(currentID) {
      const {
        title,
        limit,
      } = this.categories.find((category) => category.id === currentID);
      this.title = title;
      this.limit = limit;
    },
  },
};
</script>
