<template>
  <div>
    <v-list v-if="milestones.length">
      <TodoListItem
        v-for="milestone in milestones"
        :key="milestone.id"
        :todo="milestone"
        @remove="removeMilestone"
      />
    </v-list>
    <p v-else>
      Nothing left in the list. Add a new milestones in the input above.
    </p>
  </div>
</template>

<script>
import TodoListItem from '../TodoListItem.vue'

let nextTodoId = 1

export default {
  components: {
    TodoListItem
  },

  props: {
    milestones: {
      type: Array,
      required: true
    }
  },

  data() {
    return {}
  },

  methods: {
    addMilestone() {
      const trimmedText = this.newTodoText.trim()
      if (trimmedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText
        })
        this.newTodoText = ''
      }
    },
    removeMilestone(idToRemove) {
      this.todos = this.todos.filter(todo => {
        return todo.id !== idToRemove
      })
    }
  }
}
</script>
