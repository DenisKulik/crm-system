<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="toggleSidebarVisible">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <RouterLink to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </RouterLink>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  components: {},
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  mounted() {
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
      coverTrigger: false,
    });
    this.interval = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
  methods: {
    toggleSidebarVisible() {
      this.$emit('toggleSidebarVisible');
    },
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    },
    updateTime() {
      this.date = new Date();
    },
  },
};
</script>
