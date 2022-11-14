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
          <router-link to="/games" style="text-decoration: none;">
            <a href="#">Games</a>
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Game Detail</li>
      </ol>
    </nav>
    <form class="row g-3 mb-3" @submit.prevent="insertItem()">
      <div class="col-12 col-lg-6">
        <label for="inputTitle" class="form-label">Title</label>
        <input v-model="item.title" type="text" class="form-control" id="inputTitle" placeholder="title">
      </div>
      <div class="col-12 col-lg-4">
        <label for="inputCategory" class="form-label">Category</label>
        <select id="inputCategory" class="form-select" v-model="item.category">
          <option selected>Open this select menu</option>
          <option value="Survival and horror">Survival and horror</option>
          <option value="Shooters">Shooters</option>
          <option value="Sandbox">Sandbox</option>
          <option value="Action-adventure">Action-adventure</option>
          <option value="Puzzlers and party games">Puzzlers and party games</option>
          <option value="Real-time strategy">Real-time strategy</option>
          <option value="Role-playing">Role-playing</option>
          <option value="Multiplayer online battle arena">Multiplayer online battle arena</option>
          <option value="Platformer">Platformer</option>
        </select>
      </div>
      <div class="col-12 col-lg-6">
        <label for="inputImage" class="form-label">Image</label>
        <input v-model="item.imageURL" type="text" class="form-control" id="inputImage" placeholder="Image URL">
      </div>
      <div class="col-12 col-lg-6">
        <label for="inputPublisher" class="form-label">Publisher</label>
        <input v-model="item.publisher" type="text" class="form-control" id="inputPublisher" placeholder="publisher">
      </div>
      <div class="col-12 col-lg-3">
        <label for="inputYear" class="form-label">Year</label>
        <input v-model="item.year" type="text" class="form-control" id="inputYear" placeholder="year">
      </div>
      <div class="col-12 col-lg-3">
        <label for="inputQuantity" class="form-label">Quantity</label>
        <input v-model="item.quantity" type="text" class="form-control" id="inputQuantity" placeholder="quantity">
      </div>
      <div class="col-12 col-lg-6">
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
      <div class="col-12 col-lg-1">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script>

import { ref } from "vue";
export default {
  name: 'AddGameView',
  setup() {
    const item = ref({});
    item.value.type = "Game";

    const insertItem = async function () {

      var response = await fetch("/api/inventory/", {
        method: "post",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json'
        },
        // body: new URLSearchParams(new FormData(event.target))
        body: JSON.stringify(item.value)

      });
      if (response.ok) {

        var text = await response.text();
        alert(text);
        location.assign("/games")
      } else {
        alert(response.statusText)
      }
    };

    return {
      insertItem,
      item
    };
  },
};
</script>
