<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
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

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$error}"
          >
          <label for="name">{{ 'Title' | localize }}</label>
          <span
            v-if="$v.title.$error"
            class="helper-text invalid"
          >
            {{ 'EnterCategoryTitle' | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$error}"
          >
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span
            v-if="$v.limit.$error"
            class="helper-text invalid"
          >
            {{ 'Message_MinAmount' | localize }} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Update' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators';
import { localizeFilter } from '@/filters';

export default {
  name: 'CategoryEdit',
  components: {},
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
  }),
  validations: {
    title: { required },
    limit: {
      minValue: minValue(1),
      required,
    },
  },
  created() {
    const {
      id,
      title,
      limit,
    } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    this.$nextTick(() => {
      M.updateTextFields();
    });
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', categoryData);
        const updateMessage = `${localizeFilter('Category')} ${localizeFilter('Updated')}`;
        this.$message(updateMessage);
        this.$emit('updated', categoryData);
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    current(currentID) {
      const {
        title,
        limit,
      } = this.categories.find((category) => category.id === currentID);
      this.title = title;
      this.limit = limit;
    },
  },
};
</script>
