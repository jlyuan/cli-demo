<template>
  <transition name="slide">
    <div v-show="showFood" class="food-container" ref="foodContainer">
    <div class="img">
      <img :src="food.image" alt="food pic">
    </div>
      <div class="food-name section">
        <h2>{{food.name}}</h2>
        <p>月售{{food.sellCount}}份&nbsp;&nbsp;好评率{{food.rating}}%</p>
        <div class="money">
          <span class="sell-price">￥24</span>
          <span class="old-price">￥18</span>
        </div>
        <div class="join-cart">
          加入购物车
        </div>
      </div>

      <div class="food-desc section">
        <h2>商品介绍</h2>
        <p>{{food.info}}</p>
      </div>
      <div class="food-rating section">
        <h2>商品评价</h2>
        <ul class="rating-tab">
          <li :class="['all',curRatingType === 2?'active':0 ]" @click="curRatingType=2">全部{{Array.isArray(food.ratings)?food.ratings.length:0}}</li>
          <li :class="['positive', curRatingType === 0?'active':0 ]" @click="curRatingType=0">推荐{{Array.isArray(positiveRatings)?positiveRatings.length:0}}</li>
          <li :class="['negative',curRatingType === 1?'active':0 ]" @click="curRatingType=1">吐槽{{Array.isArray(negativeRatings)?negativeRatings.length:0}}</li>
        </ul>
        <ul>
          <li v-for="(item,index) in showRatings" class="rating-item">
            <div class="title">
              <span class="time">{{item.rateTime|formatDate}}</span>
              <div class="user">
                <span class="userName">{{item.username}}</span>
                <img :src="item.avatar" alt="avatar" class="avatar">
              </div>

            </div>
            <div>
              <span :class="['type', item.rateType ===0 ?'icon-thumb_up':'icon-thumb_down']"></span>
              <span class="txt">{{item.text}}</span>
            </div>

          </li>
        </ul>
      </div>
      <div class="back" @click="_back">&lt;返回</div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "food",
      props:['food'],
      data:function(){
          return {
            showFood:false,
            curRatingType:2,
            positiveRatings:[],//推荐评论
            negativeRatings:[],//吐槽评论
          }
      },
      created:function(){

      },
      activated:function(){

      },
      methods:{
        show(){
          this.showFood=true;
        },
        _back(){
          console.log(this.food.ratings);
          this.showFood=false;
        },
        //归类评论
        _handleRatings(){
          if(!Array.isArray(this.food.ratings)){
            return 0;
          }
          for(let item of this.food.ratings){
            if(item.rateType === 0){
              this.positiveRatings.push(item);
            }else{
              this.negativeRatings.push(item);
            }
          }
        }
      },
      computed:{
        showRatings:function(){
          if(this.curRatingType === 2){
            this._handleRatings();
            return this.food.ratings;
          }else if(this.curRatingType === 0){
            return this.positiveRatings;
          }else{
            return this.negativeRatings;
          }
        }
      }
    }
</script>

<style scoped>
  .slide-enter,.slide-leave-to{
    transform:translateX(100%);
  }
  .slide-enter-active,.slide-leave-to{
    transition:all 0.5s ease;
  }

  .food-container{position:fixed;left:0;top:0px;bottom:49px;
    right:0;z-index:991;background:#f3f5f7;overflow-y:scroll;
  }
  .back{font-size:14px;color:#ccc;padding:8px;
    position:fixed;top:2px;left:4px;
  }
  .img img{height:375px;width:100%;}
  .section{margin-bottom:16px;padding:18px;background:#fff;
    border-bottom:1px solid rgba(7,17,27,0.1);}
  .section h2{font-size:14px;font-weight:700;color:rgb(7,17,27);
    line-height:14px;margin-bottom:8px;
  }
  .food-name{position:relative;}
  .food-name p{
    font-size:10px;color:rgb(147,153,159);line-height:10px;margin-bottom:18px;
  }
  .food-name .sell-price{
    display:inline-block;font-size:14px;color:rgb(240,20,20);
    line-height:24px;
  }
  .food-name .old-price{
    display:inline-block;color:rgb(147,153,159);text-decoration: line-through;
    font-size:10px;
  }
  .join-cart{
    position:absolute;bottom:18px;right:18px;text-align:center;
    width:74px;height:24px;font-size:12px;line-height:24px;
    color:#fff;border-radius:6px;background:rgb(0,160,220);
  }
  .food-desc p{
    font-size:12px;line-height:24px;font-weight:200;color:rgb(77,85,93);
  }
  .rating-tab li{width:60px;height:16px;padding: 8px 0;
    text-align:center;margin-right:8px;font-size:14px;
    color:rgb(77,85,93);background:rgba(0,16,220,0.2);display:inline-block;
  }
  .rating-tab li.active{
    color:#fff;background:rgb(0,16,220);
  }
  .rating-item {border-bottom:1px solid #ccc;padding: 16px 0;}
  .rating-item .title{display:flex;justify-content:space-between;margin-bottom:6px;}
  .rating-item .time{font-size:10px; color:rgb(147,153,159);line-height:12px;}
  .userName{font-size:10px;line-height:12px;color:rgb(147,153,159);}
  .avatar{width:12px;height:12px;border-radius:50%;}
  .type{font-size:12px;margin-right:4px;}
  .icon-thumb_up{color:rgb(0,160,220);}
  .txt{font-size:12px;color:rgb(7,17,27);line-height:16px;}

</style>
