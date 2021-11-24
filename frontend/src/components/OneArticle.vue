<template>
<div class="container mt-5">
    <h1>Votre Article</h1>

   <div class="article_frame">
          
            <div class="article" v-bind:key = "article" v-for= "article in articlesArray"> 
              <h2>{{article.title}}</h2>
              <p>{{article.content}}</p>
              <p>Publié par : {{article.userId}}</p>
           </div> 

        </div>
</div>  
</template>


<script>
import axios from 'axios'

export default {
    name :'OneArticles',
    data : function () {
      return {
          articlesArray : null
      } 
    },

    methods : {   
    },

    components : {  
    },

    mounted(){
     axios.get ("http://localhost:3000/api/articles/")
     .then(articles => {
        console.log(articles);
        this.articlesArray = articles.data
        })
   }   
}
</script>


<style>
  h1,h2 {
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
 }
</style>