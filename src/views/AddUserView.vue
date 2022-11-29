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
          <router-link to="/books" style="text-decoration: none;">
            <a href="#">Users</a>
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">New User</li>
      </ol>
    </nav>
    <form class="row g-3 mb-3" @submit.prevent="insertItem()">
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
      <div class="col-12 col-lg-1">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script>

import { ref } from "vue";
export default {
  name: 'AddUserView',
  setup() {
    const user = ref({});
    // user.value.type = "Book";

    const insertItem = async function () {

      var response = await fetch("/api/user/", {
        method: "post",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json'
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

    return {
      insertItem,
      user
    };
  },
};
</script>
