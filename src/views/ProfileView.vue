<template>
  <div>
    <PageTitle :title-key="'Profile'"/>
    <form class="form" @submit.prevent="submitHandler">
      <InputField
        v-model.trim="name"
        :field-id="'description'"
        :label-key="'Name'"
        :has-error="$v.name.$error"
        :error-message="errorMessageFieldName"
      />
      <BaseSwitcher
        v-model="isRuLocale"
        :title-left="'English'"
        :title-right="'Русский'"
      />
      <BaseButtonSubmit :title-key="'Update'"/>
    </form>
  </div>
</template>

<script>
// libs
import { mapActions, mapGetters } from 'vuex';
import { minLength, required } from 'vuelidate/lib/validators';
// filters
import { localizeFilter } from '@/filters';
// components
import PageTitle from '@/components/ui/PageTitle.vue';
import BaseSwitcher from '@/components/ui/BaseSwitcher.vue';
import BaseButtonSubmit from '@/components/ui/BaseButtonSubmit.vue';
import InputField from '@/components/ui/InputField.vue';

export default {
  name: 'ProfileView',
  metaInfo() {
    return { title: localizeFilter('Profile') };
  },
  components: {
    InputField,
    BaseButtonSubmit,
    BaseSwitcher,
    PageTitle,
  },
  data: () => ({
    name: '',
    isRuLocale: true,
  }),
  validations: {
    name: {
      minLength: minLength(3),
      required,
    },
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
  },
  computed: {
    ...mapGetters(['info']),
    errorMessageFieldName() {
      return `${localizeFilter('Name')} ${localizeFilter('Message_MustBeLonger')} ${
        this.$v.name.$params.minLength.min} ${localizeFilter('Message_Characters')}`;
    },
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      await this.updateInfo({
        name: this.name,
        locale: this.isRuLocale ? 'ru-RU' : 'en-US',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.switch {
  margin-bottom: 2rem;
}
</style>
