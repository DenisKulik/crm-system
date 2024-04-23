<template>
  <form class="card auth-card grey lighten-5" @submit.prevent="onSubmit">
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
      <InputField
        v-model.trim="name"
        :field-id="'name'"
        :label-key="'Name'"
        :has-error="$v.name.$error"
        :error-message="errorMessageFieldName"
      />
      <p>
        <label>
          <input type="checkbox" v-model="agreement"/>
          <span>{{ 'RulesAgreement' | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <BaseButtonSubmit :class="'auth-submit'" :title-key="'Register'"/>
      <p class="center">
        {{ 'HasAccount' | localize }}
        <RouterLink to="/login">{{ 'Enter' | localize }}!</RouterLink>
      </p>
    </div>
  </form>
</template>

<script>
// libs
import { email, required, minLength } from 'vuelidate/lib/validators';
// filters
import { localizeFilter } from '@/filters';
// components
import InputField from '@/components/ui/InputField.vue';
import BaseButtonSubmit from '@/components/ui/BaseButtonSubmit.vue';

export default {
  name: 'RegisterView',
  metaInfo() {
    return { title: localizeFilter('Register') };
  },
  components: {
    BaseButtonSubmit,
    InputField,
  },
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

    errorMessageFieldName() {
      let errorMessageFieldName;

      if (this.$v.name.$dirty && !this.$v.name.required) {
        errorMessageFieldName = localizeFilter('Message_EnterName');
      } else if (this.$v.name.$dirty && !this.$v.name.minLength) {
        errorMessageFieldName = `Поле ${localizeFilter('Name')} ${
          localizeFilter('Message_MustBeLonger')} ${
          this.$v.name.$params.minLength.min} ${localizeFilter('Message_Characters')}`;
      }

      return errorMessageFieldName;
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
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
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
