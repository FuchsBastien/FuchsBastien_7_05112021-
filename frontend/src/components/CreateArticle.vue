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

            <div class="preview_picture">
               <img class = "picture" v-if="picturePreview" :src="picturePreview"/>
            </div>

            <p v-if="errorArticle" class="mt-2 text-danger"> Veuillez écrire un contenu ou partager une image</p>

            <button class ="btn btn-primary mt-4 mb-4" v-on:click.prevent="postArticle">Partager</button>
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

            picturePreview : "",

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
                  .catch((err)=>{
                     console.log(err.response.data);
                     window.alert(err.response.data);
                     this.errorArticle = false
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
                        this.errorArticle = false
                     })
                     .catch((err)=>{
                        console.log(err.response.data);
                        window.alert(err.response.data);
                        this.errorArticle = false
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
                        this.errorArticle = false
                     })
                     .catch((err)=>{
                        console.log(err.response.data);
                        window.alert(err.response.data);
                        this.errorArticle = false
                     });   
                  }
               } 
           }
         },
         
         clearData() {
            this.article.content = '';
            this.article.imageUrl = '';
            this.picturePreview ='';
         },

         onSelect(event) {
            this.article.imageUrl = event.target.files[0];    
            this.picturePreview = URL.createObjectURL(this.article.imageUrl);
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

   .picture {
      width: 400px;
      height : 200px;
      object-fit: contain;
      margin: 20px 0px 20px 0px;
   }

   .form-control {
      width: 65%;
      margin-left : auto;
      margin-right : auto; 
      background-color: #dfe3ee;
      border-radius: 15px;
   }

   label {
      color: orangered;
      font-size: 40px;  
      margin-top: 20px;
   }

   h1 {
      text-align: center;
      margin: 20px 0px 20px 0px;
      color: orangered;
      padding: 20px;
   }
</style>