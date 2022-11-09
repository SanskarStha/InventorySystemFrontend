<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" style="text-decoration: none;">
        <a class="navbar-brand" href="#">Inventory</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li class="nav-item">
              <router-link to="/books" style="text-decoration: none;">
                <a class="nav-link" href="#">Books</a>
              </router-link>
              
            </li>
       
            <li class="nav-item">
              <router-link to="/games" style="text-decoration: none;">
              <a class="nav-link" href="#">Games</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/gifts" style="text-decoration: none;">
              <a class="nav-link" href="#">Gifts</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/materials" style="text-decoration: none;">
              <a class="nav-link" href="#">Materials</a>
              </router-link>
            </li>
          </ul>
          <form class="d-flex" @submit.prevent="searchItem()">
            <input v-model="keyword" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TopBar',
  setup() {

    const keyword = ref();

    const searchItem = async function () {
      location.assign('/search?keyword=' + keyword.value)
    };
    return {
      searchItem,
      keyword
    };
  },
};

</script>


