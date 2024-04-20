<template>
  <div>
    <PageTitle title-key="Categories"/>
    <AppLoader v-if="loading"/>
    <section v-else class="row">
      <CategoryCreate @created="addNewCategory"/>
      <CategoryEdit
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategory"
      />
      <p v-else class="center">
        {{ 'NoCategories' | localize }}
      </p>
    </section>
  </div>
</template>

<script>
// filters
import { localizeFilter } from '@/filters';
// components
import CategoryCreate from '@/components/categories/CategoryCreate.vue';
import CategoryEdit from '@/components/categories/CategoryEdit.vue';
import AppLoader from '@/components/app/AppLoader.vue';
import PageTitle from '@/components/ui/PageTitle.vue';

export default {
  name: 'CategoriesView',
  metaInfo() {
    return { title: localizeFilter('Categories') };
  },
  components: {
    PageTitle,
    AppLoader,
    CategoryEdit,
    CategoryCreate,
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
};
</script>
