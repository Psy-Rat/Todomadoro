<template>
  <div class="home">
    <Breadcrumbs />
    <TodoList msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/TodoList.vue";
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
  name: "Home",
  components: {
    TodoList,
    Breadcrumbs
  },
  methods: {

  },

};
</script>
