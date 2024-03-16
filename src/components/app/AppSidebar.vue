<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <RouterLink
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :exact="link.exact"
      tag="li"
      active-class="active"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.name }}</a>
    </RouterLink>
  </ul>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    links: [
      {
        name: 'Счет',
        url: '/',
        exact: true,
      },
      {
        name: 'История',
        url: '/history',
      },
      {
        name: 'Планирование',
        url: '/planning',
      },
      {
        name: 'Новая запись',
        url: '/record',
      },
      {
        name: 'Категории',
        url: '/categories',
      },
    ],
  }),
};
</script>
