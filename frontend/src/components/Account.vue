<template>
  <div class="account">
    <div class= "account_avatar">
      <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="userArray.imageUrl" alt="">
      <h1>Bienvenue {{userArray.firstname}}!</h1> 
      <!--{{userArray}}-->
    </div>

    <div class= "account_frame">
      <div class="account_modify">
        <h2>{{userArray.firstname}} {{userArray.lastname}}</h2>  

          <div v-if="idUserUpdate == userArray.id">
            <div class="form-group mt-5">
              <input v-model= "formData.firstname" type="text" id="firstname" placeholder="Prénom" class= "form-control">  
            </div>

            <div class="form-group mt-5">
              <input v-model= "formData.lastname" type="text" id="lastname" placeholder="Nom" class= "form-control">  
            </div>

            <button class="btn-success rounded mt-3" v-on:click="userModify(userArray.id)">Valider</button>

            <input class="btn-danger ms-2 rounded" type="submit" value="Annuler" v-on:click="setIdUserToUpdate(null)">
          </div>

          <button class ="btn-success rounded mt-5" v-on:click ="setIdUserToUpdate(userArray.id)">Modifier</button>         
      </div>

      <br>

      <div class="account_delete">
        <button class ="btn-danger mt-2 mb-3 rounded" v-on:click ="userDelete">Supprimer</button>
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
        Id: localStorage.getItem('Id'),

        userArray : [],

        idUserUpdate: null,

        formData : {
          firstname : '',
          lastname : '', 
        },
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
        .then(() => {
              console.log('compte modifié');
              this.userLoad();
              })
          .catch((error) => {
              console.log(error.message);
          })
      },

      userDelete () {
        axios.delete (`http://localhost:3000/api/users/${this.Id}`) 
        .then(() => {
          this.$router.push('/delete');    
        })
      },

      setIdUserToUpdate(userArray_id) {
      this.idUserUpdate = userArray_id
      },
    },
  }
</script>


<style scoped>
  .account {
    background-color: #dfe3ee;
    padding-top : 150px;
  }

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
      background-color: #dfe3ee;
      border-radius: 15px;
  }

  .form-groupmt-5 {
    margin-top : 5px;
  }

  .account_frame {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    background-color: white;
    border-radius: 15px;
  }

  .articles_frame {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    background-color: pink;
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