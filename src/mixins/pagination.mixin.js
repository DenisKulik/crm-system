export default {
  data() {
    return {
      currentPage: Number(this.$route.query.page) || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = this.chunkArray(allItems, this.pageSize);
      this.pageCount = this.allItems.length;
      this.updatePagination();
    },
    pageChangeHandler(page) {
      this.currentPage = page;
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.updatePagination();
    },
    updatePagination() {
      this.items = this.allItems[this.currentPage - 1] || this.allItems[0];
    },
    chunkArray(array, size) {
      const chunked = [];
      for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
      }
      return chunked;
    },
  },
};
