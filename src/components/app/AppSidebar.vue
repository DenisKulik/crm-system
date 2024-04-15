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
import { localizeFilter } from '@/filters';

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
        name: localizeFilter('Bill'),
        url: '/',
        exact: true,
      },
      {
        name: localizeFilter('History'),
        url: '/history',
      },
      {
        name: localizeFilter('Planning'),
        url: '/planning',
      },
      {
        name: localizeFilter('NewRecord'),
        url: '/record',
      },
      {
        name: localizeFilter('Categories'),
        url: '/categories',
      },
    ],
  }),
};
</script>
