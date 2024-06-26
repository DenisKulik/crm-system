<template>
  <div>
    <PageTitle :title-key="'NewRecord'"/>
    <AppLoader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">
      {{ 'NoCategories' | localize }}
      <RouterLink to="/categories">
        {{ 'AddNewCategory' | localize }}
      </RouterLink>
    </p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <InputSelect
        v-model="record.categoryID"
        :option-list="categories"
        :label-key="'SelectCategory'"
      />

      <InputRadio
        :value="'income'"
        :name="'type'"
        :checked="record.type === 'income'"
        @change="record.type = $event"
      />
      <InputRadio
        :value="'outcome'"
        :name="'type'"
        :checked="record.type === 'outcome'"
        @change="record.type = $event"
      />

      <InputField
        v-model.number="record.amount"
        :field-id="'amount'"
        :field-type="'number'"
        :label-key="'Limit'"
        :has-error="$v.record.amount.$error"
        :error-message="errorMessageFieldAmount"
      />
      <InputField
        v-model.trim="record.description"
        :field-id="'description'"
        :label-key="'Description'"
        :has-error="$v.record.description.$error"
        :error-message="'Message_EnterDescription' | localize"
      />
      <BaseButtonSubmit :title-key="'Create'"/>
    </form>
  </div>
</template>

<script>
// libs
import { mapGetters } from 'vuex';
import { minValue, required } from 'vuelidate/lib/validators';
// filters
import { localizeFilter } from '@/filters';
// components
import AppLoader from '@/components/app/AppLoader.vue';
import BaseButtonSubmit from '@/components/ui/BaseButtonSubmit.vue';
import PageTitle from '@/components/ui/PageTitle.vue';
import InputField from '@/components/ui/InputField.vue';
import InputSelect from '@/components/ui/InputSelect.vue';
import InputRadio from '@/components/ui/InputRadio.vue';

export default {
  name: 'RecordView',
  metaInfo() {
    return { title: localizeFilter('NewRecord') };
  },
  components: {
    InputRadio,
    InputSelect,
    InputField,
    PageTitle,
    BaseButtonSubmit,
    AppLoader,
  },
  data: () => ({
    loading: true,
    categories: [],
    record: {
      categoryID: null,
      amount: 100,
      description: '',
      type: 'outcome',
    },
  }),
  validations: {
    record: {
      amount: {
        minValue: minValue(1),
        required,
      },
      description: { required },
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    // set default category
    if (this.categories.length) {
      this.record.categoryID = this.categories[0].id;
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.record.type === 'income') {
        return true;
      }
      return this.info.bill >= this.record.amount;
    },
    errorMessageFieldAmount() {
      return `${localizeFilter('Message_MinAmount')} ${
        this.$v.record.amount.$params.minValue.min
      }`;
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (!this.canCreateRecord) {
        this.$message(`Недостаточно средств на счете (${
          this.record.amount - this.info.bill
        })`);
        return;
      }

      try {
        await this.$store.dispatch('createRecord', {
          ...this.record,
          date: new Date().toJSON(),
        });

        const bill = this.record.type === 'income'
          ? this.info.bill + this.record.amount
          : this.info.bill - this.record.amount;
        await this.$store.dispatch('updateInfo', { bill });

        this.$message('Запись успешно создана');

        // reset form
        this.$v.$reset();
        this.record = {
          amount: 100,
          description: '',
        };
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
