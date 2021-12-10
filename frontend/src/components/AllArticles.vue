<template>
   <div class ="all_articles">
      <div class="titre">
         <h1>Bienvenue {{userFirstname}}!</h1>
      </div> 
      <CreateArticle v-on:articleCree="loadArticles()"></CreateArticle>
      <div class="container mt-5">
         <h1>Tous les Articles Publiés</h1>
         <div class="articles_frame">
            <div class="article" v-bind:key = "article" v-for= "article in articlesArray"> 

               <div class ="article_avatar">
                  <div>
                     <router-link v-bind:to ="`/accounts/${article.User.id}`">
                        <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="article.User.imageUrl" alt="">
                     </router-link>
                  </div>

                  <div>
                     <router-link v-bind:to ="`/accounts/${article.User.id}`"> 
                        <p class= "name">{{article.User.firstname}} {{article.User.lastname}}</p>
                        <p class="date">le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}</p>
                     </router-link>
                  </div>
               </div>
              
               <p>{{article.content}}</p>
               <img class="image_article" v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
               
               <div v-if ="article.userId == userId">
                  <button class="btn-success rounded" v-on:click="setIdArticleToUpdate(article.id)">Modifier</button>
                  <br><br>
                  <br>
               </div>

               <div v-if="idArticleUpdate == article.id"> 
                  <textarea class= "form-control mb-2" v-model= "updatearticle.content" id="content"  rows="3" placeholder= "Modifier votre contenu..."></textarea>
                  <button class="btn-success rounded" v-on:click="modifyArticle(article.id)">Valider</button>
                  <input class="btn-danger ms-2 rounded" type="submit" value="Annuler" v-on:click="setIdArticleToUpdate(null)">
               </div>

               <div v-else-if="userAdmin == 'true'">
                  <button class="btn-danger ms-2 rounded" v-on:click="deleteArticle(article.id)">Supprimer</button>
                  <br>
               </div>

               <div v-else-if ="article.userId == userId">
                  <button class="btn-danger ms-2 rounded" v-on:click="deleteArticle(article.id)">Supprimer</button>
                  <br>
               </div>
                 <!--{{article.userId}}{{userId}}-->
               <br>
            
               <a v-on:click="setToUpdate(article.id)">Commentaires</a>
               <br>
                 <!--{{idArticleStorage}}-->
               <div v-if="idArticleStorage == article.id">
                  <OneArticle 
                   v-bind:idArticleTransfert = idArticleStorage 
                  ></OneArticle>
               </div>
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

            updatearticle : {
               //token : localStorage.getItem('token'),
               //userId: localStorage.getItem('Id'),
               content : '',  
            },

            userId: localStorage.getItem('Id'),
            
            userAdmin: localStorage.getItem('Admin'),

            userFirstname: localStorage.getItem('Firstname'),

            userLastname: localStorage.getItem('Lastname'),

            errorArticle : false,

            idArticleUpdate: null,

            idArticleStorage : null 

            /*article : {
               token : localStorage.getItem('token'),
               userId: localStorage.getItem('Id'),
               title : '',
               content : '',
               imageUrl : ''
            },*/
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
            this.clearData();
            this.idArticleUpdate = null
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

         setIdArticleToUpdate(article_id){
         this.idArticleUpdate = article_id
         },

         setToUpdate(article_id){
         this.idArticleStorage = article_id
         },

         clearData() {
            this.updatearticle.content = '';
           
         },
      },
   }
</script>


<style scoped>
   .all_articles{
      background-color: #dfe3ee;
   }

   .titre {
    margin-top : 180px;
   }
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
      padding: 20px;
      overflow: hidden;
      margin-bottom: 50px;
      border-radius: 20px;
      background-color: white;
   }

   .article_avatar{
      display : flex; 
      align-items: center;
      justify-content: center;
   }

   .name {
      font-weight : bold;   
   }

   

    .date {
      color: gray;
   }

 
   .article_avatar a:hover, .ok:hover {
      color: orangered;
      cursor: pointer;  
    }

   .form-control {
      width: 65%;
      margin-left : auto;
      margin-right : auto; 
      background-color: #dfe3ee;
      border-radius: 15px;
   }

   .iconUser.rounded-circle.mb-2.me-2 {
      border: solid 1px gray;
      height: 100px;
      width: 100px;
   }

   p {
      color: black;
      margin :0;
   }

   a {
   text-decoration: none;
   }

   .image_article {
      width: 800px;
      height : 500px;
      object-fit: contain;
      margin: 20px 0px 20px 0px;
   }

   .container.mt-5{
      padding-bottom: 100px;
   }
</style>