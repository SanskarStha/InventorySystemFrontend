<template>
  <div>
    <BooksPage type="Book" />
  </div>
</template>

<script>

import BooksPage from '@/components/BooksPage.vue'


export default {
  name: 'HomeView',
  components: {
    BooksPage
  }
}
</script>
