<template>
<div class="container mt-5">
    <h1>Tous les Articles Publiés</h1>


<button class ="article_publish" >Publier un article</button>


   <div class="article_frame">
            <!--<li v-bind:key = "index" v-for="(article,index) in articlesArray"> 
              <div v-bind:key = "index" v-for= "(value, index) in article">{{value}}</div>
           </li>--> 
                 
            <div class="article" v-bind:key = "article" v-for= "article in articlesArray"> 
               <router-link v-bind:to ="`/OneArticle/${article.id}`">
              <h2>{{article.title}}</h2>
              <p>{{article.content}}</p>
              <p>Publié par : {{article.User.firstname}} {{article.User.lastname}}</p>
               </router-link>
           </div>  
                

        </div>
</div>  
</template>


<script>
import axios from 'axios'

export default {
    name :'AllArticles',
    data : function () {
      return {
          articlesArray : []
      } 
    },

    methods : {   
    },

    components : {  
    },

    created(){
     axios.get ("http://localhost:3000/api/articles/")
     .then(articles => {
        console.log(articles);
        //this fait référence au tableau vide dans data
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

 p{
    color: black;
 }

 a {
 text-decoration: none;
 }

</style>