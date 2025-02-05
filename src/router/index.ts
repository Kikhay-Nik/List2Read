import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import HomePage from '@/pages/HomePage.vue';
import DoneListPage from '@/pages/DoneListPage.vue';
import PlanListPage from '@/pages/PlanListPage.vue';
import ReadingListPage from '@/pages/ReadingListPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/plan',
      name: 'planList',
      component: PlanListPage,
    },
    {
      path: '/reading',
      name: 'readingList',
      component: ReadingListPage,
    },
    {
      path: '/done',
      name: 'doneList',
      component: DoneListPage,
    },
  ],
});

router.beforeEach((to) => {
  const user = useUserStore();

  if (to.meta.requiredAuth && !user.isAuthorized) {
    return '/';
  }
});

export default router;
