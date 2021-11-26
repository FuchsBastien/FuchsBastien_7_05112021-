<template>
   <div>
     <div class="container mt-5">
         <h1>Créer une publication</h1>

         <form>
         <div class="form-group mt-5">
            <input v-model= "formData.title" type="text" id="title" placeholder="Titre" class= "form-control">  
         </div>
         
         <div class="form-group mt-5">
            <textarea v-model= "formData.content" id="content"  rows="1" placeholder="Quoi de neuf?" class= "form-control"></textarea>
         </div>

         <button class ="btn btn-primary mt-5" v-on:click = "envoiForm">Valider</button>
         </form>
         {{ok}}
           <br>
         {{formData}}
      </div>  


      <div class="container mt-5">
        <h1>Tous les Articles Publiés</h1>

         <div class="articles_frame">
            <div class="article" v-bind:key = "article" v-for= "article in articlesArray"> 
                 <h2>{{article.title}}</h2>
                 <p>{{article.content}}</p>
                 <p>Publié par : {{article.User.firstname}} {{article.User.lastname}}</p>
                 <p class="date">Le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}</p>
                <router-link v-bind:to ="`/OneArticle/${article.id}`">Commentaires</router-link>

               
              <div>
                 
              </div>
            </div>    
         </div>
l
      </div>  
      

   </div>
</template>


<script>
import axios from 'axios'
//import OneArticle from "./OneArticle.vue"

export default {
   name: 'AllArticles',

	components: {
	//OneArticle
   },

    data : function () {
      return {
          articlesArray : [],

          formData : {
            userId: localStorage.getItem('Id'),
            title : '',
            content : ''
          },

          ok : {
            Id: localStorage.getItem('Id'),
            userPrenom: localStorage.getItem('userPrenom'),
            userNom: localStorage.getItem('userNom'),
            userPhoto: localStorage.getItem('userPhoto'),
           
          }
            
      } 
    },

    methods : { 
      envoiForm () {
      axios.post ("http://localhost:3000/api/articles/",this.formData)
    
     } 
    },

    created(){
     axios.get ("http://localhost:3000/api/articles/")
     .then(articles => {
        console.log(articles);
        //this fait référence au tableau vide dans data
        this.articlesArray = articles.data
        })
   }   
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
 }

 p{
    color: black;
 }

 a {
 text-decoration: none;
 }

 .date {
    color: gray;
 }

</style>