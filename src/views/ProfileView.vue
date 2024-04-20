<template>
  <div>
    <PageTitle :title-key="'Profile'"/>
    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$error}"
        >
        <label for="description">{{ 'Name' | localize }}</label>
        <span
          v-if="$v.name.$error"
          class="helper-text invalid"
        >
          {{ 'Name' | localize }} {{ 'Message_MustBeLonger' | localize
          }} {{ $v.name.$params.minLength.min }} {{ 'Message_Characters' | localize }}
        </span>
      </div>
      <BaseSwitcher
        v-model="isRuLocale"
        :title-left="'English'"
        :title-right="'Русский'"
      />
      <BaseButtonSubmit title-key="Update"/>
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

export default {
  name: 'ProfileView',
  metaInfo() {
    return { title: localizeFilter('Profile') };
  },
  components: {
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
    this.$nextTick(() => {
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(['info']),
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
