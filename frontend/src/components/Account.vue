<template>
  <div class="account">
    <div class = "account_avatar">
      <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="userArray.imageUrl" alt="">
      <h1>Bienvenue {{userArray.firstname}}!</h1> 
      <!--{{userArray}}-->
    </div>

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
      </div>

      <br>

      <div class="account_delete">
        <button class ="btn btn-primary mt-5" v-on:click = "userDelete">Supprimer votre compte</button>
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

      formData : {
        firstname : '',
        lastname : '', 
      },

      Id: localStorage.getItem('Id'),
    } 
  },


  created(){
    this.userLoad();
  },  

  methods : { 
    userLoad(){
      axios.get (`http://localhost:3000/api/users/${this.Id}`)
      .then(user => {
        console.log(user);
        this.userArray = user.data
      })
    },

    userModify () {
      axios.put (`http://localhost:3000/api/users/${this.Id}`,this.formData) 
    },

    userDelete () {
      axios.delete (`http://localhost:3000/api/users/${this.Id}`) 
      .then(() => {
         this.$router.push('/delete');    
      })
    }
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

  h2 {
      text-align: center;
      padding-top : 10px;
      margin-bottom : 10px;
  }

  .iconUser.rounded-circle.mb-2.me-2 {
    border: solid 1px gray;
    margin : 10px;
    height: 100px;
    width: 100px;
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