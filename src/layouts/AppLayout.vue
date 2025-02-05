<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useListsStore } from '@/stores/lists';
import { useBooksStore } from '@/stores/books';
import { NButton, NIcon } from 'naive-ui'
import { ArrowRight12Filled, ArrowLeft12Filled, ArrowUp12Filled } from '@vicons/fluent'
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import router from '@/router';


defineProps<{
  navigtionButtons: boolean
}>()

const user = useUserStore()
const booksStore = useBooksStore()
const { planListLength, readingListLength, doneListLength } = storeToRefs(useListsStore())

const loadingRef = ref<boolean>(false)
const pageIsScrolled = ref<boolean>(false)


const handleClick = () => {
  loadingRef.value = true;
  setTimeout(() => {
    user.isAuthorized = !user.isAuthorized
    if (!user.isAuthorized) router.push('/')
    loadingRef.value = false;
  }, 500)
}

const loadAnatherBooks = async (url: string | null) => {
  if (url) {
    await booksStore.getBooks(url)
  }
}

const watchToScroll = () => {
  pageIsScrolled.value = window.scrollY > 300 ? true : false

}

const scrollToTop = () => {
  pageIsScrolled.value = false
  window.scrollTo(0, 0)
}


onMounted(() => {
  window.addEventListener('scroll', watchToScroll)
})

onUnmounted(() => {
  window.addEventListener('scroll', watchToScroll)
})
</script>

<template>
  <div class="root">
    <header class="header">
      <div class="container header__container">
        <router-link to="/" class="logo-link">
          <div class="logo header__logo">
            <img src="@/assets/logo.svg" alt="Logo" class="logo__image">
            <span class="logo__title">List<span class="logo__title--accent">2</span>Read</span>
          </div>
        </router-link>

        <n-button round type="primary" size="large" :loading="loadingRef" @click="handleClick" class="header__button">
          {{ !user.isAuthorized ? 'Log In' : 'Log Out' }}
        </n-button>
      </div>
    </header>
    <div class="content-wrapper">
      <aside class="aside">
        <div v-if="user.isAuthorized" class="list-wrapper">
          <h2 class="list-title">Lists of books</h2>
          <ul class="book-lists">
            <li class="book-lists__item">
              <router-link to="/plan"> I plan to read it <span class="book-lists__count">{{
                planListLength
                  }}</span>
              </router-link>
            </li>
            <li class="book-lists__item">
              <router-link to="/reading"> Reading <span class="book-lists__count">{{ readingListLength
                  }}</span>
              </router-link>
            </li>
            <li class="book-lists__item">
              <router-link to="/done"> Read it <span class="book-lists__count">{{ doneListLength
                  }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </aside>
      <main class="main">
        <div class="container">
          <h1 class="main-title">
            <slot name="main-title"></slot>
          </h1>
          <p v-if="!user.isAuthorized" class="welcome-text">
            <slot name="welcome-text"></slot>
          </p>
          <div v-else class="main-search">
            <slot name="search-input"></slot>
          </div>
          <transition appear>
            <ul class="books-list">
              <slot name="books-list"></slot>
            </ul>
          </transition>
          <div v-if="navigtionButtons" class="navigation-buttons">
            <n-button strong secondary circle type="success" size="large"
              @click="() => loadAnatherBooks(booksStore.prevPageLink)" :disabled="!booksStore.prevPageLink">
              <template #icon>
                <n-icon>
                  <ArrowLeft12Filled />
                </n-icon>
              </template>
            </n-button>
            <n-button strong secondary circle type="success" size="large"
              @click="() => loadAnatherBooks(booksStore.nextPageLink)">
              <template #icon>
                <n-icon>
                  <ArrowRight12Filled />
                </n-icon>
              </template>
            </n-button>
          </div>
          <div v-if="pageIsScrolled" class="to-top">
            <n-button strong secondary circle type="success" size="large" class="to-top-button" @click="scrollToTop">
              <template #icon>
                <n-icon>
                  <ArrowUp12Filled />
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 1em 0;
  background-color: var(--color-background-soft);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;

}

.logo-link {
  border-radius: 12px;
  overflow: hidden;
}

.logo__image {
  width: 40px;
  height: 40px;
  margin-right: 4px;
}

.logo__title {
  color: #447a9c;
  font-size: 1.8em;
  font-weight: 700;
}

.logo__title--accent {
  color: var(--color-accent);
  font-weight: inherit;
}

.header__button {
  font-size: 1.2em;
  font-weight: 500;
}

.content-wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
}

.aside {
  grid-column: 2 span;
  padding: 16px;
}

.main {
  position: relative;
  grid-column: 10 span;
}

.main-title {
  margin-bottom: 24px;
  color: var(--color-heading);
}

.welcome-text {
  margin-bottom: 20px;
  color: var(--color-text);
}

.main-search {
  max-width: 560px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.books-list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
  position: relative;
}

.navigation-buttons {
  position: absolute;
  top: 2em;
  right: 2em;
  display: flex;
  align-items: center;
  gap: 12px;
}

.to-top-button {
  position: fixed;
  bottom: 2em;
  right: 2em;
}
</style>