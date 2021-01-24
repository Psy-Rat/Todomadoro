<template>
  <v-list-item>
    <v-checkbox v-model="completed"></v-checkbox>
    <div @click="dialog = true">{{ description }}</div>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Задача</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Задача *"
                  required
                  v-model="description"
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
                  v-if="testDate == 'Установить дату'"
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
          <v-btn color="blue darken-1" text @click="$emit('delete')">
            Delete
          </v-btn>
          <v-btn color="blue darken-1" text @click="$emit('close')">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="$emit('save')">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
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
      dates: [
        'Когда-нибудь',
        'Сегодня',
        'Завтра',
        'На неделе',
        'Установить дату'
      ],
      projects: ['Проект 1', 'Проект 2'],
      dialog: false,
      description: this.todoProp.description || '',
      completed: this.todoProp.completed || false,
      date: this.todoProp.date || 0,
      projectId: this.todoProp.projectId || '',

      testDate: 'Когда-нибудь',
      testProj: 'Проект 1',
    }
  },
  methods: {
    dateToDatesArray() {
      let today = new Date().toISOString().substring(0, 10)
      return today
    }
  },
  computed: {

  }
}
</script>
