<template>
  <div class="container my-4">
   
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-6" style="padding:20px">
          <div class="card py-5">
            <h3 class="card-title">Inventory System</h3>
            <div class="card-body">
              <p>Welcome to our platform!</p>
            </div>
          </div>

        </div>
        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
          <ChartView />
        </div>
      </div>

      <div class="row gx-5 ">
        <router-link to="/books" class="col me-3 card btn btn-outline-dark"
          >
          <div class="ratio ratio-1x1">
            <img class="card-img-top" style="object-fit:cover" src="../assets/books.jpg" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">Books</h5>
          </div>
        </router-link>

        <router-link to="/games" class=" col me-3 card btn btn-outline-dark"
          >
          <div class="ratio ratio-1x1">
            <img class="card-img-top" style="object-fit:cover" src="../assets/games.jpg" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">Games</h5>
          </div>
        </router-link>

        <router-link to="/gifts" class=" col me-3 card btn btn-outline-dark"
          >
          <div class="ratio ratio-1x1">
            <img class="card-img-top" style="object-fit:cover" src="../assets/gifts.jpeg" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">Gifts</h5>
          </div>
        </router-link>

        <router-link to="/materials" class=" col me-3 card btn btn-outline-dark"
          >
          <div class="ratio ratio-1x1">
            <img class="card-img-top" style="object-fit:cover" src="../assets/materials.jpeg" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">Materials</h5>
          </div>
        </router-link>
      </div>

  </div>
</template>

<script>
import ChartView from '@/components/ChartView.vue';
export default {
  name: 'HomePage',
  components: {
    ChartView
  }
}
</script>


