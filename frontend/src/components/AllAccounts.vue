<template>
  <div v-if="userToken" class="account">
    <div class = "account_avatar">
      <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="userArray.imageUrl" alt="">
      <h1>{{userArray.firstname}} {{userArray.lastname}}</h1> 
    </div>
    
    <div class="account_delete" v-if="userAdmin == 'true'">
      <button class ="btn-danger mt-2 rounded" v-on:click ="userDelete">Supprimer</button>
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
        userId: localStorage.getItem('Id'),
        userAdmin: localStorage.getItem('Admin'),

        Id : this.$route.params.id,

        userArray : [],
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
  
      userDelete () {
        axios.delete (`http://localhost:3000/api/users/${this.Id}`) 
          .then(() => {
            this.$router.push('/delete');    
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