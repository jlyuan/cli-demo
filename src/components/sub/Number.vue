<template>
  <div class="numberCtrl">
    <span v-if="getfoodCartCount >0" @click="_subFromCart(food.foodId)" class="sub icon-remove_circle_outline"></span>
    <span v-if="getfoodCartCount >0" class="num">{{ getfoodCartCount}}</span>
    <span class="add icon-add_circle" @click="_addToCart(food.foodId)"></span>
  </div>

</template>

<script>
    export default {
        name: "Number",
      data:function(){
          return{
            count:0,
          }
      },
      props:['food'],
      computed:{
          //获取商品在购物车的数量
        getfoodCartCount:function(){
          let res = this.$store.state.carts.find(item=>{
            if(item.foodId === this.food.foodId){
              return item.count;
            }
          });
          if(!res){
            return 0;
          }else{
            return res.count
          }
        }
      },
      methods:{
        //add food to cart
        _addToCart(id){
          let obj = {
            foodId:id,
            name:this.food.name,
            price:this.food.price,
            count:1
          };
          this.$store.commit('addToCart',obj);
        },
        _subFromCart(id){
          this.$store.commit('subFromCart',id);
        }
      },
    }
</script>

<style scoped>
  .numberCtrl>span{line-height:24px;}
.sub,.add{color:rgb(0,160,220);font-size:24px;padding:6px;}
  .num{width:24px;font-size:12px;color:rgb(147,153,159);position:relative;top:-6px;}
</style>
