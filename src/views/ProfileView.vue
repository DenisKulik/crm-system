<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$error}"
        >
        <label for="description">Имя</label>
        <span
          v-if="$v.name.$error"
          class="helper-text invalid"
        >
          Имя должно быть длиннее {{ $v.name.$params.minLength.min }} символов
        </span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { minLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'ProfileView',
  components: {},
  data: () => ({
    name: '',
  }),
  validations: {
    name: {
      minLength: minLength(3),
      required,
    },
  },
  mounted() {
    this.name = this.info.name;
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

      if (this.name === this.info.name) {
        return;
      }

      await this.updateInfo({ name: this.name });
    },
  },
};
</script>

<style scoped lang="scss">
.switch {
  margin-bottom: 2rem;
}
</style>
