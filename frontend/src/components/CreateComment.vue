<template>
   <div class ="article_detail">
      <div class="post_comment">
         <img class="iconUser rounded-circle mb-2 me-2" width="50" v-bind:src="userImageUrl" alt="">
         <input class= "form-control" v-model= "comment.content" @keyup.enter="postComment()" type="text" id="content" placeholder="Ecrivez un commentaire...">
         <br>
         <!--{{comment}}-->
      </div>
      <p v-if="errorComment" class="mt-2 text-danger">Veuillez ajouter un contenu</p>

      <div class="comment" v-bind:key = "comments" v-for= "comments in commentsArray">
         <div class="comment_avatar">
            <router-link v-bind:to ="`/accounts/${comments.User.id}`"> 
               <img class="iconUser rounded-circle mb-2 me-2" width="50" v-bind:src="comments.User.imageUrl" alt="">
            </router-link>
         </div>

         <div class = "comment_content">
            <div class="comment_bulle">
               <router-link v-bind:to ="`/accounts/${comments.User.id}`"> 
                  <p class="comment_user">{{comments.User.firstname}} {{comments.User.lastname}}</p>
               </router-link>
            
               <p>{{comments.content}}</p>
            </div>
            
            <p class="comment_date">le {{comments.createdAt [8]}}{{comments.createdAt [9]}}-{{comments.createdAt [5]}}{{comments.createdAt [6]}}-{{comments.createdAt [0]}}{{comments.createdAt [1]}}{{comments.createdAt [2]}}{{comments.createdAt [3]}} </p>

            <div class="comment_button" v-if="userAdmin == 'true'">
               <button class="btn-danger ms-2 rounded" v-on:click="deleteComment(comments.id)">Supprimer</button>
            </div>

            <div class="comment_button" v-else-if="comments.userId == userId" >
               <button class="btn-danger ms-2 rounded" v-on:click="deleteComment(comments.id)">Supprimer</button>
            </div>
         </div>    
         <!--{{comments.id}}-->
      </div>   
   </div>  
</template>


<script>
   import axios from 'axios'

   export default {
      name :'CreateComment',

      data : function () {
         return {
            commentsArray : [],

            comment : {
               articleId : this.idArticleTransfert,
               userId: localStorage.getItem('Id'),
               content : ''
            },
            
            Id: localStorage.getItem('Id'),
            userId: localStorage.getItem('Id'),
            userAdmin: localStorage.getItem('Admin'),
            userImageUrl: localStorage.getItem('ImageUrl'),

            articleId : this.idArticleTransfert,

            errorComment: false,
         } 
      },

      props: ['idArticleTransfert'],

      created(){
         this.loadComments();
      },  

      methods : { 
         loadComments () { 
            axios.get (`http://localhost:3000/api/articles/${this.articleId}/comments`, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
               .then(response => {
                  console.log(response);
                  this.commentsArray = response.data
            })
         },

         postComment () {  
            if (this.comment.content == '' || this.comment.content == '') {
               this.errorComment = true
               return
            } 
            else {
            axios.post ("http://localhost:3000/api/comments/",this.comment, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
               .then(()=>{
                  console.log('réussite!!');
                  this.loadComments();
                  this.clearData();
                  this.errorComment = false
               })
               .catch((err)=>{
                  console.log(err.response.data);
                  window.alert(err.response.data);
                  this.errorComment = false
               });
            }
         },

         clearData() {
            this.comment.content = '';
         },

         deleteComment(id) {
            axios.delete("http://localhost:3000/api/comments/"+id, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(() => {
               console.log('commentaire supprimé!');
               this.commentsArray.splice(1)
               this.loadComments();
            })
            .catch((error) => {
               console.log(error.message);
            })
         },

      },
   }
</script>


<style scoped>
   .article_detail {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      background: white;
      padding-bottom: 10px;
      border-radius: 20px;
   }

    @media screen and (max-width: 640px) {
      .article_detail {
         width: 100%; 
      }
   }

   .post_comment {
      display: flex;
      justify-content: space-between;
      width: 95%;
      margin-left: auto;
      margin-right: auto;    
   }

   .form-control{
      border-radius: 20px;
      background-color: #dfe3ee;
   }

   @media screen and (max-width: 640px) {
      .form-control {
         width: 90%; 
      }
   }

   .comment {
      display: flex;
      align-items: baseline;
      margin: 15px 0px 30px 0px;
   }

   .iconUser.rounded-circle.mb-2.me-2 {
      border: solid 1px gray;
      height: 50px;
      width: 50px;
   }

   .comment_content {
      width: auto;
      padding : 0px 0px 0px 20px;
   }

   .comment_bulle {
      width: auto;
      padding : 20px 20px 20px 20px;
      background-color: #dfe3ee;
      border-radius: 25px;
      text-align: left;
      word-wrap: break-word;
   }

   .comment_user  {
      font-weight : bold;    
   }

   .comment_user:hover {
      color: orangered;
   }

   .comment_date {
      color: gray;
      text-align: left;
      margin-left: 10px ;
   }

   .comment_button {
      text-align: left; 
   }

   h1 {
      text-align: center;
      margin: 20px 0px 20px 0px;
      color: pink;
      padding: 20px;
   }

   p {
      margin-bottom: 0;
      color: black;
   }

   a {
      text-decoration: none;
   }
</style>