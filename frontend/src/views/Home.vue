<template>
  <div>
    <v-navigation-drawer app v-model="drawer" temporary>
      <Drawer />
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><b>ToDo</b>modoro</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="overlay = true">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn text to="/about">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- <Breadcrumbs /> -->
      <v-tabs v-model="tab" center-active show-arrows grow>
        <v-tab>Задачи</v-tab>
        <v-tab
          v-if="
            typeof selectedProject === 'string' ||
              typeof selectedProject === 'boolean'
          "
          >Заметки</v-tab
        >
        <v-tab v-if="typeof selectedProject === 'string'">Этапы</v-tab>
        <v-tab v-if="typeof selectedProject === 'string'">Отчеты</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <TodoList :todosProp="todos" />
        </v-tab-item>
        <v-tab-item
          v-if="
            typeof selectedProject === 'string' ||
              typeof selectedProject === 'boolean'
          "
        >
          <!-- <NoteList :notes="notes" /> -->
        </v-tab-item>
        <v-tab-item v-if="typeof selectedProject === 'string'">
          <!-- <MilestoneList :milestones="milestones" /> -->
        </v-tab-item>
        <v-tab-item v-if="typeof selectedProject === 'string'">
          Отчеты (пока не готово)
        </v-tab-item>
      </v-tabs-items>
    </v-main>

    <TodoDialog />

    <v-overlay :opacity="0.9" :value="overlay">
      <v-btn color="orange lighten-2" @click="overlay = false">
        Hide Overlay
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import Drawer from '@/components/drawer/Drawer.vue'
import TodoList from '@/components/TodoList.vue'
// import MilestoneList from '@/components/tabs/MilestonesList.vue'
// import NoteList from '@/components/tabs/NoteList.vue'
import TodoDialog from '@/components/TodoDialog'

export default {
  name: 'Home',

  components: {
    Drawer,
    TodoList,
    // MilestoneList,
    // NoteList,
    TodoDialog
  },

  data: () => ({
    drawer: false,
    tab: 0,
    overlay: false
  }),

  created() {
    this.$store.dispatch('App/init')
  },

  computed: {
    projects() {
      return this.$store.getters['App/projects']
    },
    selectedProject() {
      return this.$store.getters['App/selectedProjectGroup']
    },
    // milestones() {
    //   if (typeof this.selectedProject === 'string') {
    //     return this.apiData.milestones.filter(
    //       task => task.projectId === this.selectedProject
    //     )
    //   }

    //   return []
    // },
    // notes() {
    //   if (this.selectedProject === false) {
    //     return this.apiData.notes.filter(
    //       task => task.projectId === this.apiData.id
    //     )
    //   } else if (typeof this.selectedProject === 'string') {
    //     return this.apiData.notes.filter(
    //       task => task.projectId === this.selectedProject
    //     )
    //   }

    //   return []
    // },
    todos() {
      return this.$store.getters['App/tasks']
    }
  },

  watch: {
    selectedProject() {
      if (this.tab > 1) {
        this.tab = 0
      }
    }
  }
}
</script>
