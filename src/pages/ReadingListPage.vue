<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import BookCard from '@/components/BookCard.vue';
import { useListsStore } from '@/stores/lists';
import { storeToRefs } from 'pinia';
import { debounce, searchInList } from '@/functions';
import type { CopyBook } from '@/types';
import { ref } from 'vue';
import { NInput } from 'naive-ui';


const { readingList } = storeToRefs(useListsStore())


const currentBookList = ref<CopyBook[]>(readingList.value)
const searchValue = ref<string>('')
const emptySearchResponse = ref<boolean>(false)

const searchHandler = debounce(() => {
    currentBookList.value = searchInList(searchValue.value, readingList.value)

    emptySearchResponse.value = currentBookList.value.length === 0 ? true : false
}, 500)
</script>

<template>
    <AppLayout :navigtionButtons="false">
        <template #main-title>
            Reading
        </template>
        <template #search-input>
            <n-input v-model:value="searchValue" :input-props="{ id: 'readingSearch' }" type="text" size="large" round
                placeholder="Search author names and book titles" class="main-search-input" @input="searchHandler"
                clearable />
        </template>
        <template #books-list>
            <div v-if="emptySearchResponse" class="empty-search">Nothing was found.</div>

            <BookCard v-for="book in currentBookList" :key="book.id" :book="book" :book-is-plan="book.bookIsPlan"
                :book-is-read="book.bookIsDone" :book-is-reading="book.bookIsReading" :color-bg="false"
                class="book-item" />
        </template>
    </AppLayout>
</template>

<style scoped>
.book-item {
    grid-column: 3 span;
}
</style>