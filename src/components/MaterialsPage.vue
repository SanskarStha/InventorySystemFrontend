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
              <li class="breadcrumb-item active" aria-current="page">materials</li>
            </ol>
          </nav>
        </div>
        <div class="col-6 col-lg-6">
          <router-link to="/material/detail">
            <button class="btn btn-primary float-end">Add</button>
          </router-link>
        </div>
      </div>
    </div>


    <div class="card-group mx-5">
      <div class="card btn btn-outline-dark" v-for="item in inventory.slice(0, 3)" :key="item._id">
        <router-link :to="`/material/detail/${item._id}`">
          <div class="ratio ratio-1x1">
            <img :src="item.imageURL" class="card-img-top" style="max-height:300px" alt="">
          </div>
        </router-link>
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <p class="card-text"><small class="text-muted"> {{ item.quantity - item.consume.length }}
              Remaining</small></p>
          <button v-if="item.quantity - item.consume.length > 0" class="btn btn-primary"
            @click="updateConsume(item._id)">Consume</button>
        </div>
      </div>
    </div>
    <div class="card-group mx-5">
      <div class="card btn btn-outline-dark" v-for="item in inventory.slice(3, 6)" :key="item._id">
        <router-link :to="`/material/detail/${item._id}`">
          <div class="ratio ratio-1x1">
            <img :src="item.imageURL" class="card-img-top" style="max-height:300px" alt="">
          </div>
        </router-link>
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <p class="card-text"><small class="text-muted"> {{ item.quantity - item.consume.length }}
              Remaining</small></p>
          <button v-if="item.quantity - item.consume.length > 0" class="btn btn-primary"
            @click="updateConsume(item._id)">Consume</button>
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
  name: 'MaterialsPage',
  props: {
    type: String
  },
  setup(props) {
    const inventory = ref([]);
    const lastPage = ref(0);
    const perPage = ref(6);
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

    const updateConsume = async function (id) {

      var response = await fetch("/api/user/consume/" + id, {
        method: "post",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
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

      var response = await fetch("/api/inventory?type=" + props.type + "&perPage=" + perPage.value + "&page=" + currentPage.value);

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
      user.value = JSON.parse(localStorage.getItem('user')) || {};
      // alert(props.msg)
    });

    return {
      inventory,
      pages,
      fetchPage,
      currentPage,
      lastPage,
      updateConsume
    };
  },
};
</script>

