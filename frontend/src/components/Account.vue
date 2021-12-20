<template>
  <div v-if="userToken" class="account"> 
      <!--{{userArray}}-->
    <div class= "account_frame">
      <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="userArray.imageUrl" v-bind:alt="userArray.firstname">

      <h1>{{userArray.firstname}} {{userArray.lastname}}</h1>  

      <div class="account_modify">
        <div v-if="idUserUpdate == userArray.id">
          <div class="form-group mt-5">
            <input v-model= "userUpdate.firstname" type="text" id="firstname" placeholder="Prénom" class= "form-control">  
          </div>

          <div class="form-group mt-5">
            <input v-model= "userUpdate.lastname" type="text" id="lastname" placeholder="Nom" class= "form-control">  
          </div>

          <button class="btn-success rounded mt-3" v-on:click="userModify(userArray.id)">Valider</button>

          <input class="btn-danger ms-2 rounded" type="submit" value="Annuler" v-on:click="setIdUserToUpdate(null)">

          <p v-if="errorUpdateUser" class="mt-2 text-danger"> Veuillez modifier le nom et prénom</p>
        </div>

        <button class ="btn-success rounded mt-5" v-on:click ="setIdUserToUpdate(userArray.id)">Modifier</button>         
      </div>

      <br>

      <div class="account_delete">
        <button class ="btn-danger mt-2 mb-3 rounded" v-on:click ="userDelete">Supprimer</button>
      </div>
    </div>
  </div>  

  <div class ="no-connect" v-else>
    <h1>Accès non autorisé</h1>
    <p >Veuillez vous <router-link class="createAccount" v-bind:to="`/`">connecter</router-link> ou vous <router-link class="createAccount" v-bind:to="`/signup`">inscrire</router-link></p>
  </div>
</template>


<script>
  import axios from 'axios'

  export default {
    name :'Account',

    data : function () {
      return {
        userToken: localStorage.getItem('token'),
        Id: localStorage.getItem('Id'),

        userArray : [],

        idUserUpdate: null,

        errorUpdateUser : false,

        userUpdate : {
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
        if (this.userUpdate.firstname == '' && this.userUpdate.lastname == '') {
              this.errorUpdateUser = true
              return
        }

        else {
        axios.put (`http://localhost:3000/api/users/${this.Id}`,this.userUpdate) 
          .then(() => {
            console.log('compte modifié');
            this.userLoad();
            this.clearData();
            this.errorUpdateUser = false;
          })
          .catch((error) => {
            console.log(error.message);
          })
        }
      },

      clearData() {
      this.userUpdate.firstname = '';
      this.userUpdate.lastname = '';
    },

      userDelete () {
        axios.delete (`http://localhost:3000/api/users/${this.Id}`) 
          .then(() => {
            this.LocalstorageClear ()
            this.$router.push('/delete');    
          })
      },

      LocalstorageClear () {
        localStorage.clear();
        this.userToken= null;    
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

  .no-connect {
    margin-top : 250px;
   }

  .no-connect a {
    text-decoration: underline;
    color: black;
   }

  .no-connect a:hover {
    color: orangered;
  }

  .no-connect h1 {
    color: orangered;
  }

  .account_frame {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    background-color: white;
    border-radius: 15px;
  }

  @media screen and (max-width: 640px) {
    .account_frame {
      width: 90%;
    }
  }

  .iconUser.rounded-circle.mb-2.me-2 {
    border: solid 1px gray;
    margin : 10px;
    height: 100px;
    width: 100px;
  }

  .form-groupmt-5 {
    margin-top : 5px;
  }

  .form-control {
    width: 25%;
    margin-left: auto;
    margin-right: auto;  
    background-color: #dfe3ee;
    border-radius: 15px;
  }

  @media screen and (max-width: 640px) {
    .form-control {
     width: 80%;
    }
  }

  h1 {
    text-align: center;
    padding-top : 10px;
    margin-bottom : 10px;
  }

  p {
    color: black;
  } 

  a {
    text-decoration: none;  
  }
</style>