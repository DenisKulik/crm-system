<template>
  <div class="app-main-layout">
    <AppNavbar @toggleSidebarVisible="toggleSidebarVisible"/>
    <AppSidebar :is-open="sidebarVisible"/>
    <main class="app-content" :class="{full: !sidebarVisible}">
      <div class="app-page">
        <RouterView/>
      </div>
    </main>
    <ButtonAdd/>
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
  }),
  methods: {
    toggleSidebarVisible() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
};
</script>
