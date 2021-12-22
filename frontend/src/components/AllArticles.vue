<template>
   <div v-if="userToken" class ="all_articles">
      <h1>Bienvenue {{userFirstname}}!</h1> 

      <CreateArticle v-on:articleCree="loadArticles()"></CreateArticle>

      <div class="container mt-5">
         <h1>Tous les Articles Publiés</h1>

         <div class="articles_frame">
            <div class="article" v-bind:key = "article" v-for= "article in articlesArray"> 
               <div class ="article_avatar">
                  <div v-if="userAdmin == 'true'">
                     <router-link v-bind:to ="`/accounts/${article.User.id}`">
                        <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="article.User.imageUrl" v-bind:alt="article.User.firstname">
                     </router-link>
                  </div>
                  <div v-else>
                        <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="article.User.imageUrl" v-bind:alt="article.User.firstname">
                  </div>

                  <div v-if="userAdmin == 'true'">
                     <router-link v-bind:to ="`/accounts/${article.User.id}`"> 
                        <p class= "name" :style="{cursor: 'pointer'}">{{article.User.firstname}} {{article.User.lastname}}</p>
                        <p class= "date">le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}</p>
                     </router-link>
                  </div>
                  <div v-else>
                        <p class= "name">{{article.User.firstname}} {{article.User.lastname}}</p>
                        <p class= "date">le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}</p>
                  </div>
               </div>
              
               <p class="article_content">{{article.content}}</p>
               
               <img class="image_article" v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="image article">
               
               <div v-if ="article.userId == userId">
                  <button class="btn-success rounded" v-on:click="setIdArticleToUpdate(article.id)">Modifier</button>
                  <br><br>
                  <br>
               </div>

               <div v-if="idArticleUpdate == article.id"> 
                  <textarea class= "form-control mb-2" v-model= "updatearticle.content" id="content"  rows="3" placeholder= "Modifier votre contenu..."></textarea>
                  <input class="form-control-file" aria-label="envoi image" @change="onSelect" accept="image/*" type="file"  id="image">
                  <br>
                  <img class = "picture" v-if="picturePreview" :src="picturePreview"/>
               
                  <p v-if="errorUpdateArticle" class="mt-2 text-danger"> Veuillez modifier le contenu ou l'image</p>
                  <br><br>
                  <button class="btn-success rounded" v-on:click="modifyArticle(article.id)">Valider</button>
                  <input class="btn-danger ms-2 rounded" type="submit" value="Annuler" v-on:click="setIdArticleToUpdate(null), clearData()">
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
            
               <a class="comments" v-on:click="setToUpdate(article.id)">Commenter</a>
               <br>
                 
               <div v-if="idArticleStorage == article.id">
                  <CreateComment v-bind:idArticleTransfert = idArticleStorage ></CreateComment>
               </div>
            </div>      
         </div>   
      </div> 
      
      <div id="pagetop" v-show="scY > 300" v-on:click="toTop">
         <a class="bloc-button btn btn-d scrollToTop showScrollTop"><span class="fa fa-chevron-up"></span></a>
      </div>   
   </div>
  
   <div class ="no-connect" v-else>
      <h1>Accès non autorisé</h1>
      <p >Veuillez vous <router-link class="createAccount" v-bind:to="`/`">connecter</router-link> ou vous <router-link class="createAccount" v-bind:to="`/signup`">inscrire</router-link></p>
   </div>
</template>


