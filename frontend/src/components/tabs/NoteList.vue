<template>
  <div>
    <v-list v-if="notes.length">
      <NoteListItem
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @remove="removenote"
      />
    </v-list>
    <p v-else>
      Nothing left in the list. Add a new notes in the input above.
    </p>
  </div>
</template>

<script>
import NoteListItem from './NoteListItem.vue'

let nextTodoId = 1

export default {
  components: {
    NoteListItem
  },

  props: {
    notes: {
      type: Array,
      required: true
    }
  },

  data() {
    return {}
  },

  methods: {
    addnote() {
      const trimmedText = this.newTodoText.trim()
      if (trimmedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText
        })
        this.newTodoText = ''
      }
    },
    removenote(idToRemove) {
      this.todos = this.todos.filter(todo => {
        return todo.id !== idToRemove
      })
    }
  }
}
</script>
