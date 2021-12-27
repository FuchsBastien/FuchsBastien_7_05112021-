<template>
  <div v-if="userToken" class="account">
    <div class = "account_avatar">
      <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="userArray.imageUrl" alt="">

      <h1>{{userArray.firstname}} {{userArray.lastname}}</h1> 

      <h2 v-if="userArray.activate == true" class="messageActive">Ce compte est actif</h2>
      <h2 v-if="userArray.activate == false" class="messageInactive">Ce compte est inactif</h2>
      
      <div class="account_update_statut" v-if="userAdmin == 'true'">
        <button class ="btn-danger m-4 rounded" v-on:click ="storageFalseActivate(),userUpdateStatut()">Bloquer</button>
        <button class ="btn-success m-4 rounded" v-on:click ="storageTrueActivate(),userUpdateStatut()">Débloquer</button>
      </div>

      <div class="account_delete" v-if="userAdmin == 'true'">
        <button class ="btn-danger mt-1 mb-5 rounded" v-on:click ="userDelete">Supprimer</button>
      </div>
    </div>
  </div> 

  <div v-else class ="no-connect">
    <h1>Accès non autorisé</h1>
    <p >Veuillez vous <router-link class="createAccount" v-bind:to="`/`">connecter</router-link> ou vous <router-link class="createAccount" v-bind:to="`/signup`">inscrire</router-link></p>
  </div>
</template>


<script>
  import axios from 'axios'

  export default {
    name :'AllAccounts',

    data : function () {
      return {
        userToken: localStorage.getItem('token'),
        //userId: localStorage.getItem('Id'),
        userAdmin: localStorage.getItem('Admin'),

        Id : this.$route.params.id,

        userArray : [],

        userUpdate : {
          activate : ''
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
          .catch((error) => {
            console.log(error.message);
          })
      },

      userUpdateStatut(){
        axios.put (`http://localhost:3000/api/users/${this.Id}`,this.userUpdate)
          .then(() => {
            console.log('statut du compte mis à jour');
            this.userLoad();
          })
          .catch((error) => {
            console.log(error.message);
          })
      },  

      storageFalseActivate(){
        this.userUpdate.activate = 'false';
      },

      storageTrueActivate(){
        this.userUpdate.activate = 'true';
      },
  
      userDelete () {
        axios.delete (`http://localhost:3000/api/users/${this.Id}`) 
          .then(() => {
            this.$router.push('/delete');    
          })
          .catch((error) => {
            console.log(error.message);
          })
        },
    },
  }
</script>


<style scoped>
  .account {
    background-color: #dfe3ee;
    padding-top : 150px;
  }

  .messageActive {
    color: green;
  }

    .messageInactive {
    color: red;
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

  .account_avatar {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    background-color: white;
    border-radius: 15px;
  }

   @media screen and (max-width: 640px) {
      .account_avatar {
         width: 90%;
      }
   }

  .iconUser.rounded-circle.mb-2.me-2 {
    border: solid 1px gray;
    margin : 10px;
    height: 100px;
    width: 100px;
  }

  h1 {
    text-align: center;
    margin: 20px 0px 20px 0px;
    color: orangered;
    padding: 20px;
  }
</style>