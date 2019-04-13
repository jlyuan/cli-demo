<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings"  class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from "@/components/header/Header.vue"
export default {
  name: 'App',
  components:{
    "v-header":header,
  },
  data:function(){
    return{
        seller:{}
    }
  },
  created:function(){
		this.getInfo();

	 },
	 methods:{

		getInfo:function(){ // get 方式获取数据
			 this.$http.get('/api/seller').then(res =>{
				 this.seller=res.body.data;
			 },err=>{
			   console.log(err);
       });
			 console.log("http://127.0.0.1:8080/api/seller");
		 }
		 }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .tab{width:100%;height:40px;line-height:40px;
  display:flex;
  }
  .tab-item{flex:1;text-align:center;font-size:14px;}
  .router-link-active{color:rgb(240,20,20);}
</style>
