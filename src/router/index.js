import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = ()=>import("../views/Index")
const Articles = ()=>import("../views/Articles")
const ArticleType = ()=>import("../views/ArticleType")
const Article = ()=>import("../views/Article")
const Login = ()=>import("../views/Login")
const Register = ()=>import("../views/Register")
const UserInfo = ()=>import("../views/UserInfo")
const Mails = ()=>import("../views/Mails")
const Mail = ()=>import("../views/Mail")
const Collection = ()=>import("../views/Collection")
const Admin = ()=>import("../views/admin/Admin")
const AdminArticles = ()=>import("../views/admin/AdminArticles")
const AdminUsers = ()=>import("../views/admin/AdminUsers")
const WriterArticle = ()=>import("../views/admin/WriterArticle")
const AdminIndexChange = ()=>import("../views/admin/AdminIndexChange")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/articleType',
    name: 'ArticleType',
    component: ArticleType
  },
  {
    path: '/article/:id',
    name: 'Article',
    component:Article
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/userInfo/:username',
    name: 'UserInfo',
    component:UserInfo
  },
  {
    path: '/register',
    name: 'Register',
    component:Register
  },
  {
    path: '/mails',
    name: 'Mails',
    component:Mails
  },
  {
    path: '/mailGetter/:id',
    name: 'Mail',
    component:Mail
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children:[{
      //当/admin匹配成功再进行匹配
      path:'article/:username',
      component:WriterArticle
    },
    {
      //当/admin匹配成功再进行匹配
      path:'articles/:username',
      component:AdminArticles
    },
    {
      //当/admin匹配成功再进行匹配
      path:'users/:username',
      component:AdminUsers
    },
    {
      //当/admin匹配成功再进行匹配
      path:'indexChange/:username',
      component:AdminIndexChange
    }]
  },
  //{
  //  path: '/about',
  //  name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
]

const router = new VueRouter({
  mode : 'history',
  base : process.env.BASE_URL,
  routes
})


export default router
