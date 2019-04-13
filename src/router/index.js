import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/Goods.vue'
import ratings from '@/components/ratings/Ratings.vue'
import seller from '@/components/seller/Seller.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {path:'/',redirect:'/goods'},
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller},

  ]
})
