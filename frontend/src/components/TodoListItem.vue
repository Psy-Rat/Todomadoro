<template>
  <v-list-item>
    <v-card outlined min-width="100%" class="mb-2">
      <v-card-title>{{ todo.text }}</v-card-title>
      <v-card-actions>
        <v-btn @click="$emit('remove', todo.id)">X</v-btn>
      </v-card-actions>
    </v-card>
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
};
</script>