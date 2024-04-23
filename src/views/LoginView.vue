<template>
  <form class="card grey lighten-5 auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ 'CRM_Title' | localize }}</span>
      <InputField
        v-model.trim="email"
        :field-id="'email'"
        :label-key="'Email'"
        :has-error="$v.email.$error"
        :error-message="errorMessageFieldEmail"
      />
      <InputField
        v-model="password"
        :field-id="'password'"
        :field-type="'password'"
        :label-key="'Password'"
        :has-error="$v.password.$error"
        :error-message="errorMessageFieldPassword"
      />
    </div>
    <div class="card-action">
      <div>
        <BaseButtonSubmit :class="'auth-submit'" :title-key="'Enter'"/>
      </div>
      <p class="center">
        Нет аккаунта?
        <RouterLink to="/register">{{ 'Register' | localize }}</RouterLink>
      </p>
    </div>
  </form>
</template>

<script>
// libs
import { email, required, minLength } from 'vuelidate/lib/validators';
// utils
import { messages } from '@/utils';
// filters
import { localizeFilter } from '@/filters';
// components
import InputField from '@/components/ui/InputField.vue';
import BaseButtonSubmit from '@/components/ui/BaseButtonSubmit.vue';

export default {
  name: 'LoginView',
  metaInfo() {
    return { title: localizeFilter('LogIn') };
  },
  components: {
    BaseButtonSubmit,
    InputField,
  },
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
  computed: {
    errorMessageFieldEmail() {
      let errorMessageFieldEmail;

      if (this.$v.email.$dirty && !this.$v.email.required) {
        errorMessageFieldEmail = localizeFilter('Message_EmailEmpty');
      } else if (this.$v.email.$dirty && !this.$v.email.email) {
        errorMessageFieldEmail = localizeFilter('Message_EmailIncorrect');
      }

      return errorMessageFieldEmail;
    },
    errorMessageFieldPassword() {
      let errorMessageFieldPassword;

      if (this.$v.password.$dirty && !this.$v.password.required) {
        errorMessageFieldPassword = localizeFilter('Message_EnterPassword');
      } else if (this.$v.password.$dirty && !this.$v.password.minLength) {
        errorMessageFieldPassword = `${localizeFilter('Password')} ${
          localizeFilter('Message_MustBeLonger')} ${
          this.$v.password.$params.minLength.min} ${localizeFilter('Message_Characters')}`;
      }

      return errorMessageFieldPassword;
    },
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
        if (this.$route.path !== '/') {
          this.$router.push('/')
            .catch((e) => console.log(e));
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
