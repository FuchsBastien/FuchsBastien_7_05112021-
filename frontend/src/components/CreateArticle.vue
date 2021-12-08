<template>
   <div class="create_article">
      <div class="container">
         <h1>Créer une publication</h1>
          <!--{{article.userAdmin}}-->
         <form>
            <div class="form-group mt-3">
               <input v-model= "article.title" type="text" id="title" placeholder="Titre" class= "form-control" required>  
            </div>
            
            <div class="form-group mt-3">
               <textarea v-model= "article.content" id="content"  rows="3" placeholder="Quoi de neuf?" class= "form-control" required></textarea>
            </div>

            <div class="form-group mt-3">
               <input class="form-control-file" aria-label="envoi image" @change="onSelect" accept="image/*" type="file"  id="image">
            </div>

            <button class ="btn btn-primary mt-5" v-on:click.prevent="postArticle">Partager</button>

            <p v-if="errorArticle" class="mt-2 text-danger"> Veuillez remplir tous les champs (l'ajout d'une image n'est pas obligatoire)</p>
         </form>
         <!--{{article}}-->
      </div>  
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
               userAdmin: localStorage.getItem('Admin'),
               title : '',
               content : '',
               imageUrl : ''
            },

            errorArticle : false
         }
      },

      methods : { 
         
         postArticle () {
            if (this.article.title == '' || this.article.content == '') {
               this.errorArticle = true
               return
            }
            else {
               if (this.article.imageUrl == '') {
                  axios.post ('http://localhost:3000/api/articles/', this.article, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                  .then(()=>{
                  console.log('réussite!!');
                  this.$emit('articleCree');
                  this.clearData();
                  this.errorArticle = false
                  })
                  .catch(()=>{
                  console.log('échec!!');
                  this.errorArticle = true
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
                     headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
                  })
                  .then(()=>{
                     console.log('réussite!!');
                     this.$emit('articleCree');
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
            this.article.imageUrl = '';
         },

         onSelect(event) {
            this.article.imageUrl = event.target.files[0];    
         },
      },
   }
</script>


<style scoped>
   .create_article{
      background-color: #dfe3ee;
   }

   .container {
      border : solid 2px #f3e9f1;
      margin-bottom: 50px;
      border-radius: 20px;
      width: 55%;
      background-color: white;
   }

   h1 {
      text-align: center;
      margin: 20px 0px 20px 0px;
      color: orangered;
      padding: 20px;
   }

   .form-control {
      width: 65%;
      margin-left : auto;
      margin-right : auto; 
      background-color: #dfe3ee;
      border-radius: 15px;
   }
</style>