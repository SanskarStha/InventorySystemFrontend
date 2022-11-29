<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/" style="text-decoration: none;">
            <a href="#">Home</a>
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/materials" style="text-decoration: none;">
            <a href="#">Materials</a>
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Material Detail</li>
      </ol>
    </nav>
    <form class="row g-3 mb-3" @submit.prevent="updateItem()">
      <div class="col-12 col-lg-6">
        <label for="inputTitle" class="form-label">Title</label>
        <input v-model="item.title" type="text" class="form-control" id="inputTitle" placeholder="title">
      </div>
      <div class="col-12 col-lg-4">
        <label for="inputCategory" class="form-label">Category</label>
        <select id="inputCategory" class="form-select" v-model="item.category">
          <option selected>Open this select menu</option>
          <option value="Wood">Wood</option>
          <option value="Synthetic fibres">Synthetic fibres</option>
          <option value="Ceramics">Ceramics</option>
          <option value="Composites">Composites</option>
        </select>
      </div>
      <div class="col-12 col-lg-6">
        <label for="inputImage" class="form-label">Image</label>
        <input v-model="item.imageURL" type="text" class="form-control" id="inputImage" placeholder="Image URL">
      </div>
      <div class="col-12 col-lg-3">
        <label for="inputQuantity" class="form-label">Quantity</label>
        <input v-model="item.quantity" type="text" class="form-control" id="inputQuantity" placeholder="quantity">
      </div>
      <div class="col-12 col-lg-3">
        <label for="inputLocation" class="form-label">Location</label>
        <input v-model="item.location" type="text" class="form-control" id="inputLocation"
          placeholder="location name in warehouse">
      </div>
      <div class="col-12 col-lg-6">
        <label for="inputDescription" class="form-label">Description</label>
        <textarea v-model="item.description" class="form-control" id="exampleFormControlTextarea1" rows="5"
          placeholder="Description show on listing page"></textarea>
      </div>
      <div class="col-12 col-lg-6">
        <label for="inputRemark" class="form-label">Remark</label>
        <textarea v-model="item.remarks" class="form-control" id="exampleFormControlTextarea1" rows="5"
          placeholder="Internal remarks"></textarea>
      </div>
      <div class="container my-4">
        <div class="row">
          <div class="col-6 col-lg-6">
            <button type="submit" class="btn btn-primary float-start">Update</button>
          </div>
          <div class="col-6 col-lg-6">
            <button type="button" class="btn btn-danger float-end" @click="deleteItem()">Delete</button>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
export default {
  name: 'UpdateMaterial',
  setup() {
    const item = ref({});
    const route = useRoute();
    const user = ref({});

    const updateItem = async function () {

      var response = await fetch("/api/inventory/" + route.params.id, {
        method: "put",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
          "x-access-token": user.value.token
        },
        // body: new URLSearchParams(new FormData(event.target))
        body: JSON.stringify(item.value)

      });

      if (response.ok) {

        var text = await response.text();
        alert(text);
        location.assign("/materials")
      } else {
        alert(response.statusText)
      }
    };

    const deleteItem = async function () {

      var r = confirm("Confirm Delete?");

      if (r) {

        var response = await fetch("/api/inventory/" + route.params.id, {
          method: "delete",
        });

        if (response.ok) {
          alert("item deleted");
          location.assign("/materials")
        } else {
          alert(response.statusText)
        }
      } else {
        alert("cancelled");
      }
    }

    onMounted(async function () {
      var response = await fetch("/api/inventory/" + route.params.id);
      user.value = JSON.parse(localStorage.getItem('user')) || {};

      if (response.ok) {
        item.value = await response.json();
        delete item.value._id;
      }
    });

    return {
      updateItem,
      deleteItem,
      item
    };
  },
};

</script>
