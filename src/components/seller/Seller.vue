<template>
    <div class="seller-container">
      <div class="title section">
          <h2>{{seller.name}}</h2>
          <div class="score">
            <star :score="seller.score"></star>
            <span class="sell-num">月售{{seller.sellCount}}单</span>
          </div>
          <div class="price">
            <div class="price-item">
              <h5>起送价</h5>
              <p><span>{{seller.minPrice}}</span><span class="unit">元</span></p>
            </div>
            <div class="price-item">
              <h5>商家配送</h5>
              <p><span>{{seller.deliveryPrice}}</span><span class="unit">元</span></p>
            </div>
            <div>
              <h5>平均配送时间</h5>
              <p><span>{{seller.deliveryTime}}</span><span class="unit">分钟</span></p>
            </div>
          </div>
      </div>

      <div class="notice section">
        <h2>公告与活动</h2>
        <p>{{seller.bulletin}}</p>
        <ul class="discount">
            <li v-for="(item,i) in seller.supports" :key="i">
              <span :class="['discountIcon', getDiscountType(item.type)]"></span>
              {{item.description}}
            </li>
        </ul>
        <span class="decreasePic"></span>
        <span class="discountPic"></span>
      </div>
      <div class="scene section">
        <h2>商家实景</h2>
        <ul class="scene-pics">
          <li v-for="(src,index) in seller.pics" :key="index"><img :src="src" alt=""></li>
        </ul>
      </div>
      <div class="seller-info section">
        <h2>商家信息</h2>
        <ul>
          <li v-for="(info,i) in seller.infos" :key="i">{{info}}</li>
        </ul>
      </div>
      <cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></cart>
    </div>

</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../sub/Star.vue'
  import cart from '../cart/ShopCart.vue'
    export default {
        name: "Seller",
      props:['seller'],
      components:{
          star,
          cart
      },
      created:function(){

      },
      computed:{
          getDiscountType:function(){
            return function(type){
              if(type === 0){
                return "decreasePic"
              }else if(type === 1 || type===2){
                return "discountPic"
              }else if(type==4){
                return "guaranteePic"
              }else if(type==3){
                return "invoicePic"
              }else{
                return " "
              }

            }
          }
      }
    }
</script>

<style scoped>
  .seller-container{background:#f3f5f7;position:absolute;top:175px;bottom:49px;
    width:100%;overflow-y:scroll;z-index:1;
  }
  .section{padding:18px;background:#fff;margin-bottom:18px;
    border-top:1px solid #ccc;border-bottom:1px solid #ccc;}
  .section h2{margin-bottom:8px;font-size:14px;line-height:14px;color:rgb(7,17,27)}
  .score{height:18px;padding-bottom:18px;position:relative;}
  .score:after{
    content:'';width:100%;height:1px;
    position:absolute;background:#ccc;
    left:0;bottom:0;transform:scaleY(0.5);
  }
  .sell-num{display:inline-block;color:rgb(77,85,93);font-size:10px;line-height:18px;}
  .price{padding:18px 18px 0 18px; display:flex}
  .price>div{text-align:center;flex:1;}
  .price-item{border-right:1px solid #ccc;}
  .price h5{margin-bottom:4px;font-size:10px;color:rgb(147,153,159);line-height:10px;}
  .price span{font-size:24px;font-weight:200;line-height:24px;}
  .price .unit{font-size:12px;}

  .notice{margin-top:18px;}
  .notice p{padding:0 12px;font-size:12px;font-weight:200;
    color:rgb(240,20,20);line-height:24px;
  }
  .discount{border-bottom:1px solid #ccc;margin-top:16px;}
  .discountIcon{width:16px;height:16px;display:inline-block;background-size:100% 100%;}
  .decreasePic{background-image:url('decrease_1@2x.png')}
  .discountPic{background-image:url('discount_1@2x.png')}
  .guaranteePic{background-image:url('guarantee_1@2x.png')}
  .invoicePic{background-image:url('invoice_1@2x.png')}

  .discount li{height:48px;line-height:48px;
    border-top:1px solid #ccc;color:rgb(7,17,27);
    font-size:12px;
  }
  .discount li span{margin:0 12px;}
  .scene-pics{overflow-x:scroll;width:100%;white-space:nowrap;}
  .scene-pics::-webkit-scrollbar{display:none}
  .scene-pics li{width:120px;height:90px;
    display:inline-block;padding:12px 6px;
  }
  .scene-pics li img{width:120px;height:90px;}

  .seller-info li{
    padding:16px 12px;
    border-top:1px solid rgba(7,17,27,0.1);
    font-size:12px;color:rgb(7,17,27);
    line-height:16px;
  }
</style>
