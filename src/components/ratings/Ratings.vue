<template>
  <div class="rating-container">
    <div class="rating-top section">
      <div class="left">
        <div class="score">{{seller.score}}</div>
        <h3>综合评分</h3>
        <p>高于周边商家{{seller.rankRate}}%</p>
      </div>
      <div class="right">
        <div class="service">
          <span>服务态度</span>
          <star :score="seller.serviceScore"></star>
        </div>
        <div class="service">
          <span>服务态度</span>
          <star :score="seller.serviceScore"></star>
        </div>
        <div class="service">
          <span>送达时间</span>
           <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <div class="ratings-type section">
      <ul class="rating-tab">
        <li :class="['all',curRatingType === 2?'active':0 ]" @click="curRatingType=2">全部 {{ratings.length}}</li>
        <li :class="['positive', curRatingType === 0?'active':0 ]" @click="curRatingType=0">满意{{positiveRatings.length}}</li>
        <li :class="['negative',curRatingType === 1?'active':0 ]" @click="curRatingType=1">不满意{{negativeRatings.length}}</li>
      </ul>

    </div>
    <div class="ratings-detail section">
      <ul>
        <li v-for="(item,index) in showRatings" class="rating-item">
          <div class="top">
            <img :src="item.avatar" alt="avatar" class="img">
            <div class="mid">
              <div class="name">{{item.username}}</div>
              <div class="ser"><star :score="item.score"></star><span class="deliveryTime">{{item.deliveryTime}}分钟送达</span> </div>
            </div>
            <div class="rateTime">{{item.rateTime|formatDate}}</div>
          </div>
          <div class="txt">
            {{item.text}}
          </div>
          <div class="type">
            <span :class="['type', item.rateType ===0 ?'icon-thumb_up':'icon-thumb_down']"></span>
            <ul>
              <li v-for="(rec,i) in item.recommend" :key="i">
                {{rec}}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></cart>
  </div>
</template>

<script>
  import star from '../sub/Star.vue'
  import cart from '../cart/ShopCart.vue'
  export default {
    data() {
      return {
        curRatingType:2,
        ratings:[],//所有评论
        positiveRatings:[],//满意评论
        negativeRatings:[],//不满意评论
      };
    },
    props:['seller'],
    created:function(){
      this.getRatings();
    },
    computed: {
      showRatings:function(){
        if(this.curRatingType === 2){
          this._handleRatings();
          return this.ratings;
        }else if(this.curRatingType === 0){
          return this.positiveRatings;
        }else{
          return this.negativeRatings;
        }
      }
    },
    methods: {
      getRatings:function(){ // get 方式获取数据
        this.$http.get('/api/ratings').then(res =>{
          this.ratings=res.body.data;
        },err=>{
          console.log(err);
        });
        console.log("http://127.0.0.1:8080/api/ratings");
      },
      //归类评论
      _handleRatings(){
        if(!Array.isArray(this.ratings)){
          return 0;
        }
        for(let item of this.ratings){
          if(item.rateType === 0){
            this.positiveRatings.push(item);
          }else{
            this.negativeRatings.push(item);
          }
        }
      }
    },components:{
      star,
      cart,
    }
  };
</script>

<style scoped>
  .section{background:#fff; padding:18px; border-top:1px solid #ccc;}
  .rating-container{background:#f3f5f7;overflow-y:scroll;z-index:1;
    position:absolute;top:175px;bottom:49px;width:100%;}
  .rating-top{display:flex;
    border-bottom:1px solid #ccc;
    justify-content:center;
  }
  .left{flex:3;padding-right:5px;position:relative;}
  .left:after{
    content:'';
    height:100%;
    position:absolute;
    top:0;right:0;
    border-right:1px solid #ccc;
    transform:scaleX(0.5);
  }
  .left .score{font-size:24px;color:rgb(255,153,0);
    line-height:28px;margin-bottom:6px;text-align:center;
  }
  .left h3{font-size:12px;line-height:12px;
    color:rgb(7,17,27);margin-bottom:8px;text-align:center;
  }
  .left p{line-height:10px;font-size:10px;color:rgb(147,153,159);text-align:center;}
  .right{flex:7;padding-left:12px;}
  .service{margin-bottom:8px;line-height:18px;}
  .service span{font-size:12px;color:rgb(7,17,27);
    margin-right:12px;
  }
  .service .time{font-size:12px;color:rgb(147,153,159);}
  /*评价详情*/
  .ratings-type{margin-top:18px;}

  .rating-tab li{width:66px;height:16px;padding: 8px 0;
    text-align:center;margin-right:8px;font-size:14px;
    color:rgb(77,85,93);background:rgba(0,16,220,0.2);display:inline-block;
  }
  .rating-tab li.active{
    color:#fff;background:rgb(0,16,220);
  }
  .icon-thumb_up{color:rgb(0,160,220);}
  .rating-item{  border-bottom:1px solid #ccc;padding:9px 0;}
  .rating-item .top{display:flex;}
  .img{width:28px;height:28px;
      border-radius:14px;margin-right:12px;
  }
  .top .mid{flex:1}
  .rating-item .name{font-size:10px;line-height:12px;}
  .ser .deliveryTime{font-size:10px;color:rgb(147,153,159);
    font-weight:200;line-height:12px;
  }
  .rateTime{font-size:10px;color:rgb(147,153,159);margin-right:0;}
  .txt{padding-left:28px;margin: 6px 0 8px 0;
    line-height:18px;font-size:12px;
  }
  .rating-item .type{padding-left:14px;display:flex;}
  .type ul{margin-left:8px;}
  .type li{display:inline-block;border:1px solid #ccc;padding:2px 6px;
    margin-right:8px;width:50px;white-space:nowrap;
    overflow:hidden; text-overflow:ellipsis;font-size:9px;color:rgb(147,153,159);
  }

</style>
