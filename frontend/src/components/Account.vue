<template>
 <div class="account_and_articles">
   
   <h1>Bienvenue {{userArray.firstname}}!</h1> 

   <div class="account_frame">

      <div class="account_modify">

            <h2>{{userArray.firstname}} {{userArray.lastname}}</h2>  
            <div class="form-group mt-5">
               <input v-model= "formData.firstname" type="text" id="firstname" placeholder="Prénom" class= "form-control">  
            </div>
            <div class="form-group mt-5">
               <input v-model= "formData.lastname" type="text" id="lastname" placeholder="Nom" class= "form-control">  
            </div>
            <button class ="btn btn-primary mt-5" v-on:click = "userModify">Modifier</button>

             <br> 
             <br> 

            <p>{{userArray.bio}}</p>
            <div class="form-groupmt-5">
               <input v-model= "formData.bio" id="text"  placeholder="bio" class= "form-control">
            </div>
             <button class ="btn btn-primary mt-5" v-on:click = "userModify">Modifier</button>

             <br> 
             <br> 

            <p>{{userArray.email}}</p>
             <div class="form-group mt-5">
               <input v-model= "formData.email" id="text"  placeholder="email" class= "form-control">
            </div>
             <button class ="btn btn-primary mt-5" v-on:click = "userModify">Modifier</button>
 
      </div>

      <br>

      <div class="account_delete">
        <button class ="btn btn-primary mt-5" v-on:click = "userDelete">Supprimer votre compte</button>
      </div>

   </div>

   <br>

   <div class="articles_frame">
      <h2>Vos articles</h2>
      <div class="articles" v-bind:key = "article" v-for= "article in userArrayArticles"> 
               <router-link v-bind:to ="`/OneArticle/${article.id}`">
              <h3>{{article.title}}</h3>
              <p>{{article.content}}</p>
              <p class="date">Le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}
              </p>
               </router-link>
      </div> 
  </div>   
 
 </div>  
</template>


<script>
import axios from 'axios'

export default {
    name :'Account',
    data : function () {
      return {
          userArray : [],
          userArrayArticles : [],
          formData : {
            firstname : '',
            lastname : '',
           // email : '',
           // bio : ''
         }
      } 
    },

   methods : { 
    //modifier user  
    userModify () {
     axios.put ("http://localhost:3000/api/users/11",this.formData) 
    },
   //supprimer user
    userDelete () {
     axios.delete ("http://localhost:3000/api/users/11") 
    }
   },

   created(){
     //afficher user
      axios.get ("http://localhost:3000/api/users/11")
        .then(user => {
         console.log(user);
          this.userArray = user.data
        })
      //afficher articles user
      axios.get ("http://localhost:3000/api/users/11/articles")
        .then(articles => {
          console.log(articles);
          this.userArrayArticles = articles.data
        })
   }   

}
</script>


<style scoped>
h1 {
    text-align: center;
    margin: 20px 0px 20px 0px;
    color: orangered;
    padding: 20px;
}

h2 {
    text-align: center;
    padding-top : 10px;
    margin-bottom : 10px;
  
}

.form-control {
    width: 25%;
    margin-left: auto;
    margin-right: auto;  
}

.form-groupmt-5 {
margin-top : 5px;
}

.account_frame {
    border : solid 2px #f3e9f1;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.articles_frame {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    background-color: orangered;
}

.articles {
    border : solid 2px #f3e9f1;
    height: 150px;
    width: 95%;
    background-color: white;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    padding: 10px;
}

p {
    color: black;
} 

a {
    text-decoration: none;  
}
</style>