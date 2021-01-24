<template>
  <v-list nav dense>
    <Avatar />

    <v-divider></v-divider>

    <v-list-item-group
      v-model="timeGroup"
      active-class="deep-purple--text text--accent-4"
    >
      <v-list-item>
        <v-list-item-title>Сегодня</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Завтра</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>На неделе</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Когда-нибудь</v-list-item-title>
      </v-list-item>
    </v-list-item-group>

    <v-divider></v-divider>

    <v-list-item-group
      v-model="projectGroup"
      active-class="deep-purple--text text--accent-4"
    >
      <v-list-item @mouseup="selectedProject = false">
        <v-list-item-title>Без категории</v-list-item-title>
      </v-list-item>

      <div v-for="{ id, name, projects } in projects" :key="id">
        <v-list-item
          link
          v-if="projects.length === 0"
          @mouseup="selectedProject = id"
        >
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item>

        <v-list-group no-action v-else @mouseup="selectedProject = id">
          <template v-slot:activator>
            <v-list-item-title>{{ name }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="{ id, name } in projects"
            :key="id"
            @mouseup="selectedProject = id"
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
export default {
  components: {
    Avatar
  },

  props: {
    projectsProp: {
      type: Array
    }
  },

  data() {
    return {
      timeGroup: null,
      projectGroup: null,
      selectedProject: null
    }
  },

  computed: {
    projects() {
      return this.projectsProp || []
    }
  },

  watch: {
    projectGroup: function(val) {
      if (val == undefined) {
        this.$emit('selectedProject', null)
      } else {
        this.$emit('selectedProject', this.selectedProject)
      }
    },
    timeGroup: function(val) {
      if (val == undefined) {
        this.$emit('selectedTimeGroup', null)
      } else {
        this.$emit('selectedTimeGroup', this.timeGroup)
      }
    }
  }
}
</script>
