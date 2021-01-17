<template>
  <div>
    <v-navigation-drawer app v-model="drawer" temporary>
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
      <v-btn text @click="overlay = true">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn text to='/about'>
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- <Breadcrumbs /> -->
      <v-tabs v-model="tab" center-active show-arrows grow>
        <v-tab>Задачи</v-tab>
        <v-tab v-if="typeof selectedProject === 'string' || typeof selectedProject === 'boolean'">Заметки</v-tab>
        <v-tab v-if="typeof selectedProject === 'string'">Этапы</v-tab>
        <v-tab v-if="typeof selectedProject === 'string'">Отчеты</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item> 
          <TodoList :todos="todos" />
        </v-tab-item>
        <v-tab-item v-if="typeof selectedProject === 'string' || typeof selectedProject === 'boolean'"> 
          <NoteList :notes="notes" />
        </v-tab-item>
        <v-tab-item v-if="typeof selectedProject === 'string'"> 
          <MilestoneList :milestones="milestones" /> 
        </v-tab-item>
        <v-tab-item v-if="typeof selectedProject === 'string'"> Отчеты (пока не готово) </v-tab-item>
      </v-tabs-items>
    </v-main>

    <v-overlay
      :opacity=0.9
      :value="overlay"
    >
      <v-btn
        color="orange lighten-2"
        @click="overlay = false"
      >
        Hide Overlay
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import fetchedData from "../../../backend/services/data.json";
import Drawer from "@/components/drawer/Drawer.vue";
import TodoList from "@/components/TodoList.vue";
import MilestoneList from '@/components/tabs/MilestonesList.vue'
import NoteList from '@/components/tabs/NoteList.vue'

export default {
  name: "Home",

  components: {
    Drawer,
    TodoList,
    MilestoneList,
    NoteList
  },

  data: () => ({
    drawer: false,
    timeGroup: 0,
    projectGroup: 0,
    tab: 0,
    apiData: fetchedData,

    selectedProject: null,
    selectedDate: null,

    overlay: false
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
      if (this.tab > 1) {
        this.tab = 0
      }
      
      this.selectedProject = projectId
    },
    setTimeGroup(timeGroup) {
      this.selectedDate = timeGroup
    }
  },

  created() {
    let url = window.location.origin + '/api/fake/me'
    this.apiGetHello(url)
  },

  computed: {
    projects() {
      return this.apiData.projects;
    },
    milestones() {
      if (typeof this.selectedProject === "string") {
        return this.apiData.milestones.filter(task => task.projectId === this.selectedProject)
      } 

      return [];
    },
    notes() {
      if (this.selectedProject === false) {
        return this.apiData.notes.filter(task => task.projectId === this.apiData.id)
      } else if (typeof this.selectedProject === "string") {
        return this.apiData.notes.filter(task => task.projectId === this.selectedProject)
      } 

      return []
    },
    todos() {
      let filteredProjects = []    
      
      if (this.selectedProject === false) {
        filteredProjects = this.apiData.tasks.filter(task => task.projectId === this.apiData.id)
      } else if (typeof this.selectedProject === "string") {
        filteredProjects = this.apiData.tasks.filter(task => task.projectId === this.selectedProject)
      } else {
        filteredProjects = this.apiData.tasks;
      }

      let d = new Date();
      let tomorow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime();
      let day2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 2).getTime();

      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      let nextMonday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7).getTime()
      
      switch(this.selectedDate) {
        case 0:
          filteredProjects = filteredProjects.filter(task => task.date <= tomorow)
          break;
        case 1:
          filteredProjects = filteredProjects.filter(task => task.date >= tomorow && task.date <= day2)
          break;
        case 2:
          filteredProjects = filteredProjects.filter(task => task.isWeekly && task.date <= nextMonday)
          break;
        case 3:
          filteredProjects = filteredProjects.filter(task => task.date == undefined)
          break;
      }

      return filteredProjects
    },
  },
};
</script>
