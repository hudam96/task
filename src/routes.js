import login from './components/login.vue'
import home from './components/home.vue'
import bills from './components/bills'

export default [
    {path: '/login',name:'Login', component:login
    },
    {path:'/', name:'Home', component:home,
        meta:{
        role: ["Customer"]
        }
    },
    {path:'/bills', name:'bills', component:bills,
    meta: {
        role: ["Customer"]
    }}
]