<template>
<div class="container mt-5">

<h1>Créer une publication</h1>

<form>
  <div class="form-group mt-5">

    <input v-model= "formData.title" type="text" id="title" placeholder="Titre" class= "form-control">
  </div>

  <div class="form-group mt-5">
  
    <textarea v-model= "formData.content" id="content"  rows="15" placeholder="Quoi de neuf?" class= "form-control"></textarea>
  </div>

  <button class ="btn btn-primary mt-5" v-on:click = "envoiForm">Valider</button>
</form>
    
</div>  
</template>



<script>
import axios from 'axios'

export default {
   
    name :'CreateArticles',
     data : function () {
      return {
        formData : {
         title : '',
         content : ''
        } 
      }
    },

    methods : {   
     envoiForm () {
      axios.post ("http://localhost:3000/api/articles/",this.formData)
    
     }
    },

    components : {  
    },

}
</script>


<style>
</style>