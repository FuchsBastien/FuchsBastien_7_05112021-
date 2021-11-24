<template>
<div class="article_frame">
    <h1>{{oneArticleArray.title}} </h1>
    <p>{{oneArticleArray.content}}</p>
   <p>Publié par : {{oneArticleArrayUser.firstname}}</p>
  
</div>  
</template>


<script>

import axios from 'axios'

export default {
    name :'OneArticles',
    data : function () {
      return {
          id: this.$route.params.id,
          oneArticleArray : [],
          oneArticleArrayUser : [],
         
      } 
    },
    
    created(){
     axios.get (`http://localhost:3000/api/articles/${this.id}`)
     .then(response => {
        console.log(response);
        this.oneArticleArray = response.data
        this.oneArticleArrayUser = response.data.User
        
        })
   }   

    
}
</script>


<style>
</style>