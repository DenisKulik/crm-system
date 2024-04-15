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
import { messages } from '@/utils';

// components
import AppNavbar from '@/components/app/AppNavbar.vue';
import AppSidebar from '@/components/app/AppSidebar.vue';
import ButtonAdd from '@/components/ui/ButtonAdd.vue';
import { mapGetters } from 'vuex';

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
    if (!Object.keys(this.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
  computed: {
    ...mapGetters(['info']),
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    toggleSidebarVisible() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    },
  },
};
</script>
