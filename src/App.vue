<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useBooksStore } from './stores/books';

const books = useBooksStore()

onMounted(() => {
  books.getBooks()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
