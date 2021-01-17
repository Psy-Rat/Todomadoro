<template>
  <v-list-item>
    <v-card outlined min-width="100%" class="mb-2">
      <v-card-title>{{ note.text }}</v-card-title>
      <v-card-actions>
        <v-btn @click="$emit('remove', note.id)">X</v-btn>
      </v-card-actions>
    </v-card>
  </v-list-item>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
};
</script>