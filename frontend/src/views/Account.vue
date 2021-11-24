<template>
<!--on rajoute la classe container pour le CSS avec bootstrap-->
<div class="container mt-5">
  <div class="user"> 
     <h1>Bienvenue {{userArray.firstname}}!</h1>  
    </div> 
 
 
</div>  
</template>


<script>
import axios from 'axios'

export default {
    name :'Account',
    data : function () {
      return {
          userArray : null
      } 
    },

    methods : {   
    },

    components : {  
    },

    mounted(){
     axios.get ("http://localhost:3000/api/users/5")
     .then(user => {
        console.log(user);
        this.userArray = user.data
        })
   }   
}
</script>


<style>
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

 .article_frame {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
 }

 .article {
    border : solid 2px #f3e9f1;
    height: 175px;
    overflow: hidden;
    margin-bottom: 50px;
 }
</style>