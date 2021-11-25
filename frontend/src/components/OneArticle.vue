<template>
<div class ="article_detail">

   <div class="article_frame">
      <h1>{{oneArticleArray.title}} </h1>
      <p>{{oneArticleArray.content}}</p>
      <p>Publié par : {{oneArticleArrayUser.firstname}} {{oneArticleArrayUser.lastname}}</p>
      <p class="ArticleDate">Le {{oneArticleArrayDate[8]}}{{oneArticleArrayDate [9]}} {{oneArticleArrayDate [5]}}{{oneArticleArrayDate [6]}} {{oneArticleArrayDate [0]}}{{oneArticleArrayDate [1]}}{{oneArticleArrayDate [2]}}{{oneArticleArrayDate [3]}}</p>
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
</template>


<script>
import axios from 'axios'

export default {
    name :'OneArticles',
    data : function () {
      return {
          id: this.$route.params.id,
          oneArticleArray : [],
          oneArticleArrayUser : [],
          oneArticleArrayDate : [],
          oneArticleArrayComments : []
         
      } 
    },
    
    created(){
     axios.get (`http://localhost:3000/api/articles/${this.id}`)
     .then(response => {
        console.log(response);
        this.oneArticleArray = response.data
        this.oneArticleArrayUser = response.data.User
        this.oneArticleArrayDate = response.data.createdAt
        })

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



 .comments_frame {
    border : solid 2px white;
    background: orangered;
    
    
    ;
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