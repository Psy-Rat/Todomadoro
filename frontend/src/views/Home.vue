<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods: {
    async apiGetHello(url) {
      let response = await fetch(url);

      if (response.ok) {
          let json = await response.json();
          console.log(json)
      } else {
          alert("Ошибка HTTP: " + response.status);
      }
    },
  },
  created() {
    let url = window.location.origin + '/api/fake/me'
    this.apiGetHello(url)
  }
};
</script>
