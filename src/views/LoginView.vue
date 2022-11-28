<template>
  <div class="container">
    <form @submit.prevent="login()">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" v-model="credential.email" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" v-model="credential.password">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
    
        <button type="submit" class="btn btn-primary">Submit</button>
    
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
// import jwt_decode from "jwt-decode";

export default {
  name: 'LoginView',
  setup() {
    const credential = ref({});

    const login = async function () {

      var response = await fetch("/api/login", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(credential.value)
      });

      if (response.ok) {
        var data = await response.json()
        localStorage.setItem("user", data);

        // var decoded = jwt_decode(data.token);
        // alert(JSON.stringify(decoded))
        localStorage.setItem("type", data.type);
        // localStorage.getItem("user").type

        // alert(JSON.stringify(data))
        alert("login Successfully.")
        location.assign('/');

      } else {
        alert(response.statusText)
      }
    }

    return {
      credential, login
    }
  }
}
</script>