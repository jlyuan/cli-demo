<template>
  <div :class="[showCartList?'cart-container':'']" >
    <div class="cart" @click="showCartCtrl">
      <div class="cart-left">
        <div class="logo-wrap">
          <div :class="['logo',sumCount>0?'logo-lineHeight':'']">
            <span class="icon-shopping_cart cart-lineHeight"></span>
          </div>
          <div class="num" v-show="sumCount>0">{{sumCount}}</div>
        </div>
        <div :class="['total', sumCount>0?'total-lineHeight':'']">￥{{sumPrice}}</div>
        <div class="deliver-price">
          配送费 ￥{{deliveryPrice}} 元
        </div>
      </div><div :class="['cart-right',payClass?'payClass':'']" @click.stop="toPay">
      {{payDes}}
    </div>
    </div>
    <!--购物车列表-->
      <div class="list-wrap clear" v-show="showCartList">
        <div class="cart-list">
          <div class="tit"><span class="col1">购物车</span><span class="col2" @click="_clearCart">清空</span></div>
          <ul>
            <li class="cart-item" v-for="(item,index) in this.$store.state.carts" :key="index">
              <h5 class="food-name">{{item.name}}</h5>
              <span class="money">￥{{ item.price}}</span>
              <numberCtrl :food="item"></numberCtrl>
            </li>
          </ul>
        </div>
      </div>


  </div>

</template>

<script>
    import numberCtrl from '../sub/Number.vue'
    export default {
      name: "Cart",
      data:function(){
        return{
          showCartList:false,
        }
      },
      props:['deliveryPrice','minPrice'],
      components:{
        numberCtrl,
      },
      computed:{
        //总数量
        sumCount:function(){
          this.$store.commit('getTotalCount');
          return this.$store.state.totalCount;
        },
        //总价
        sumPrice:function(){
          this.$store.commit('getTotalPrice');
          return this.$store.state.totalPrice;
        },
        //配送描述
        payDes:function(){
          if(this.sumPrice == 0){
            return "￥" +this.minPrice+ "起送"
          }else if(this.sumPrice<this.minPrice){
            let diff = this.minPrice - this.sumPrice;
            return "还差￥" +diff+ "起送"
          }else{
            return "去结算"
          }
        },
        //配送样式
        payClass:function(){
          if(this.sumPrice>=this.minPrice){
            return true;
          }else{
            return false;
          }
        }
      },
      methods:{
        showCartCtrl(){
          if(this.$store.state.carts.length == 0){
            return 0;
          }
          this.showCartList =! this.showCartList;
        },
        toPay(){
          if(this.sumPrice>=this.minPrice){
            console.log("to pay");
          }else{
            return 0;
          }
        },
        _clearCart(){
          this.$store.commit('clearCart');
          this.showCartList =false;
        },
      }
    }
</script>

<style scoped>

.cart{position:fixed;left:0;bottom:0;height:49px;
  width:100%;display:flex;z-index:993;
}
.list-wrap{z-index:993;}
.clear:after{content:"";display:block;clear:both;}
.clear{zoom:1}
  .cart-left{flex:1;height:100%;background:#141c27;display:flex;}
  .cart-right{width:105px;height:100%;line-height:100%;background:#2b343b;
    font-size:14px;font-weight:700;color:rgba(255,255,255,0.4);display:flex;align-items:center;justify-content:center;}
  .logo-wrap{width:56px;height:56px;border-radius:50%;padding:6px;
    margin-left:18px;margin-top:-6px;box-sizing:border-box;background:#141c27;
  }
  .logo-wrap .num{height:16px;line-height:16px;width:24px;background:rgb(240,20,20);font-size:9px;
    border-radius:6px;position:absolute;top:-6px;left:44px;color:#fff;text-align:center;
  }
  .logo .icon-shopping_cart{color:#808589;font-size:24px;line-height:24px;}
  .logo{width:44px;height:44px;border-radius:50%;background:#2b343d;text-align:center;
    display:flex;align-items:center;justify-content:center;
  }
  .total{height:24px;margin-right:18px;margin-top:12px; color:rgba(255,255,255,0.4);
    font-weight:700;line-height:24px;
  }
  .deliver-price{height:24px;line-height:24px;margin-right:12px;margin-top:12px;text-indent:12px;
    font-size:12px;color:rgba(255,255,255,0.4);font-weight:700;border-left:1px solid rgba(255,255,255,0.1);
  }
.logo-lineHeight{background:#00a0dc}
.cart-lineHeight{color:#fff;}
.total-lineHeight{color:#fff;}
.payClass{background:#00b43c;color:#fff;}

  .cart-container{position:fixed;left:0;top:0;width:100%;bottom:49px;
    background:rgba(7,17,27,0.6);z-index:992;}
  .cart-list{background:#fff;position:absolute;bottom:0px;width:100%;
   max-height:256px;overflow-y:scroll;overflow-x:hidden;z-index:994;
  }
  .cart-list .tit{padding:0 18px;height:40px;line-height:40px;background:#f3f5f7;
    display:flex;justify-content:space-between;border-bottom:2px solid rgba(7,17,27,0.1)}
  .tit .col1{font-size:14px;font-weight:200;color:rgb(7,17,27);}
  .tit .col2{font-size:12px;color:rgb(0,16,220);}
  .cart-item{height:48px;border-bottom:1px solid rgba(7,17,27,0.1);display:flex;align-items:center;}
  .cart-list ul{padding:0 18px;}
  .food-name{font-size:14px;line-height:24px;flex:1;}
  .money{font-size:14px;font-weight:700;color:rgb(240,20,20);line-height:24px;margin-right:12px;}

</style>
