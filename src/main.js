// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import "../static/css/reset.css"
import "./common/style/sell-icon.css"
import VResource from 'vue-resource'
import Vuex from 'vuex'
Vue.use(Vuex);
Vue.use(VResource);
Vue.config.productionTip = false;

//vuex 数据状态管理
var store = new Vuex.Store({
  state:{
    carts:[
      {count: 1,
        foodId: 1001,
        name: "皮蛋瘦肉粥",
        price: 10},
      ],//购物车{foodId:1001,price:999,count:1，name:xxx}
    totalCount:0,
    totalPrice:0
  },
  mutations:{
    //添加商品到购物车
    addToCart(state,obj){
      let flag = state.carts.find(item=>{
        if(item.foodId == obj.foodId){
          item.count += 1;
          return true
        }
      });
      if(!flag){
        state.carts.push(obj);
      }
    },
    //减少购物商品数量
    subFromCart(state,id){
      state.carts.find(item=>{
      if(item.foodId == id){
        if(item.count>0){
          item.count -= 1;
        }
        return true
      }
    });
    },
    //计算购物商品数量
    getTotalCount(state){
      let totalCount = 0;
      state.carts.forEach(item=>{
          totalCount += item.count;
      });
      state.totalCount = totalCount;
    },//计算购物商品总价
    getTotalPrice(state){
      let totalPrice = 0;
      state.carts.forEach(item=>{
        totalPrice += item.count*item.price;
      });
      state.totalPrice = totalPrice;
    },
    //清空购物车
    clearCart(state){
      state.carts = [];
    }
  },
  getters:{

  }

});

var formatDate = function(value) {
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
};
Vue.filter('formatDate',formatDate);
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  render:c=>c(App),
  ///render:c=>c(test)
});
