<template>
<div class="article_frame">
    <h1>{{oneArticleArray.title}} </h1>
    <p>{{oneArticleArray.content}}</p>
   <p>Publié par : {{oneArticleArray}}</p>
</div>  
</template>


<script>

import axios from 'axios'

export default {
    name :'OneArticles',
    data : function () {
      return {
          id: this.$route.params.id,
          oneArticleArray : []
      } 
    },
    
    mounted(){
     axios.get (`http://localhost:3000/api/articles/${this.id}`)
     .then(response => {
        console.log(response);
        this.oneArticleArray = response.data
        })
   }   

    
}
</script>


<style>
  /*h1,h2 {
    text-align: center;
    margin: 20px 0px 20px 0px;
    color: orangered;
    padding: 20px;
 }

 .article_publish {
    display: block;
    margin: auto;
    margin-bottom: 20px;
 }

 .article_frame {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
 }

 .article {
    border : solid 2px #f3e9f1;
    height: 200px;
    overflow: hidden;
    margin-bottom: 50px;
 }*/
</style>