<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <Drawer 
        :projects="projects" 
        @selectedProject="setSelectedProject"
        @selectedTimeGroup="setTimeGroup"
      />
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><b>ToDo</b>modoro</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text disabled>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Breadcrumbs />
      <v-tabs v-model="tab" center-active show-arrows>
        <v-tab>Задачи</v-tab>
        <v-tab>Этапы</v-tab>
        <v-tab>Заметки</v-tab>
        <v-tab>Отчеты</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <TodoList :todos="todos" />
        </v-tab-item>
        <v-tab-item> Этапы </v-tab-item>
        <v-tab-item> Заметки </v-tab-item>
        <v-tab-item> Отчеты </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
import fetchedData from "../../backend/services/data.json";
import Drawer from "./components/drawer/Drawer.vue";
import TodoList from "@/components/TodoList.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  name: "App",

  components: {
    Drawer,
    TodoList,
    Breadcrumbs,
  },

  data: () => ({
    drawer: false,
    timeGroup: 0,
    projectGroup: 0,
    tab: 0,
    apiData: fetchedData,

    selectedProject: null,
    selectedDate: null
  }),

  methods: {
    async apiGetHello(url) {
      let response = await fetch(url);

      if (response.ok) {
        this.apiData = await response.json();
      } else {
        console.error("Ошибка HTTP: " + response.status);
      }
    },
    setSelectedProject(projectId) {
      this.selectedProject = projectId
    },
    setTimeGroup(timeGroup) {
      this.selectedDate = timeGroup
    }
  },

  // created() {
  //   let url = window.location.origin + '/api/fake/me'
  //   this.apiGetHello(url)
  // },

  computed: {
    projects() {
      return this.apiData.projects;
    },
    todos() {
      let filteredProjects = []    
      
      if (this.selectedProject === false) {
        filteredProjects = this.apiData.tasks.filter((task) => task.projectId === this.apiData.id)
      } else if (typeof this.selectedProject === "string") {
        filteredProjects = this.apiData.tasks.filter((task) => task.projectId === this.selectedProject)
      } else {
        filteredProjects = this.apiData.tasks;
      }

      let d = new Date();
      // let today = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      let tomorow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime();
      let day2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 2).getTime();

      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      let nextMonday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7).getTime()
      
      switch(this.selectedDate) {
        case 0:
          filteredProjects = filteredProjects.filter((task) => task.date <= tomorow)
          break;
        case 1:
          filteredProjects = filteredProjects.filter((task) => task.date >= tomorow && task.date <= day2)
          break;
        case 2:
          filteredProjects = filteredProjects.filter((task) => task.isWeekly && task.date <= nextMonday)
          break;
        case 3:
          filteredProjects = filteredProjects.filter((task) => task.date == undefined)
          break;
      }


      return filteredProjects
    },
    tomorow() {
      var d = new Date();
      d.setDate(d.getDate() + 1);
      var tomorow = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      return tomorow

    },
    sunday() {
      var d = new Date();

      // set to prev Monday
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + 7);

      // set to next Monday
      d.setDate(d.getDate() + 7);

      // create new date of day before
      var sunday = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      return sunday.getTime();
    },
  },
};
</script>
