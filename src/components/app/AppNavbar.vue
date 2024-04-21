<template>
  <nav class="navbar black">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <ButtonBurger @onClick="toggleSidebarVisible"/>
        <DateTimeBlock/>
      </div>
      <AppDropdown :user-name="userName" @onLogout="logout"/>
    </div>
  </nav>
</template>

<script>
import ButtonBurger from '@/components/ui/ButtonBurger.vue';
import DateTimeBlock from '@/components/ui/DateTimeBlock.vue';
import AppDropdown from '@/components/app/AppDropdown.vue';

export default {
  name: 'AppNavbar',
  components: {
    AppDropdown,
    DateTimeBlock,
    ButtonBurger,
  },
  computed: {
    userName() {
      return this.$store.getters.info.name;
    },
  },
  methods: {
    toggleSidebarVisible() {
      this.$emit('toggleSidebarVisible');
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push('/login');
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
