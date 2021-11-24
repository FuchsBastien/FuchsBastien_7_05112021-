<template>
<div class="container mt-5">
  
    
  <h1>Bienvenue {{userArray.firstname}}!</h1> 

   <div class="article_frame">
            <div class="article">
              <h2>{{userArray.firstname}} {{userArray.lastname}}</h2>     
              <p>{{userArray.bio}}</p>
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
          userArray : []
      } 
    },

   created () {
   this.loadAccount();
   },

    methods : {  
    loadAccount(){
     axios.get ("http://localhost:3000/api/users/5")
     .then(user => {
        console.log(user);
        this.userArray = user.data
        })
   }   
    },

    components : {  
    },



}
</script>


<style>
 /* h1,h2 {
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

 .article_frame {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
 }

 .article {
    border : solid 2px #f3e9f1;
    height: 200px;
    overflow: hidden;
    margin-bottom: 50px;
 }*/
</style>