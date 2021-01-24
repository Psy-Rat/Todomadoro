<template>
  <v-list-item>
    <v-checkbox v-model="completed"></v-checkbox>
    <div
      @click="$store.commit('App/setDialog', { date, description, projectId })"
    >
      {{ description }}
    </div>
  </v-list-item>
</template>

<script>
import * as dateHelper from '../services/dateHelper.js'

export default {
  props: {
    todoProp: {
      completed: Boolean,
      date: String,
      description: String,
      id: String,
      projectId: String
    }
  },

  data() {
    return {
      SETUP_DAY:
        dateHelper.SETUP_CATEGORIES[dateHelper.SETUP_CATEGORIES.length - 1],
      dates: dateHelper.SETUP_CATEGORIES,
      projects: ['Проект 1', 'Проект 2'],
      dialog: false,
      description: this.todoProp.description || '',
      completed: this.todoProp.completed || false,
      date: this.todoProp.date || null,
      projectId: this.todoProp.projectId || '',

      testDate: dateHelper.SETUP_CATEGORIES[0],
      testProj: 'Проект 1'
    }
  },
  methods: {
    dateToDatesArray() {
      // this.date
      // let dates = date()
      // return today
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
