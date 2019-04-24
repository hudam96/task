import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Routes from './routes';
import jwtDecode from 'jwt-decode';
Vue.use(VueRouter)
Vue.config.productionTip = false
const router = new VueRouter({
  mode : 'history',
  routes : Routes
})

// vue guard
router.beforeEach((to , from , next) => {
  const userRole = (localStorage.getItem("token")) ? jwtDecode(localStorage.token).FeRole : null;
  if(to.meta.role){
    if(to.meta.role.includes(userRole)){
      next();
    }else{
      next("/login")
    }
  }else{
    next();
  }
})

new Vue({
  render: h => h(App),
  router : router
}).$mount('#app')
