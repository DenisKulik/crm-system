<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid: ($v.email.$dirty && !$v.email.required)
            || ($v.email.$dirty && !$v.email.email)
          }"
        >
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >
          Поле Email не должно быть пустым
        </small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >
          Введите корректный Email
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid: ($v.password.$dirty && !$v.password.required)
            || ($v.password.$dirty && !$v.password.minLength)
          }"
        >
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
        >
          Введите пароль
        </small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
        >
          Пароль должен быть длиннее {{ $v.password.$params.minLength.min }} символов
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
            invalid: ($v.name.$dirty && !$v.name.required)
            || ($v.name.$dirty && !$v.name.minLength)
          }"
        >
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          Введите имя
        </small>
        <small
          v-else-if="$v.name.$dirty && !$v.name.minLength"
          class="helper-text invalid"
        >
          Имя должен быть длиннее {{ $v.password.$params.minLength.min }} символов
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agreement"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <RouterLink to="/login">Войти!</RouterLink>
      </p>
    </div>
  </form>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'RegisterView',
  components: {},
  data: () => ({
    email: '',
    password: '',
    name: '',
    agreement: false,
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
      minLength: minLength(6),
    },
    agreement: {
      checked: (value) => value,
    },
  },
  methods: {
    /**
     * Submit form handler
     */
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
