<template>
  <v-list-item>
    <v-card outlined min-width="100%" class="mb-2">
      <v-card-title>{{ todo.desription }}</v-card-title>
      <v-card-actions>
        <v-btn @click="$emit('remove', todo.id)">X</v-btn>
        <v-btn @click="dialog = true">E</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Задача</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Задача *" required></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6">
                <v-select
                  label="Дата *"
                  :items="['Сегодня', 'Завтра', 'На неделе', 'Когда-нибудь', 'Установить дату']"
                  v-model="value"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  label="Проект *"
                  :items="['Проект 1', 'Проект 2']"
                  required
                ></v-select>
              </v-col>
              
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
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
    todo: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    dialog: false,
  }),
};
</script>