<template>
  <v-app>
    <v-navigation-drawer 
      app
      v-model="drawer"
      absolute
      temporary
    >
      <Drawer :projects="projects"/>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><b>ToDo</b>modoro</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        disabled
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Breadcrumbs />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import fetchedData from '../../backend/services/data.json'
import Drawer from './components/drawer/Drawer.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
  name: "App",

  components: {
    Drawer,
    Breadcrumbs
  },

  data: () => ({
    drawer: false,
    timeGroup: 0,
    projectGroup: 0,
    apiData: fetchedData,
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
  },

  // created() {
  //   let url = window.location.origin + '/api/fake/me'
  //   this.apiGetHello(url)
  // },

  computed: {
    projects() {
      return this.apiData.projects
    },
    sunday() {
      var d = new Date();

      // set to Monday of this week
      d.setDate(d.getDate() - (d.getDay() + 6) % 7);

      // set to next Monday
      d.setDate(d.getDate() + 7);

      // create new date of day before
      var sunday = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      return sunday.getTime()
    }
  }
};
</script>
