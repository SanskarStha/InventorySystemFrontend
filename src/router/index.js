import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksView from '../views/BooksView.vue'
import AddBookView from '../views/AddBookView.vue'
import UpdateBook from '../views/UpdateBook.vue'
import SearchPage from '../views/SearchPage.vue'
import GamesView from '../views/GamesView.vue'
import AddGameView from '../views/AddGameView.vue'
import UpdateGame from '../views/UpdateGame.vue'
import GiftsView from '../views/GiftsView.vue'
import AddGiftView from '../views/AddGiftView.vue'
import UpdateGift from '../views/UpdateGift.vue'
import MaterialsView from '../views/MaterialsView.vue'
import AddMaterialView from '../views/AddMaterialView.vue'
import UpdateMaterial from '../views/UpdateMaterial.vue'

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
    component: UpdateGame
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage
  },
  {
    path: '/gifts',
    name: 'gifts',
    component: GiftsView
  },
  {
    path: '/gift/detail',
    name: 'addGift',
    component: AddGiftView
  },
  {
    path: '/gift/detail/:id',
    name: 'updateGift',
    component: UpdateGift
  },
  {
    path: '/materials',
    name: 'materials',
    component: MaterialsView
  },
  {
    path: '/material/detail',
    name: 'addMaterial',
    component: AddMaterialView
  },
  {
    path: '/material/detail/:id',
    name: 'updateMaterial',
    component: UpdateMaterial
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
