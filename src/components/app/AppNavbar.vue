<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="toggleSidebarVisible">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">12.12.12</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            USER NAME
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
  mounted() {
    // eslint-disable-next-line no-undef
    M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
      coverTrigger: false,
    });
  },
  methods: {
    toggleSidebarVisible() {
      this.$emit('toggleSidebarVisible');
    },
    logout() {
      this.$router.push('/login?message=logout');
    },
  },
};
</script>
