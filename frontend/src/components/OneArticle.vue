<template>
<div class ="article_detail">
   <div class="post_comment">
      <!--<input v-model= "comment.userId" type="text" id="userId" placeholder="UserId" class= "form-control">
      <input v-model= "comment.articleId" type="text" id="ArticleId" placeholder="ArticleId" class= "form-control">-->
      <input class= "form-control" v-model= "comment.content" @keyup.enter="postComment()" type="text" id="content" placeholder="Ecrivez un commentaire...">
      <p v-if="errorComment" class="mt-2 text-danger">Veuillez ajouter un contenu</p>
      <br>
      <!--{{comment}}-->
   </div>

   <div class="comments" v-bind:key = "comments" v-for= "comments in commentsArray">
      <img class="iconUser rounded-circle mb-2 me-2" width="50" v-bind:src="comments.User.imageUrl" alt="">
      <p class="comment_user">{{comments.User.firstname}} {{comments.User.lastname}}</p>
      <p>{{comments.content}}</p>
      <p class="comment_date">Le {{comments.createdAt [8]}}{{comments.createdAt [9]}}-{{comments.createdAt [5]}}{{comments.createdAt [6]}}-{{comments.createdAt [0]}}{{comments.createdAt [1]}}{{comments.createdAt [2]}}{{comments.createdAt [3]}} </p>
      <button class="btn btn-primary" v-on:click="deleteComment(comments.id)">Supprimer</button>
      <br>
      <!--{{comments.id}}-->
   </div>   
</div>  


</template>


<script>
import axios from 'axios'

export default {
   name :'OneArticle',

   data : function () {
      return {
         commentsArray : [],

         comment : {
            userId: localStorage.getItem('Id'),
            articleId : this.$route.params.id,
            content : ''
         },
         
         Id: localStorage.getItem('Id'),
         articleId : this.$route.params.id,

         errorComment: false,
      } 
   },

   created(){
      this.loadComments();
   },  

   methods : { 
      loadComments () { 
         axios.get (`http://localhost:3000/api/articles/${this.articleId}/comments`)
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
         axios.post ("http://localhost:3000/api/comments/",this.comment)
            .then(()=>{
               console.log('réussite!!');
               this.loadComments();
               this.clearData();
               this.errorComment = false
            })
            .catch(()=>{
               console.log('échec!!');
               this.errorComment = true
            });
          }
      },

      clearData() {
         this.comment.content = '';
      },

      deleteComment(id) {
         axios.delete("http://localhost:3000/api/comments/"+id)
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
   .article_detail{
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      background: orangered;
      padding-bottom: 10px;
      border-radius: 20px;
   }

   .post_comment {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
      padding: 20px 20px 0px 20px;
   }

   .form-control{
       border-radius: 20px;
   }

   .comments {
      overflow: hidden;
      margin: 40px;
      background: white;
      border-radius: 20px;
   }

  .iconUser.rounded-circle.mb-2.me-2 {
    border: solid 1px gray;
    height: 50px;
    width: 50px;
   }

   .comment_user {
      font-weight : bold;
   }

   .comment_date {
      color: gray;
   }

   h1 {
      text-align: center;
      margin: 20px 0px 20px 0px;
      color: orangered;
      padding: 20px;
   }

   p {
      margin-bottom: 0;
   }
</style>