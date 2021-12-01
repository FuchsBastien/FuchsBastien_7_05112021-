<template>
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

         <p v-if="errorArticle" class="mt-2 text-danger"> Post de l'article impossible veuillez remplir tous les champs (l'upload d'une image n'est pas obligatoire)</p>
      </form>
      {{article}}
   </div>  
</template>


<script>
   import axios from 'axios'

   export default {
      name :'CreateArticle',
      
      data : function () {
         return {
            article : {
               token : localStorage.getItem('token'),
               userId: localStorage.getItem('Id'),
               title : '',
               content : '',
               imageUrl : ''
            },

            errorArticle : false
         }
      },

      methods : { 
         envoiForm () {
            if (this.article.title == '' || this.article.content == '') {
               this.errorArticle = true
               return
            }
            else {
               if (this.article.imageUrl == '') {
                  axios.post ('http://localhost:3000/api/articles/', this.article)
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
                  })
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
   }
</script>


<style scoped>
   h1 {
      text-align: center;
      margin: 20px 0px 20px 0px;
      color: orangered;
      padding: 20px;
   }
</style>