<template>
   <div>
      <CreateArticle v-on:articleCree="loadArticles()"></CreateArticle>
      <div class="container mt-5">
         <h1>Tous les Articles Publiés</h1>
         <div class="articles_frame">
            <div class="article" v-bind:key = "article" v-for= "article in articlesArray"> 
               <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="article.User.imageUrl" alt="">
               <p>{{article.User.firstname}} {{article.User.lastname}}</p>
               <h2>{{article.title}}</h2>
               <p>{{article.content}}</p>
               <img class="image_article" v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
               <p class="date">Le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}</p>
               
               <div v-if="article.userId == userId">
                  <input class= "form-control mb-2" v-model= "updatearticle.title" type="text" id="title">  
                  <textarea class= "form-control mb-2" v-model= "updatearticle.content" id="content"  rows="3"></textarea>
                  <button class="btn-success rounded" v-on:click="modifyArticle(article.id)">Modifier</button>
                  <br>
                  <br>
                  <button class="btn-danger ms-2 rounded" v-on:click="deleteArticle(article.id)">Supprimer</button>
                  <br>
               </div>

                 <!--{{article.userId}}{{userId}}-->
               <br>

               <router-link v-bind:to ="`/articles/${article.id}`">Commentaires</router-link>
               <OneArticle></OneArticle>
              
            </div>      
         </div>
      </div>    
   </div>
</template>


<script>
   import axios from 'axios'
   import CreateArticle from "./CreateArticle.vue"
   import OneArticle from "./OneArticle.vue"

   export default {
      name: 'AllArticles',

      components: {
         CreateArticle,
         OneArticle
      },

      data : function () {
         return {
            articlesArray : [],

            /*article : {
               token : localStorage.getItem('token'),
               userId: localStorage.getItem('Id'),
               title : '',
               content : '',
               imageUrl : ''
            },*/

             updatearticle : {
               token : localStorage.getItem('token'),
               userId: localStorage.getItem('Id'),
               title : '',
               content : '',  
            },

            userId: localStorage.getItem('Id'),


            errorArticle : false,
            idArticleUpdate: null,

            /*user : {
               Id: localStorage.getItem('Id'),
               userPrenom: localStorage.getItem('userPrenom'),
               userNom: localStorage.getItem('userNom'),
               userPhoto: localStorage.getItem('userPhoto'),
            }*/     
         } 
      },

      created(){
      this.loadArticles ()
      },  

      methods : { 
         loadArticles () {
         axios.get ("http://localhost:3000/api/articles/", {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
         .then(articles => {
            console.log(articles);
            //this fait référence au tableau vide dans data
            this.articlesArray = articles.data
         })
         },

         modifyArticle(id) {
         axios.put("http://localhost:3000/api/articles/"+id, this.updatearticle, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
         .then(() => {
            console.log('article modifié');
            this.loadArticles();
           // this.idArticleUpdate = null
             })
         .catch((error) => {
            console.log(error.message);
         })
         },

         deleteArticle(id) {
         axios.delete("http://localhost:3000/api/articles/"+id, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
         .then(() => {
            console.log('article supprimé!');
            this.articlesArray.splice(1)
            this.loadArticles();
         })
         .catch((error) => {
            console.log(error.message);
         })
         },

         com () {
          <OneArticle></OneArticle>
       },
          setIdArticleToUpdate(article_id){
            this.idArticleUpdate = article_id
        }
      },
   }
</script>


<style scoped>
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

   .articles_frame {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
   }

   .article {
      border : solid 2px #f3e9f1;
      overflow: hidden;
      margin-bottom: 50px;
      border-radius: 20px;
   }

   .iconUser.rounded-circle.mb-2.me-2 {
      border: solid 1px gray;
      height: 100px;
      width: 100px;
   }

   p {
      color: black;
   }

   a {
   text-decoration: none;
   }

   .date {
      color: gray;
   }

   .image_article {
      width: 500px;
      height : 500px;
   }
</style>