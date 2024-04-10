<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit/>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/categories/CategoryCreate.vue';
import CategoryEdit from '@/components/categories/CategoryEdit.vue';

export default {
  name: 'CategoriesView',
  components: {
    CategoryEdit,
    CategoryCreate,
  },
  data: () => ({
    categories: [],
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
  },
};
</script>
