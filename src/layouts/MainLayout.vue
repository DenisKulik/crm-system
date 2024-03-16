<template>
  <div class="app-main-layout">
    <AppNavbar/>
    <AppSidebar/>
    <main class="app-content">
      <div class="app-page">
        <RouterView/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
// components
import AppNavbar from '@/components/app/AppNavbar.vue';
import AppSidebar from '@/components/app/AppSidebar.vue';

export default {
  name: 'MainLayout',
  components: {
    AppSidebar,
    AppNavbar,
  },
};
</script>
