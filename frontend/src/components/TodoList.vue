<template>
	<div>
		<v-list v-if="todos.length">
			<TodoListItem
				v-for="todo in todos"
				:key="todo.id"
				:todo="todo"
				@remove="removeTodo"
			/>
		</v-list>
		<p v-else>
			Nothing left in the list. Add a new todo in the input above.
		</p>
	</div>
</template>

<script>
import TodoListItem from './TodoListItem.vue'

let nextTodoId = 1

export default {
	components: {
	  TodoListItem
	},

	props: {
    todos: {
      type: Array,
      required: true,
    },
	},
	
  data () {
    return {
			newTodoText: '',
    }
	},
	
	methods: {
		addTodo () {
			const trimmedText = this.newTodoText.trim()
			if (trimmedText) {
				this.todos.push({
					id: nextTodoId++,
					text: trimmedText
				})
				this.newTodoText = ''
			}
		},
		removeTodo (idToRemove) {
			this.todos = this.todos.filter(todo => {
				return todo.id !== idToRemove
			})
		}
	}
}
</script>