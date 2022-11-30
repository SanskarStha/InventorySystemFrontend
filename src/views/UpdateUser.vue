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
          <router-link to="/users" style="text-decoration: none;">
            <a href="#">Users</a>
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">User Detail</li>
      </ol>
    </nav>
    <form class="row g-3 mb-3" @submit.prevent="updateItem()">
      <div class="col-12 col-lg-6">
        <label for="inputEmail" class="form-label">Email</label>
        <input v-model="user.email" type="text" class="form-control" id="inputEmail" placeholder="email">
      </div>
      <div class="col-12 col-lg-6">
        <label for="inputFullName" class="form-label">Full Name</label>
        <input v-model="user.full_name" type="text" class="form-control" id="inputFullName" placeholder="full name">
      </div>
      <div class="col-12 col-lg-4">
        <label for="inputPassword" class="form-label">Password</label>
        <input v-model="user.password" type="text" class="form-control" id="inputPassword" placeholder="password">
      </div>
      <div class="col-12 col-lg-4">
        <label for="inputCategory" class="form-label">Type</label>
        <select id="inputCategory" class="form-select" v-model="user.type">
          <option selected>Open this select menu</option>
          <option value="admin user">admin user</option>
          <option value="normal user">normal user</option>
        </select>
      </div>
      <div class="col-12 col-lg-4">
        <label for="inputPhone" class="form-label">Phone</label>
        <input v-model="user.phone" type="text" class="form-control" id="inputPhone" placeholder="phone">
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
  name: 'UpdateGame',
  setup() {
    const user = ref({});
    const loggedInUser = ref({});
    const route = useRoute();

    const updateItem = async function () {
     
      var response = await fetch("/api/user/" + route.params.id, {

        
        method: "put",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
          "x-access-token": loggedInUser.value.token
        },
        // body: new URLSearchParams(new FormData(event.target))
        body: JSON.stringify(user.value)

      });

      if (response.ok) {

        var text = await response.text();
        alert(text);
        location.assign("/users")
      } else {
        alert(response.statusText)
      }
    };

    const deleteItem = async function () {

      var r = confirm("Confirm Delete?");

      if (r) {

        var response = await fetch("/api/user/" + route.params.id, {
          method: "delete",
          headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "x-access-token": loggedInUser.value.token
        },
        });

        if (response.ok) {
          alert("user deleted");
          location.assign("/users")
        } else {
          alert(response.statusText)
        }
      } else {
        alert("cancelled");
      }
    }

    onMounted(async function () {
      loggedInUser.value = JSON.parse(localStorage.getItem('user')) || {};
      var response = await fetch("/api/user/" + route.params.id,{
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "x-access-token": loggedInUser.value.token
        },
      });
     

      if (response.ok) {
        user.value = await response.json();
        delete user.value._id;
      }
    });

    return {
      updateItem,
      deleteItem,
      user
    };
  },
};

</script>
