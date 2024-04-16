<template>
  <form class="card grey lighten-5 auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ 'CRM_Title' | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: $v.email.$error}"
        >
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >
          {{ 'Message_EmailEmpty' | localize }}
        </small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >
          {{ 'Message_EmailIncorrect' | localize }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: $v.password.$error}"
        >
        <label for="password">{{ 'Password' | localize }}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
        >
          {{ 'Message_EnterPassword' | localize }}
        </small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
        >
          {{ 'Password' | localize }} {{ 'Message_MustBeLonger' | localize }} {{
            $v.password.$params.minLength.min }} {{ 'Message_Characters' | localize }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ 'Enter' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <RouterLink to="/register">{{ 'Register' | localize }}</RouterLink>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import { messages } from '@/utils';
import { localizeFilter } from '@/filters';

export default {
  name: 'LoginView',
  metaInfo() {
    return { title: localizeFilter('LogIn') };
  },
  components: {},
  data: () => ({
    email: '',
    password: '',
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
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', formData);
        if (this.$route.path !== '/') this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
