<template>
  <div>
    <GamesPage type="Game" />
  </div>
</template>

<script>

import GamesPage from '@/components/GamesPage.vue'


export default {
  name: 'HomeView',
  components: {
    GamesPage
  }
}
</script>
