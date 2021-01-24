<template>
  <v-list nav dense>
    <Avatar />

    <v-divider></v-divider>

    <v-list-item-group
      v-model="dateIndex"
      active-class="deep-purple--text text--accent-4"
    >
      <v-list-item
        v-for="(dg, i) in dateGroups"
        :key="i"
        @mouseup="selectedDateCategory = dg"
      >
        <v-list-item-title>{{ dg }}</v-list-item-title>
      </v-list-item>
    </v-list-item-group>

    <v-divider></v-divider>

    <v-list-item-group
      v-model="projectIndex"
      active-class="deep-purple--text text--accent-4"
    >
      <v-list-item @mouseup="selectedProjectId = false">
        <v-list-item-title>Без категории</v-list-item-title>
      </v-list-item>

      <div v-for="{ id, name, projects } in projects" :key="id">
        <v-list-item
          link
          v-if="projects.length === 0"
          @mouseup="selectedProjectId = id"
        >
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item>

        <v-list-group no-action v-else @mouseup="selectedProjectId = id">
          <template v-slot:activator>
            <v-list-item-title>{{ name }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="{ id, name } in projects"
            :key="id"
            @mouseup="selectedProjectId = id"
          >
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list-item-group>
  </v-list>
</template>

<script>
import Avatar from './Avatar.vue'
import * as dateHelper from '../../services/dateHelper'

export default {
  components: {
    Avatar
  },

  data() {
    return {
      dateIndex: null,
      projectIndex: null,

      selectedProjectId: null,
      selectedDateCategory: null,

      dateGroups: dateHelper.DAY_CATEGORIES
    }
  },

  computed: {
    projects() {
      return this.$store.getters['App/projects']
    }
  },

  watch: {
    projectIndex: function(val) {
      if (val == undefined) {
        this.$store.commit('App/setSelectedProjectId', null)
      } else {
        this.$store.commit('App/setSelectedProjectId', this.selectedProjectId)
      }
    },
    dateIndex: function(val) {
      if (val == undefined) {
        this.$store.commit('App/setSelectedDateCategory', null)
      } else {
        this.$store.commit(
          'App/setSelectedDateCategory',
          this.selectedDateCategory
        )
      }
    }
  }
}
</script>
