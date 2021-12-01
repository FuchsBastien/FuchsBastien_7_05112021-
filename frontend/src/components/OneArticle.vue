<template>
<div class ="article_detail">

   <div class="all_comments">

   <div class = "post_comment_frame">
      <h2>Laisser un commentaire !</h2>
      <div class="post_comment">
         <!--<input v-model= "comment.userId" type="text" id="userId" placeholder="UserId" class= "form-control">
         <input v-model= "comment.articleId" type="text" id="ArticleId" placeholder="ArticleId" class= "form-control">-->
         <input v-model= "comment.content" type="text" id="content" placeholder="content" class= "form-control">
         <button class ="btn btn-primary mt-5" v-on:click = "postComment">Commenter</button>
         <p v-if="errorComment" class="mt-2 text-danger">Veuillez ajouter un contenu</p>
         <br>
         {{comment}}
      </div>
   </div>

   <div class="comments_frame">
      <h2>Commentaires</h2>
      <div class="comments" v-bind:key = "comments" v-for= "comments in commentsArray">
         <p>{{comments.content}}</p>
         <p>Publié par : {{comments.User.firstname}} {{comments.User.lastname}}</p>
         <p class="CommentDate">Le {{comments.createdAt [8]}}{{comments.createdAt [9]}}-{{comments.createdAt [5]}}{{comments.createdAt [6]}}-{{comments.createdAt [0]}}{{comments.createdAt [1]}}{{comments.createdAt [2]}}{{comments.createdAt [3]}} </p>
         <button class="btn btn-primary" v-on:click="deleteComment(comments.id)">Supprimer</button>
         <br>
         {{comments.id}}
      </div>   
   </div> 

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
            console.log('commentaire supprimé');
            this.allComments.splice(1)
            this.created();
         })
         .catch((error) => {
            console.log(error.message);
         })
      },

   },
}
</script>


<style scoped>
h1 {
    text-align: center;
    margin: 20px 0px 20px 0px;
    color: orangered;
    padding: 20px;
}

.article_detail{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.article_frame {
    border : solid 2px #f3e9f1;;
    height: 250px;
    overflow: hidden;
}

.all_comments {
    background: orangered;
}

.post_comment {
    border : solid 2px white;
    height: 175px;
    margin: 50px;
    background: white;
}

.comments_frame {
    border : solid 2px white;
    background: orangered;    
}

.comments {
    border : solid 2px white;
    height: 250px;
    overflow: hidden;
    margin: 50px;
    background: white;
}

p {
    color: black;
}

a {
    text-decoration: none;
}

.ArticleDate, .CommentDate {
    color: gray;
}

 /*.comments {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
 }*/
</style>