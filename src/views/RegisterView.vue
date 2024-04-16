<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
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
          Поле {{ 'Password' | localize }} {{ 'Message_MustBeLonger' | localize }} {{
            $v.password.$params.minLength.min }} {{ 'Message_Characters' | localize }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$error}"
        >
        <label for="name">{{ 'Name' | localize }}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          {{ 'Message_EnterName' | localize }}
        </small>
        <small
          v-else-if="$v.name.$dirty && !$v.name.minLength"
          class="helper-text invalid"
        >
         Поле {{ 'Name' | localize }} {{ 'Message_MustBeLonger' | localize }} {{
            $v.password.$params.minLength.min }} {{ 'Message_Characters' | localize }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agreement"/>
          <span>{{ 'RulesAgreement' | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ 'Register' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'HasAccount' | localize }}
        <RouterLink to="/login">{{ 'Enter' | localize }}!</RouterLink>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import { localizeFilter } from '@/filters';

export default {
  name: 'RegisterView',
  metaInfo() {
    return { title: localizeFilter('Register') };
  },
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
