<template>
  <div class="star-rating">
    <div class="bottom">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </div>
    <div class="top" :style="{'width':getScore}">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Star",
      props:["score"],
      computed:{
          getScore:function(){
            if(this.score>1){
              return this.score*20 + '%'
            }else{
              return this.score;
            }

          }
      }
    }
</script>

<style scoped>
  .star-rating{position:relative;display:inline-block;}
  .star-rating .bottom{display:inline-block;}
  .star-rating span{padding:0 2px;font-size:20px;color:rgb(212,214,217)}
  .star-rating .top{position:absolute;left:0;top:0;overflow:hidden;
    white-space: nowrap;
  }
  .star-rating .top span{color:rgb(255,135,0);}
</style>
