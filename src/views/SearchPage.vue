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
              <li class="breadcrumb-item active" aria-current="page">Search</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>


    <div class="card-group mx-5">
      <router-link :to="`/${item.type}/detail/${item._id}`" class="card btn btn-outline-dark"
        v-for="item in inventory.slice(0, 3)" :key="item._id">
        <div class="ratio ratio-1x1">
          <img :src="item.imageURL" class="card-img-top" alt="...">
        </div>

        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </router-link>
    </div>
    <div class="card-group mx-5">
      <router-link :to="`/${item.type}/detail/${item._id}`" class="card btn btn-outline-dark"
        v-for="item in inventory.slice(3, 6)" :key="item._id">
        <div class="ratio ratio-1x1">
          <img :src="item.imageURL" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </router-link>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item disabled" v-if="currentPage <= 1"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item" v-if="currentPage > 1"><a class="page-link" href="#"
            @click="fetchPage(currentPage--)">Previous</a></li>
        <li :class="`page-item${currentPage == i ? ' active':''}`" v-for="i in pages" :key="i"><a class="page-link" href="#"
            @click="fetchPage(currentPage = i)">{{ i }}</a></li>
        <li class="page-item disabled" v-if="currentPage >= lastPage"><a class="page-link" href="#">Next</a></li>
        <li class="page-item" v-if="currentPage < lastPage"><a class="page-link" href="#"
            @click="fetchPage(currentPage++)">Next</a></li>
      </ul>
    </nav>


  </div>

</template>


<script>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
export default {
  name: 'SearchPage',
  setup() {
    const inventory = ref([]);
    const lastPage = ref(0);
    const perPage = ref(6);
    const currentPage = ref(1);
    const route = useRoute();

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

      var response = await fetch("/api/search/inventory?keyword=" + route.query.keyword + "&perPage=" + perPage.value + "&page=" + currentPage.value);

      if (response.ok) {
        var data = await response.json();
        inventory.value = data.inventory;
        lastPage.value = data.pages

      } else {
        alert(response.statusText);
      }
    };

    onMounted(function () {
      fetchPage();
      // alert(props.msg)
    });

    return {
      inventory,
      pages,
      fetchPage,
      currentPage,
      lastPage
    };
  },
};
</script>