<script>
   import axios from 'axios'
   import CreateArticle from "./CreateArticle.vue"
   import CreateComment from "./CreateComment.vue"

   export default {
      name: 'AllArticles',

      components: {
         CreateArticle,
         CreateComment
      },

      data : function () {
         return {
            articlesArray : [],

            updatearticle : {
               content : '',  
               imageUrl : ''
            },
            
            userToken: localStorage.getItem('token'),
            userId: localStorage.getItem('Id'),
            userAdmin: localStorage.getItem('Admin'),
            userFirstname: localStorage.getItem('Firstname'),
            userLastname: localStorage.getItem('Lastname'),

            picturePreview : "",

            idArticleUpdate: null,

            idArticleStorage : null,

            errorUpdateArticle : false,

            scTimer: 0,
            scY: 0,
         } 
      },

      mounted() {
      window.addEventListener('scroll', this.handleScroll);
      },

      created(){
      this.loadArticles ()
      },  

      methods : { 
         loadArticles () {
            axios.get ("http://localhost:3000/api/articles/", {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(articles => {
               console.log(articles);
               this.articlesArray = articles.data
            })
         },

         modifyArticle(id) {
            if (this.updatearticle.content == '' && this.updatearticle.imageUrl == '') {
               this.errorUpdateArticle = true
               return
            }

            else {
               if (this.updatearticle.imageUrl == '') {
                  const formData = new FormData()
                  formData.append('content', this.updatearticle.content);

                  axios.put("http://localhost:3000/api/articles/"+id, formData, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                     .then(() => {
                        console.log('article modifié');
                        this.loadArticles();
                        this.clearData();
                        this.idArticleUpdate = null;
                        this.errorUpdateArticle = false;
                     })
                     .catch((error) => {
                        console.log(error.message);
                     })
               }
               else {
                  if (this.updatearticle.content == '') {
                     const formData = new FormData()
                     formData.append('imageUrl', this.updatearticle.imageUrl); 

                     axios.put("http://localhost:3000/api/articles/"+id, formData, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                        .then(() => {
                           console.log('article modifié');
                           this.loadArticles();
                           this.clearData();
                           this.idArticleUpdate = null;
                           this.errorUpdateArticle = false;
                        })
                        .catch((error) => {
                           console.log(error.message);
                        })        
                  }
                  else {
                     const formData = new FormData()
                     formData.append('content', this.updatearticle.content);
                     formData.append('imageUrl', this.updatearticle.imageUrl); 

                     axios.put("http://localhost:3000/api/articles/"+id, formData, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                        .then(() => {
                           console.log('article modifié');
                           this.loadArticles();
                           this.clearData();
                           this.idArticleUpdate = null;
                           this.errorUpdateArticle = false;
                        })
                        .catch((error) => {
                           console.log(error.message);
                        })        
                  }
               }
            }
         },

         setIdArticleToUpdate(article_id){
            this.idArticleUpdate = article_id
         },

         onSelect(event) {
            this.updatearticle.imageUrl = event.target.files[0];    
            this.picturePreview = URL.createObjectURL(this.updatearticle.imageUrl);
         },

         clearData() {
            this.updatearticle.content = '';
            this.updatearticle.imageUrl = '';
            this.picturePreview ='';
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

         setToUpdate(article_id){
            this.idArticleStorage = article_id
         },

         handleScroll() {
            if (this.scTimer) return;
               this.scTimer = setTimeout(() => {
               this.scY = window.scrollY;
               clearTimeout(this.scTimer);
               this.scTimer = 0;
            }, 100);
         },

         toTop () {
            window.scrollTo({
               top: 0,
               behavior: "smooth"
            });
         },
      },
   }
</script>


<style scoped>
   .all_articles{
      background-color: #dfe3ee;
      margin-top : 180px;
   }

   @media screen and (max-width: 640px) {
      .all_articles {
         margin-top : 100px; 
      }
   }

   .bloc-button.btn.btn-d.scrollToTop.showScrollTop {
     margin-bottom: 100px; 
   }

   .btn-d, .btn-d:focus, .btn-d:hover {
      background: rgba(0,0,0,.3);
   }

   .scrollToTop{
      width: 40px;
      height: 40px;
      position: fixed;
      bottom: 20px;
      right: 50px;
      opacity: 1;
      z-index: 500;
      transition: all .3s ease-in-out;
   }

   @media screen and (max-width: 640px) {
      .scrollToTop {
         right: 10px; 
      }
   }

   .showScrollTop{
      font-size: 14px;
      opacity: 1;
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

   @media screen and (max-width: 640px) {
      .articles_frame {
          width: 95%; 
      }
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
      margin :0;
   }

   .article_content {
      margin: 20px 0px 20px 0px;
      word-wrap: break-word;
   }

   .date {
      color: #575757;
   }

   .article_avatar a:hover {
      color: orangered;
    }

   .comments:hover {
      color: orangered;
      cursor: pointer;  
    }

    .comments {
      font-size: 25px;
    }

   .form-control {
      width: 65%;
      margin-left : auto;
      margin-right : auto; 
      background-color: #dfe3ee;
      border-radius: 15px;
   }

   .picture {
      width: 400px;
      height : 200px;
      object-fit: contain;
      margin: 20px 0px 20px 0px;
   }

    @media screen and (min-width : 320px) and (max-width : 414px) {
      .picture {
         width: 200px;
      }
   }

     @media screen and (max-width: 640px) {
      .form-control {
         width: 90%; 
      }
   }

   .iconUser.rounded-circle.mb-2.me-2 {
      border: solid 1px gray;
      height: 100px;
      width: 100px;
   }

      @media screen and (max-width: 640px) {
      .iconUser.rounded-circle.mb-2.me-2 {
         height: 50px;
         width: 50px;; 
      }
   }

   .no-connect {
      margin-top : 250px;
   }

   .no-connect a {
      text-decoration: underline;
   }

   .no-connect a:hover {
      color: orangered;
   } 
   
   h1,h2 {
      text-align: center;
      margin: 20px 0px 20px 0px;
      color: orangered;
      padding: 20px;
   }

   p {
      color: black;
   }

   a {
      color: black;
      text-decoration: none;
   }

   .image_article {
      width: 800px;
      height : 500px max-content;
      object-fit: contain;
      margin: 20px 0px 20px 0px;
   }

    @media screen and (min-width : 320px) and (max-width : 375px) {
      .image_article {
         width: 240px;
         height : 160px max-content;
      }
   }

       @media screen and (min-width : 376px) and (max-width : 414px) {
      .image_article {
         width: 300px;
         height : 160px max-content;
      }
   }

     @media screen and (min-width : 415px) and (max-width : 768px) {
      .image_article {
         width: 500px;
         height : 160px max-content;
      }
   }

   .container.mt-5{
      padding-bottom: 100px;
   }
</style>