<template>
  <v-dialog :value="isOpened" persistent>
    <v-card v-if="isOpened">
      <v-card-title>Задача</v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Задача *"
                required
                v-model="dialogData.description"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                label="Дата *"
                :items="dates"
                v-model="testDate"
                required
              ></v-select>
              <v-date-picker
                v-if="testDate == SETUP_DAY"
                v-model="date"
              ></v-date-picker>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                label="Проект *"
                :items="projects"
                v-model="testProj"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="remove">
          Delete
        </v-btn>
        <v-btn color="blue darken-1" text @click="close">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as dateHelper from '../services/dateHelper.js'

export default {
  data() {
    return {
      SETUP_DAY:
        dateHelper.SETUP_CATEGORIES[dateHelper.SETUP_CATEGORIES.length - 1],
      dates: dateHelper.SETUP_CATEGORIES,
      projects: ['Проект 1', 'Проект 2'],

      description: this.todoProp.description || '',
      date: this.todoProp.date || null,
      projectId: this.todoProp.projectId || '',

      testDate: dateHelper.SETUP_CATEGORIES[0],
      testProj: 'Проект 1'
    }
  },

  components: {},

  computed: {
    isOpened() {
      return this.$store.getters['App/isOpenedDialog']
    },
    dialogData() {
      return this.$store.getters['App/dialogData']
    }
  },

  methods: {
    remove() {
      this.$store.commit('App/setDialog', false)
    },
    save() {
      this.$store.commit('App/setDialog', false)
    },
    close() {
      this.$store.commit('App/setDialog', false)
    }
  },

  watch: {
    testDate(val) {
      if (dateHelper.dayCategoryToDate(val) !== null) {
        this.date = dateHelper.dayCategoryToDate(val)
      }
    }
  }
}
</script>
