<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import BookCard from '@/components/BookCard.vue';
import AppLoader from '@/components/AppLoader.vue';
import { useBooksStore } from '@/stores/books';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { NInput } from 'naive-ui'
import { URL_BOOK_SEARCH } from '@/constants';
import { debounce } from '@/functions';
import { useListsStore } from '@/stores/lists';
import { findBook } from '@/functions';
import type { CopyBook } from '@/types';


const searchValue = ref<string>('')
const currentBookList = ref<CopyBook[]>([])
const emptyLists = computed(() => {
    return planListIsEmpty && readingListIsEmpty && doneListIsEmpty
})

const { copyBooks, booksIsLoading } = storeToRefs(useBooksStore())
const getBooks = useBooksStore().getBooks

const { planList, readingList, doneList } = storeToRefs(useListsStore())
const { planListIsEmpty, readingListIsEmpty, doneListIsEmpty } = useListsStore()



const stringToUrlFormat = () => {
    return searchValue.value.replace(' ', '%20')
}

const searchHandler = debounce(async () => {
    const currentSearchUrl = searchValue.value ? `${URL_BOOK_SEARCH}${stringToUrlFormat()}` : ''
    await getBooks(currentSearchUrl)
    getCurrentBookList()
}, 500);

const getCurrentBookList = () => {
    if (!emptyLists.value) {
        currentBookList.value = findBook(copyBooks.value, planList.value)
        currentBookList.value = findBook(copyBooks.value, readingList.value)
        currentBookList.value = findBook(copyBooks.value, doneList.value)
    }
    else {
        currentBookList.value = copyBooks.value
    }

}



watch(copyBooks, () => {
    getCurrentBookList()
})

onMounted(() => {
    getCurrentBookList()
})


</script>

<template>
    <AppLayout :navigtionButtons="true">
        <template #main-title>
            Your favorite literary works in one place
        </template>
        <template #welcome-text>Log in to create your own reading list.
        </template>
        <template #search-input>
            <n-input v-model:value="searchValue" :input-props="{ id: 'homeSearch' }" type="text" size="large" round
                placeholder="Search author names and book titles" class="main-search-input" @input="searchHandler"
                clearable />
        </template>
        <template #books-list>
            <AppLoader v-if="booksIsLoading" />
            <BookCard v-for="book in currentBookList" :key="book.id" :book="book" :book-is-plan="book.bookIsPlan"
                :book-is-read="book.bookIsDone" :book-is-reading="book.bookIsReading" :color-bg="true"
                class="book-item" />
        </template>
    </AppLayout>
</template>

<style scoped>
.book-item {
    grid-column: 3 span;
}
</style>