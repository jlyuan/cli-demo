<template>
    <div class="goods">
       <div class="menu" ref="menuScroll">
            <ul>
              <li ref="menuItem" v-for="(item,index) in goods" :key="index" :class="index==curIndex?'active':''" @click="selectMenu(index)">{{item.name}}</li>
            </ul>
       </div>
      <div class="foods" ref="foodScroll">
        <ul class="foods-list">
          <li v-for="(item,index) in goods" :key="index"  v-if="goods.length!=0" ref="goodItem" class="items-hook">
            <h2>{{item.name}} {{curIndex}}</h2>
            <ul>
              <li v-for="(food,i) in item.foods" :key="i"  class="food-item">
                <img :src="food.icon" alt="">
                <div class="content">
                  <h5 @click="_selectFood($event,food)">{{food.name}}</h5>
                  <p class="des">{{food.description}}</p>
                  <div class="sell-num">
                    <span class="sellCount">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div>
                    <span class="price">￥{{food.price}}</span>
                    <span class="oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <numberCtrl :food="food"></numberCtrl>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
        <food :food="selectedFood" ref="food"></food>
      <cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></cart>

    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cart from '../cart/ShopCart.vue'
  import numberCtrl from '../sub/Number.vue'
  import food from './Food.vue'

  export default {
    name: "Goods",
    props:[
      'seller'
    ],
    components:{
      cart,
      food,
      numberCtrl,
    },
      data:function(){
        return {
          goods:[],
          actLi:0,//当前选择的菜单项
          menuScroll:null,
          foodScroll:null,
          scrollY:0,//右侧商品列表滑动的位置
          arrTop:[],//列表距离顶部位置
          selectedFood:{},
          isShowFood:false,
        }
      },
    created:function(){
      this.getGoods();
    },
      activated:function(){
          //this.getGoods();
      },
      mounted:function(){
        setTimeout(()=>{
          this.scroll();
          this.calculateHeight();
        });

      },
    computed:{
      curIndex:function(){
        for(let i=0;i<this.arrTop.length;i++){
          let h1 = this.arrTop[i];
          let h2 = this.arrTop[i+1];
          if(!h2 || (this.scrollY>= h1 && this.scrollY<h2)){
            let menuList = this.$refs.menuItem;
            this.menuScroll.scrollToElement(menuList[i],300);
            return i;
          }
        }
        return 0;

      }
    },
      methods:{
          getGoods(){
            this.$http.get('/api/goods').then(res=>{
              if(res.body.errno == 0){
                //console.log(res.body.data);
                this.goods = res.body.data;
              }
            });
            console.log('request: /api/goods');
          },
        // scroll
        scroll(){
          this.menuScroll = new BScroll(this.$refs.menuScroll,{click: true});
          this.foodScroll = new BScroll(this.$refs.foodScroll,{click: true,probeType: 3});

          //监听右侧列表滑动
          this.foodScroll.on('scroll',res=>{
            this.scrollY = Math.abs(res.y);
            //console.log('on:' + this.scrollY);
          });
        },
        calculateHeight(){
          //将列表距离顶部位置存储到一个数组
          //let goodsList = document.getElementsByClassName("items-hook");
          let goodsList = this.$refs.goodItem;
          var height = 0;
          this.arrTop.push(height);
          for(let i=0;i<goodsList.length;i++){
            height += goodsList[i].clientHeight;
            this.arrTop.push(height);
          }
        },
        selectMenu(index){
            //this.curIndex = index;
            //let goodsList = this.$refs.foodScroll.getElementsByClassName("items-hook");
            let goodsList = this.$refs.goodItem;
            this.foodScroll.scrollToElement(goodsList[index],300)
        },
        //选择食物商品
        _selectFood(event,food){
            console.log(event.target);
            this.selectedFood = food;
            this.$refs.food.show();
        }

      }
    }
</script>

<style scoped>

 .goods{border-top:1px solid rgba(7,17,27,0.1);display:flex;overflow:hidden;
      position:absolute;top:175px;bottom:49px;width:100%;
    }
 .menu{width:80px;}
  .foods{flex:1;}
  .menu ul{background:#f3f5f7;}
  .menu li{padding: 0 12px;display:flex;align-items:center;height:54px;font-size:12px;border-bottom:1px solid rgba(7,17,27,0.1);
    color:rgb(7,17,27);font-weight:200;line-height:14px;
  }
 .menu li.active{background:#fff;font-weight:400;font-size:14px;}
 .foods-list h2{
   border-left:2px solid #d9dde1;
   background:#f3f5f7;
   font-size:12px;color:rgb(147,153,159);
   line-height:26px;text-indent:18px;
 }
 .foods-list ul{padding:0 18px;}
 .food-item{padding:18px 0;display:flex;border-bottom:1px solid #cce;position:relative;}
 .food-item img{width:57px;height:57px;margin-right:10px;}
 .food-item .content{}
 .content h5{margin:2px 0 8px 0;line-height:14px;font-size:14px;color:rgb(7,17,27);}
  .content .des{font-size:12px; color:rgb(209,211,214);}
  .content .sell-num{margin-top:8px;margin-bottom:8px; }
  .content .sell-num span{margin-right:12px;font-size:12px;color:rgb(209,211,214);}
 .content .price{font-size:14px;color:rgb(240,20,20);font-weight:700;}
 .content .oldPrice{text-decoration:line-through;font-size:10px;color:rgb(147,153,159);font-weight:700;}

 .numberCtrl{position:absolute;bottom:0px;right:0px;}
</style>
