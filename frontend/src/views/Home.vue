<template>
  <div class="home">
    <v-tabs
      v-model="tab"
      center-active
      show-arrows
    >
      <v-tab>Задачи</v-tab>
      <v-tab>Этапы</v-tab>
      <v-tab>Заметки</v-tab>
      <v-tab>Отчеты</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <TodoList msg="Welcome to Your Vue.js App" />
      </v-tab-item>
      <v-tab-item>
        Этапы
      </v-tab-item>
      <v-tab-item>
        Заметки
      </v-tab-item>
      <v-tab-item>
        Отчеты
      </v-tab-item>
    </v-tabs-items>

    
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/TodoList.vue";

export default {
  name: "Home",
  components: {
    TodoList
  },
  data () {
    return {
      tab: null
    }
  },
  methods: {

  },

};
</script>
