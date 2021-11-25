<template>
<div class="cont">
   
  <h1>Bienvenue {{userArray.firstname}}!</h1> 

   <div class="account_frame">
         <div class="article">
            <h2>{{userArray.firstname}} {{userArray.lastname}}</h2>     
            <p>{{userArray.bio}}</p>
         </div>
   </div>

   <div class="articles_frame">
      <h2>Vos articles</h2>
      <div class="articles" v-bind:key = "article" v-for= "article in userArrayArticles"> 
               <router-link v-bind:to ="`/OneArticle/${article.id}`">
              <h3>{{article.title}}</h3>
              <p>{{article.content}}</p>
              <p class="date">Le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}
              </p>
               </router-link>
      </div> 
  </div>   
 
</div>  
</template>


<script>
import axios from 'axios'

export default {
    name :'Account',
    data : function () {
      return {
          userArray : [],
          userArrayArticles : []
      } 
    },

    methods : {  

   },

    components : {  
    },


created(){
     axios.get ("http://localhost:3000/api/users/5")
     .then(user => {
        console.log(user);
        this.userArray = user.data
        })

        axios.get ("http://localhost:3000/api/users/5/articles")
     .then(articles => {
        console.log(articles);
        this.userArrayArticles = articles.data
        })
     }   



}
</script>


<style scoped>
  h1 {
    text-align: center;
    margin: 20px 0px 20px 0px;
    color: orangered;
    padding: 20px;
 }

   h2 {
    text-align: center;
    padding-top : 10px;
    margin-bottom : 10px;
  
 }

.account_frame {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    
 }

 .articles_frame {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    background-color: orangered;
 }

 .articles {
    border : solid 2px #f3e9f1;
    height: 150px;
    width: 95%;
    background-color: white;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    padding: 10px;
    
 }

 p {
    color: black;
 } 

a {
    text-decoration: none;  
 }
</style>