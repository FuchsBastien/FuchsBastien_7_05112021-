<template>
<!--on rajoute la classe container pour le CSS avec bootstrap-->
<div class="container mt-5">
    <h1>Tous les Articles Publiés</h1>


<button class ="article_publish" >Publier un article</button>


   <div class="article_frame">
            <!--<li v-bind:key = "index" v-for="(article,index) in articlesArray"> 
              <div v-bind:key = "index" v-for= "(value, index) in article">{{value}}</div>
           </li>-->    
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
    //pas de name: cela fonctionne quand même
    name :'Articles',
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
    height: 175px;
    overflow: hidden;
    margin-bottom: 50px;
 }
</style>