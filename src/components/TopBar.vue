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

            <li v-if="type == 'admin user' || type == 'normal user'" class="nav-item">
              <router-link to="/books" style="text-decoration: none;">
                <a class="nav-link" href="#">Books</a>
              </router-link>

            </li>

            <li v-if="type == 'admin user' || type == 'normal user'" class="nav-item">
              <router-link to="/games" style="text-decoration: none;">
                <a class="nav-link" href="#">Games</a>
              </router-link>
            </li>
            <li v-if="type == 'admin user' || type == 'normal user'" class="nav-item">
              <router-link to="/gifts" style="text-decoration: none;">
                <a class="nav-link" href="#">Gifts</a>
              </router-link>
            </li>
            <li v-if="type == 'admin user' || type == 'normal user'" class="nav-item">
              <router-link to="/materials" style="text-decoration: none;">
                <a class="nav-link" href="#">Materials</a>
              </router-link>
            </li>
            <li v-if="type == 'admin user'" class="nav-item">
              <router-link to="/users" style="text-decoration: none;">
                <a class="nav-link" href="#">User</a>
              </router-link>
            </li>
          </ul>
          <form v-if="type == 'admin user' || type == 'normal user'" class="d-flex" @submit.prevent="searchItem()">
            <input v-model="keyword" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          <router-link to="/login">
            <button v-if="type != 'admin user' && type != 'normal user'" type="button" class="btn btn-primary" @click="signin">Sign In</button>
          </router-link>
          <button v-if="type == 'admin user' || type == 'normal user'" type="button" class="btn btn-outline-primary" @click="logout">Sign Out</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'TopBar',
  setup() {

    const keyword = ref();
    const type = ref(localStorage.getItem("type"));
    const user = ref({});

    onMounted(() => {
      user.value = localStorage.getItem("user");
      // console.log(user.value.)
      // console.log(localStorage.getItem("type"));
      // console.log(localStorage.getItem("user"));
  })

    const searchItem = async function () {
      location.assign('/search?keyword=' + keyword.value)
    };

    const logout = function () {
      localStorage.removeItem('user');
      localStorage.removeItem('type');
      location.assign('/')
    }
    return {
      user,
      searchItem,
      keyword,
      type,
      logout
    };
  },
};

</script>


