<template>
<div class ="article_detail">

   <div class="all_comments">

   <div class = "post_comment_frame">
      <h2>Laisser un commentaire !</h2>
      <div class="post_comment">
          <input v-model= "formData.userId" type="text" id="userId" placeholder="UserId" class= "form-control">
          <input v-model= "formData.articleId" type="text" id="ArticleId" placeholder="ArticleId" class= "form-control">
          <input v-model= "formData.content" type="text" id="content" placeholder="content" class= "form-control">
          <button class ="btn btn-primary mt-5" v-on:click = "envoiForm">Post</button>
      </div>
   </div>

   <div class="comments_frame">
      <h2>Commentaires</h2>
      <div class="comments" v-bind:key = "comments" v-for= "comments in oneArticleArrayComments">
        <p>{{comments.content}}</p>
        <p>Publié par :</p>
        <p class="CommentDate">Le {{comments.createdAt [8]}}{{comments.createdAt [9]}}-{{comments.createdAt [5]}}{{comments.createdAt [6]}}-{{comments.createdAt [0]}}{{comments.createdAt [1]}}{{comments.createdAt [2]}}{{comments.createdAt [3]}} </p>
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
          id: this.$route.params.id,
          oneArticleArrayComments : [],
          formData : {
            userId : '',
            articleId : '',
            content : ''
        } 
      } 
    },

     methods : { 
        envoiForm () {
      axios.post ("http://localhost:3000/api/comments/",this.formData)
     } 
    },
    
    created(){
       axios.get (`http://localhost:3000/api/articles/${this.id}/comments`)
     .then(response => {
        console.log(response);
        this.oneArticleArrayComments = response.data
        })
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
    height: 150px;
    margin: 50px;
    background: white;
 }

 .comments_frame {
    border : solid 2px white;
    background: orangered;
    
 }

  .comments {
    border : solid 2px white;
    height: 150px;
    overflow: hidden;
    margin: 50px;
    background: white;
 }


 /*.comments {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
 }*/


 p {
    color: black;
 }

 a {
    text-decoration: none;
 }

 .ArticleDate, .CommentDate {
    color: gray;
 }

 

</style>