<script setup lang="ts">
import type { CopyBook } from '@/types';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useListsStore } from '@/stores/lists';
import { NButton, NIcon, NTooltip } from 'naive-ui';
import { BookAdd20Filled, BookOpen20Filled, AlignBottom20Filled, ArrowClockwise20Filled, BookArrowClockwise20Filled } from '@vicons/fluent'

defineProps<{
  book: CopyBook,
  colorBg: boolean
  bookIsPlan: boolean
  bookIsReading: boolean
  bookIsRead: boolean
}>()

const user = useUserStore();
const listStore = useListsStore()

const imageIsLoad = ref<boolean>(false)
const buttonDisabled = ref<boolean>(false)
const loadingAddPlan = ref<boolean>(false)
const loadingAddRead = ref<boolean>(false)


const addPlan = (book: CopyBook) => {
  loadingAddPlan.value = true
  buttonDisabled.value = true
  setTimeout(() => {
    book.bookIsReading = false
    book.bookIsDone = false
    book.list = book.bookIsPlan ? '' : 'I plan to read it'
    book.bookIsPlan = !book.bookIsPlan
    book.bookIsPlan ? listStore.addBookToPlanList(book) : listStore.removeFromPlanList(book)
    loadingAddPlan.value = false
    buttonDisabled.value = false
  }, 500)
}

const addRead = (book: CopyBook) => {
  loadingAddRead.value = true
  buttonDisabled.value = true
  setTimeout(() => {
    book.bookIsPlan = false
    if (book.bookIsReading) {
      book.bookIsDone = true
      book.list = 'Read it'
      listStore.addBookToDoneList(book)
      listStore.removeFromReadingList(book)
    }
    else {
      book.bookIsReading = !book.bookIsReading
      listStore.addBookToReadingList(book)
      listStore.removeFromPlanList(book)
      book.list = 'Reading'
    }
    loadingAddRead.value = false
    buttonDisabled.value = false
  }, 500)
}

const clearBook = (book: CopyBook) => {
  loadingAddRead.value = true
  setTimeout(() => {
    book.bookIsPlan = false
    book.bookIsReading = false
    book.bookIsDone = false
    book.list = ''
    listStore.removeFromDoneList(book)
  }, 500)
  loadingAddRead.value = false
}

const checkImageLoad = () => {
  imageIsLoad.value = true
}
</script>

<template>
  <li>
    <div class="book-card">
      <div class="book-card__image-wrapper">
        <div v-if="!imageIsLoad" class="image-plug"></div>
        <img class="book-card__image" :src="book.formats['image/jpeg']" :alt="book.title" loading="lazy"
          @load="checkImageLoad" />
      </div>
      <div class="book-card__content">
        <h3 class="book-card__title"> {{ book.title }} </h3>
        <div class="autor-wrapper">
          <p class="book-card__autor" v-for="author of book.authors" :key="author.name">{{ author.name }}</p>
        </div>
        <div v-if="user.isAuthorized" class="book-card__button-wrapper">

          <n-tooltip v-if="!bookIsReading && !bookIsRead" trigger="hover">
            <template #trigger>
              <n-button strong secondary circle type="success" :loading="loadingAddPlan"
                @click="() => { addPlan(book) }" size="large" :disabled="buttonDisabled">
                <template #icon>
                  <n-icon>
                    <BookAdd20Filled v-if="!bookIsPlan" />
                    <BookArrowClockwise20Filled v-else />
                  </n-icon>
                </template>
              </n-button>
            </template>
            {{ !bookIsPlan ? 'Планирую прочесть' : 'Убрать' }}
          </n-tooltip>

          <n-tooltip v-if="!bookIsReading" trigger="hover">
            <template #trigger>
              <n-button strong secondary circle type="success" :loading="loadingAddRead"
                @click="() => { addRead(book) }" size="large" :disabled="buttonDisabled">
                <template #icon>
                  <n-icon>
                    <BookOpen20Filled />
                  </n-icon>
                </template>
              </n-button>
            </template>
            Читаю
          </n-tooltip>

          <n-tooltip v-if="bookIsReading && !bookIsRead" trigger="hover">
            <template #trigger>
              <n-button strong secondary circle type="success" :loading="loadingAddRead"
                @click="() => { addRead(book) }" size="large" :disabled="buttonDisabled">
                <template #icon>
                  <n-icon>
                    <AlignBottom20Filled />
                  </n-icon>
                </template>
              </n-button>
            </template>
            Прочитано
          </n-tooltip>

          <n-tooltip v-if="bookIsRead">
            <template #trigger>
              <n-button strong secondary circle type="success" :loading="loadingAddRead"
                @click="() => { clearBook(book) }" size="large" :disabled="buttonDisabled">
                <template #icon>
                  <n-icon>
                    <ArrowClockwise20Filled />
                  </n-icon>
                </template>
              </n-button>
            </template>
            Сбросить
          </n-tooltip>
        </div>
        <div v-if="colorBg && user.isAuthorized" class="book-card__list-status">{{ book.list }}</div>
      </div>
      <div v-if="colorBg && user.isAuthorized" class="book-card__bg"
        :class="{ plan: bookIsPlan, reading: bookIsReading, read: bookIsRead }">
      </div>
    </div>
  </li>
</template>

<style scoped>
.book-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  height: 100%;
  padding: 12px 0;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}


.book-card__image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  height: 100%;
}


.book-card__image {
  max-height: 250px;
  border-radius: 12px;
}

.image-plug {
  width: 166px;
  height: 250px;
  border-radius: 12px;
  background: var(--color-background-mute);
  box-shadow: 0 -200px 100px -120px var(--color-background-soft) inset;
  animation: animateBackground 1s infinite alternate;
}

@keyframes animateBackground {
  50% {
    background: var(--color-background-mute);
    box-shadow: 0 -200px 100px -100px var(--color-border) inset;
  }
}

.book-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  height: 100%;
  padding: 0 16px;
}

.book-card__title {
  font-size: 20px;
}

.book-card__autor {
  font-size: 16px;
}

.book-card__button-wrapper {
  position: absolute;
  top: 1em;
  right: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.book-card__list-status {
  color: var(--color-accent)
}

.book-card__bg {
  position: absolute;
  inset: 0;
  background-color: var(--color-background-soft);
  z-index: -1;

  &.plan {
    background-color: #ffcb9e;
  }

  &.reading {
    background-color: #fbffc5;
  }

  &.read {
    background-color: #c5ffd6;
  }
}
</style>