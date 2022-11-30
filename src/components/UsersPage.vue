<template>
  <div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-6 col-lg-6">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" style="text-decoration: none;">
                  <a href="#">Home</a>
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Users</li>
            </ol>
          </nav>
        </div>
        <div class="col-6 col-lg-6">
          <router-link to="/user/detail">
            <button class="btn btn-primary float-end">Add</button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container my-4">
      <div class="row justify-content-center"> 
        <div  v-for="user in users" :key="user._id" class=" col-12 col-sm-6 col-md-4 col-lg-3 card">
          <div class="card-body"> 
            <h6 style="text-align:center;" class="card-title">
              {{ user.full_name }}
            </h6>
            <p style="text-align:center;" class="card-text">
              {{ user.email }}
            </p>
            <router-link :to="`/user/detail/${user._id}`" style="text-decoration: none;">
              <p style="text-align:center;" class="card-text">
                Update
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- <button v-for="i in pages" :key="i" @click="fetchPage(i)">{{ i }}</button> -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item disabled" v-if="currentPage <= 1"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item" v-if="currentPage > 1"><a class="page-link" href="#"
            @click="fetchPage(currentPage--)">Previous</a></li>
        <li :class="`page-item${currentPage == i ? ' active' : ''}`" v-for="i in pages" :key="i"><a class="page-link"
            href="#" @click="fetchPage(currentPage = i)">{{ i }}</a></li>
        <li class="page-item disabled" v-if="currentPage >= lastPage"><a class="page-link" href="#">Next</a></li>
        <li class="page-item" v-if="currentPage < lastPage"><a class="page-link" href="#"
            @click="fetchPage(currentPage++)">Next</a></li>
      </ul>
    </nav>


  </div>

</template>


<script>
import { ref, onMounted, computed } from "vue";
export default {
  name: 'UsersPage',
  props: {
    type: String
  },
  setup() {
    const users = ref([]);
    const lastPage = ref(0);
    const perPage = ref(12);
    const currentPage = ref(1);
    const user = ref({});

    const pages = computed(() => {
      var pages = [];

      console.log(currentPage.value, lastPage.value)

      for (var i = Math.max(1, currentPage.value - 1); i <= Math.min(lastPage.value, currentPage.value + 1); i++) {
        pages.push(i)
      }

      return pages;
    });

    const fetchPage = async function () {

      // console.log(currentPage.value, lastPage.value)

      var response = await fetch("/api/user?perPage=" + perPage.value + "&page=" + currentPage.value,{
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
    
          "x-access-token": user.value.token

        },
      });

      if (response.ok) {
        var data = await response.json();
        users.value = data.users;
        lastPage.value = data.pages

      } else {
        alert(response.statusText);
      }
    };

    onMounted(function () {
    
      user.value = JSON.parse(localStorage.getItem('user')) || {};
      fetchPage();
      // alert(props.msg)
    });

    return {
      users,
      pages,
      fetchPage,
      currentPage,
      lastPage
    };
  },
};
</script>

