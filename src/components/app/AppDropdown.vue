<template>
  <ul class="right hide-on-small-and-down">
    <li>
      <a
        class="dropdown-trigger white-text"
        href="#"
        data-target="dropdown"
        ref="dropdown"
      >
        {{ userName }}
        <i class="material-icons right">arrow_drop_down</i>
      </a>

      <ul id='dropdown' class='dropdown-content'>
        <li>
          <RouterLink to="/profile" class="black-text">
            <i class="material-icons">account_circle</i>{{ 'Profile' | localize }}
          </RouterLink>
        </li>
        <li class="divider" tabindex="-1"></li>
        <li>
          <a href="#" class="black-text" @click.prevent="onLogout">
            <i class="material-icons">assignment_return</i>{{ 'Exit' | localize }}
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppDropdown',
  props: {
    userName: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    dropdown: null,
  }),
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
      coverTrigger: false,
    });
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
  methods: {
    onLogout() {
      this.$emit('onLogout');
    },
  },
};
</script>
