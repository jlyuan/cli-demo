<template>
    <div class="header-container">
      <div class="up">
        <img :src="seller.avatar" alt="头像" class="avatar">
        <div class="info">
          <h2 class="title">{{seller.name}}</h2>
          <p class="des">{{ seller.description}}/{{seller.deliveryTime}}分钟内送达</p>
          <div class="discount">
            <img src="../../../static/images/decrease_1@2x.png" class="type"/>
            <span class="desc">在线支付满28减5</span>
            <div class="num"> <span>5个</span> <span class="icon-keyboard_arrow_right"></span></div>
          </div>
        </div>
      </div>
      <div class="notice" @click.stop="showDetail=true">
        <img src="../../../static/images/notice_03.png" class="notice-pic"></img>
        <p>{{seller.bulletin}}</p>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
      <transition name="fade">
        <div class="notice-detail" v-show="showDetail">
          <div class="wrap">
            <div class="wrap-main">
              <h2 class="name">{{seller.name}}</h2>
              <div class="star-cmt">
                <star :score="score"></star>
              </div>
              <div class="tit-item">
                <div class="line"></div>
                <div class="tit-name">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="dis-info">
                <li v-for="(item,key) in seller.supports" :key="key">{{item.description}} </li>
              </ul>
              <div class="tit-item">
                <div class="line"></div>
                <div class="tit-name">商家公告</div>
                <div class="line"></div>
              </div>
              <p class="pub">
                {{seller.bulletin}}
              </p>
            </div>
          </div>
          <div class="close">
            <span class="icon-close"  @click.stop="showDetail=false"></span>
          </div>
        </div>
      </transition>

    </div>
</template>

<script>
  import star from '../sub/Star.vue'
    export default {
        name: "Header",
        props:['seller'],
      data:function(){
          return{
            showDetail:false,
            score:'80%',
          }
      },
      components:{
          star,
      }
    }
</script>

<style scoped>
  .header-container{color:#fff;background:rgba(7,17,27,0.5);z-index:1;}
  .up{ padding:24px 12px 18px 24px;display:flex;}
  .avatar{width:64px;height:64px;margin-right:16px;}
  .title{text-indent:36px;line-height:18px;font-size:16px;font-weight:bold;
    background:url("../../../static/images/brand@2x.png") no-repeat;
    background-size:30px 18px;margin-bottom:8px;
  }
  .info{width:100%;}
  .des{font-weight:200;line-height:12px;font-size:12px;margin-bottom:2px;}
  .discount{position:relative;width:100%;height:25px;}
  .discount img{position:absolute;left:0;top:8px;width:12px;height:12px;}
  .discount .desc{position:absolute;left:16px;top:8px;font-size:10px;font-weight:200;line-height:12px;}
  .num {position:absolute;right:0;width:43px;height:25px;border-radius:12px;background:rgba(0,0,0,0.2)}
  .num span:first-child{margin-left:8px;line-height:12px;}
  .num span:last-child{margin-left:2px;width:10px;}
  .num span{float:left;font-size:10px;margin-top:7px;height:10px;}
  .notice{padding: 0 12px;background:rgba(7,17,27,0.2);
    height:28px;display:flex;align-items:center;}
  .notice img{width:22px;height:12px;margin-right:4px;}
  .notice p{font-size:10px;line-height:12px;width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
  .notice span{}
/*公告详情*/
  .notice-detail{
    position:absolute;
    left:0;top:0;
    width:100%;height:100%;
    background:rgba(7,17,27,1);
    overflow-x: hidden;
    z-index:999;

  }
  .fade-enter,.fade-leave-to{
    background:rgba(7,17,27,0.1);
  }
  .fade-enter-active,.fade-leave-to{
    transition:all 0.4s ease;
  }
  .wrap{min-height:100%;overflow:hidden; padding: 0 36px;}
  .wrap-main{margin-top:64px;padding-bottom:32px;
  }
  .notice-detail .name{font-size:16px;
    font-weight:700;line-height:16px;text-align:center;
  }
  .close{ position: relative;margin-top:-32px;text-align:center;}
  .icon-close{font-size:32px;color:red;}
  .star-cmt{font-size:12px;display:flex;justify-content:center;height:24px;margin: 16px 0 28px 0;}
  .tit-item{display:flex;margin-bottom:24px;}
  .tit-item .line{flex:1;height:0;border-top: 1px solid rgba(255,255,255,0.2);}
  .tit-item .tit-name{font-size:14px;margin: -7px 12px 0 12px;}
  .notice-detail .pub{padding: 0 12px;font-size:12px;font-weight:200;line-height:24px;}
  .dis-info li{text-indent:12px;line-height:12px;font-size:12px;
  font-weight:200;margin-bottom:12px;
  }
  .dis-info{margin-bottom:28px;}
</style>
