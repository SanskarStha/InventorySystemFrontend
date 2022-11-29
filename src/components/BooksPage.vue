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
              <li class="breadcrumb-item active" aria-current="page">books</li>
            </ol>
          </nav>
        </div>
        <div class="col-6 col-lg-6">
          <router-link to="/book/detail">
            <button class="btn btn-primary float-end">Add</button>
          </router-link>
        </div>
      </div>
    </div>


    <div class="card-group mx-5">
      <div class="card btn btn-outline-dark" v-for="item in inventory.slice(0, 3)" :key="item._id">
        <router-link :to="`/book/detail/${item._id}`">
          <div class="ratio ratio-1x1">
            <img :src="item.imageURL" class="card-img-top" style="max-height:300px" alt="">
          </div>
        </router-link>
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <p v-if="item.borrow.length > 0" class="card-text"><small class="text-muted">Borrowed by {{item.borrow[0].full_name}}</small></p>
          <button v-if="item.borrow.length == 0" class="btn btn-primary"  @click="updateBorrow(item._id)">Borrow</button>
          <button v-if="item.borrow.length > 0 && item.borrow[0]._id == user._id" class="btn btn-outline-primary" @click="updateReturn(item._id)">Return</button>
        </div>
      </div>
    </div>
    <div class="card-group mx-5">
      <div class="card btn btn-outline-dark" v-for="item in inventory.slice(3, 6)" :key="item._id">
        <router-link :to="`/book/detail/${item._id}`">
          <div class="ratio ratio-1x1">
            <img :src="item.imageURL" class="card-img-top" style="max-height:300px" alt="">
          </div>
        </router-link>
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <p v-if="item.borrow.length > 0" class="card-text"><small class="text-muted">Borrowed by {{item.borrow[0].full_name}}</small></p>
          <button v-if="item.borrow.length == 0" class="btn btn-primary" @click="updateBorrow(item._id)">Borrow</button>
          <button v-if="item.borrow.length > 0 && item.borrow[0]._id == user._id" class="btn btn-outline-primary" @click="updateReturn(item._id)">Return</button>
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
// import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
export default {
  name: 'BooksPage',
  props: {
    type: String
  },
  setup(props) {
    const inventory = ref([]);
    const lastPage = ref(0);
    const perPage = ref(6);
    const currentPage = ref(1);
    // const route = useRoute();
    const user = ref({});



    const pages = computed(() => {
      var pages = [];

      for (var i = Math.max(1, currentPage.value - 1); i <= Math.min(lastPage.value, currentPage.value + 1); i++) {
        pages.push(i)
      }

      return pages;
    });

    const updateBorrow = async function (id) {
      

      console.log(user.value.token)

      var response = await fetch("/api/user/borrow/" + id, {
        method: "put",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
    
          "x-access-token": user.value.token

        },
        // body: new URLSearchParams(new FormData(event.target))
        // body: JSON.stringify(item.value)

      });

      if (response.ok) {

        var text = await response.text();
        alert(text);
        location.reload()
      } else {
        alert(response.statusText)
      }
    };

    const updateReturn = async function (id) {
      

      console.log(user.value.token)

      var response = await fetch("/api/user/return/" + id, {
        method: "put",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
    
          "x-access-token": user.value.token

        },
        // body: new URLSearchParams(new FormData(event.target))
        // body: JSON.stringify(item.value)

      });

      if (response.ok) {

        var text = await response.text();
        alert(text);
        location.reload()
      } else {
        alert(response.statusText)
      }
    };

    const fetchPage = async function () {

      // console.log(currentPage.value, lastPage.value)

      var response = await fetch("/api/inventory?type=" + props.type + "&perPage=" + perPage.value + "&page=" + currentPage.value,{
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
    
          "x-access-token": user.value.token

        },
      });

      if (response.ok) {
        var data = await response.json();
        inventory.value = data.inventory;
        lastPage.value = data.pages

      } else {
        alert(response.statusText);
      }
    };

    onMounted(function () {
      
      // alert(props.msg)
      user.value = JSON.parse(localStorage.getItem('user')) || {};
      fetchPage();
      // console.log(user.value.token)
    });

    return {
      inventory,
      pages,
      fetchPage,
      currentPage,
      lastPage,
      updateBorrow,
      updateReturn,
      user
    };
  },
};
</script>

