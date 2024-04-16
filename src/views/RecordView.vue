<template>
  <div>
    <div class="page-title">
      <h3>{{ 'NewRecord' | localize }}</h3>
    </div>

    <AppLoader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      {{ 'NoCategories' | localize }}
      <RouterLink to="/categories">
        {{ 'AddNewCategory' | localize }}
      </RouterLink>
    </p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select
          ref="select"
          v-model="record.categoryID"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>{{ 'SelectCategory' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="record.type"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="record.type"
          />
          <span>{{ 'Outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="record.amount"
          :class="{invalid: $v.record.amount.$error}"
        >
        <label for="amount">{{ 'Amount' | localize }}</label>
        <span
          v-if="$v.record.amount.$error"
          class="helper-text invalid"
        >
          {{ 'Message_MinAmount' | localize }} {{ $v.record.amount.$params.minValue.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="record.description"
          :class="{invalid: $v.record.description.$error}"
        >
        <label for="description">{{ 'Description' | localize }}</label>
        <span
          v-if="$v.record.description.$error"
          class="helper-text invalid"
        >
          {{ 'Message_EnterDescription' | localize }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { minValue, required } from 'vuelidate/lib/validators';
import AppLoader from '@/components/app/AppLoader.vue';

export default {
  name: 'RecordView',
  components: { AppLoader },
  data: () => ({
    select: null,
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

    // init select
    if (this.categories.length) {
      this.$nextTick(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
      });
    }
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
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
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (!this.canCreateRecord) {
        this.$message(`Недостаточно средств на счете (${this.record.amount - this.info.bill})`);
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
