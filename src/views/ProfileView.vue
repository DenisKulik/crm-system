<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Profile' | localize }}</h3>
    </div>

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

      <div class="switch">
        <label>
          English
          <input v-model="isRuLocale" type="checkbox">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { minLength, required } from 'vuelidate/lib/validators';
import { localizeFilter } from '@/filters';

export default {
  name: 'ProfileView',
  metaInfo() {
    return { title: localizeFilter('Profile') };
  },
  components: {},
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
