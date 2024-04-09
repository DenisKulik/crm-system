<template>
  <div>
    <AppLoader v-if="loading"/>
    <div v-else class="app-main-layout">
      <AppNavbar @toggleSidebarVisible="toggleSidebarVisible"/>
      <AppSidebar :is-open="sidebarVisible"/>
      <main class="app-content" :class="{full: !sidebarVisible}">
        <div class="app-page">
          <RouterView/>
        </div>
      </main>
      <ButtonAdd/>
    </div>
  </div>
</template>

<script>
// components
import AppNavbar from '@/components/app/AppNavbar.vue';
import AppSidebar from '@/components/app/AppSidebar.vue';
import ButtonAdd from '@/components/ui/ButtonAdd.vue';

export default {
  name: 'MainLayout',
  components: {
    ButtonAdd,
    AppSidebar,
    AppNavbar,
  },
  data: () => ({
    sidebarVisible: true,
    loading: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
  methods: {
    toggleSidebarVisible() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
};
</script>
