import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksView from '../views/BooksView.vue'
import AddBookView from '../views/AddBookView.vue'
import UpdateBook from '../views/UpdateBook.vue'
import SearchPage from '../views/SearchPage.vue'
import GamesView from '../views/GamesView.vue'
import AddGameView from '../views/AddGameView.vue'
import UpdateGame from '../views/UpdateGame.vue'
// import GiftsView from '../views/GiftsView.vue'
// import MaterialsView from '../views/MaterialsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/books',
    name: 'books',
    component: BooksView
  },
  {
    path: '/book/detail',
    name: 'addBook',
    component: AddBookView
  },
  {
    path: '/book/detail/:id',
    name: 'updateBook',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: UpdateBook
  },
  {
    path: '/games',
    name: 'games',
    component: GamesView
  },
  {
    path: '/game/detail',
    name: 'addGame',
    component: AddGameView
  },
  {
    path: '/game/detail/:id',
    name: 'updateGame',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: UpdateGame
  },
  {
    path: '/search',
    name: 'SearchPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SearchPage
  }
  // {
  //   path: '/games',
  //   name: 'games',
  //   component: GamesView
  // },
  // {
  //   path: '/gifts',
  //   name: 'gifts',
  //   component: GiftsView
  // },
  // {
  //   path: '/materials',
  //   name: 'materials',
  //   component: MaterialsView
  // }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
