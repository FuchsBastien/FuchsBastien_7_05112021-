<template>
   <div class="create_article">
      <div class="container">
         <form> 
            <div class="form-group mt-3">
               <label for="content">Créer une publication</label>
               <br><br>
               <textarea @keyup.enter="postArticle()" v-model= "article.content" id="content"  rows="3" placeholder="Quoi de neuf?" class= "form-control" required></textarea>
            </div>

            <div class="form-group mt-3">
               <input class="form-control-file" aria-label="envoi image" @change="onSelect" accept="image/*" type="file"  id="image">
            </div>

            <button class ="btn btn-primary mt-5" v-on:click.prevent="postArticle">Partager</button>

            <p v-if="errorArticle" class="mt-2 text-danger"> Veuillez écrire un contenu ou partager une image</p>
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
               content : '',
               imageUrl : ''
            },

            errorArticle : false
         }
      },

      methods : { 
         postArticle () {
            if (this.article.content == '' && this.article.imageUrl == '') {
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
                    if (this.article.content == '') {
                     const formData = new FormData()
                     formData.append('userId', this.article.userId);
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
                  else {
                     const formData = new FormData()
                     formData.append('userId', this.article.userId);
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
           }
         },
         
         clearData() {
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

   label
   {
    color: orangered;
    font-size: 40px;  
    margin-top: 20px;
   }
</style>