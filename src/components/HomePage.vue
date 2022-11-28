<template>
  <div class="container my-4">

    <div class="row">
      <div class="col-12 col-lg-6" style="padding:20px">
        <div class="card py-5">
          <h3 class="card-title" style="text-align:center">Inventory System</h3>
          <div class="card-body">
            <p style="text-align:center">Welcome to our platform!</p>
          </div>
        </div>

      </div>
      <div class="col-12 col-lg-6">
        <ChartView />
      </div>
    </div>

    <div v-if="type == 'admin user' || type == 'normal user' " class="row gx-5">
      <router-link to="/books" class="col-12 col-lg-3" style="text-decoration: none; color: black;">
        <div class="card">

          <div class="ratio ratio-1x1">
            <img class="card-img-top" style="object-fit:cover" src="../assets/books.jpg" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">Books</h5>
          </div>
        </div>
      </router-link>

      <router-link to="/games" class="col-12 col-lg-3" style="text-decoration: none; color: black;">
        <div class="card">
          <div class="ratio ratio-1x1">
            <img class="card-img-top" style="object-fit:cover" src="../assets/games.jpg" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">Games</h5>
          </div>
        </div>
      </router-link>

      <router-link to="/gifts" class="col-12 col-lg-3" style="text-decoration: none; color: black;">
        <div class="card">
          <div class="ratio ratio-1x1">
            <img class="card-img-top" style="object-fit:cover" src="../assets/gifts.jpeg" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">Gifts</h5>
          </div>
        </div>
      </router-link>

      <router-link to="/materials" class="col-12 col-lg-3" style="text-decoration: none; color: black;">
        <div class="card">
          <div class="ratio ratio-1x1">
            <img class="card-img-top" style="object-fit:cover" src="../assets/materials.jpeg" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">Materials</h5>
          </div>
        </div>
      </router-link>

    </div>

  </div>
</template>

<script>
import ChartView from '@/components/ChartView.vue';
import { ref } from 'vue';

export default {
  name: 'HomePage',
  components: {
    ChartView
  },
  setup() {
    const type = ref(localStorage.getItem("type") || '');

    return {
      type
    }
  },

}
</script>


