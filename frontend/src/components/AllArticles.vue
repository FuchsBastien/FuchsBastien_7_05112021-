<template>
   <div>
     <div class="container mt-5">
         <h1>Créer une publication</h1>

         <form>
         <div class="form-group mt-5">
            <input v-model= "article.title" type="text" id="title" placeholder="Titre" class= "form-control" required>  
         </div>
         
         <div class="form-group mt-5">
            <textarea v-model= "article.content" id="content"  rows="1" placeholder="Quoi de neuf?" class= "form-control" required></textarea>
         </div>

         <div class="form-group mt-5">
            <input class="form-control-file" aria-label="envoi image" @change="onSelect" accept="image/*" type="file"  id="image">
         
         </div>

         <button class ="btn btn-primary mt-5" v-on:click.prevent="envoiForm">Partager</button>
         </form>
           <br>
         {{article}}
      </div>  


      <div class="container mt-5">
        <h1>Tous les Articles Publiés</h1>

         <div class="articles_frame">
            <div class="article" v-bind:key = "article" v-for= "article in articlesArray"> 
                 <h2>{{article.title}}</h2>
                 <p>{{article.content}}</p>
                 <img class="image_article" v-bind:src="article.imageUrl" alt="">
                 <p>Publié par : {{article.User.firstname}} {{article.User.lastname}}</p>
                 <p class="date">Le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}</p>
                <router-link v-bind:to ="`/OneArticle/${article.id}`">Commentaires</router-link>
 
              <div>
                 
              </div>
            </div>    
         </div>

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

          article : {
            userId: localStorage.getItem('Id'),
            title : '',
            content : '',
            imageUrl : ''
          },

          /*user : {
            Id: localStorage.getItem('Id'),
            userPrenom: localStorage.getItem('userPrenom'),
            userNom: localStorage.getItem('userNom'),
            userPhoto: localStorage.getItem('userPhoto'),
          }*/
            
      } 
    },

    methods : { 
      envoiForm () {

         if (this.article.imageUrl == '') {
               axios.post ('http://localhost:3000/api/articles/', this.article)
                return
         } 
         else {
         const formData = new FormData()
         formData.append('userId', this.article.userId);
         formData.append('title', this.article.title);
         formData.append('content', this.article.content);
         formData.append('imageUrl', this.article.imageUrl);
   
         axios.post ('http://localhost:3000/api/articles/', formData,
         {
            headers: {
           }
         }).
         then(()=>{
         console.log('réussite!!');
         this.$emit('articleCree');
         this.clearData();
         })
         .catch(()=>{
         console.log('échec!!');
         });
       } 
       
      },
      

      clearData() {
            this.article.title = '';
            this.article.content = '';
            this.article.imageUrl = null;
        },

      onSelect(event) {
         this.article.imageUrl = event.target.files[0];    
      },

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

.image_article {
   width: 500px;
   height : 500px;
}
</style>