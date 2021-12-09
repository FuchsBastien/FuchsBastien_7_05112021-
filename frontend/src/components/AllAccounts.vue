<template>
  <div class="account">
    <div class = "account_avatar">
      <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="userArray.imageUrl" alt="">
      <h1>{{userArray.firstname}} {{userArray.lastname}}</h1> 
    </div>
    
    <div class="account_delete" v-if="userAdmin == 'true'">
      <button class ="btn-danger mt-2 rounded" v-on:click ="userDelete">Supprimer</button>
    </div>
  </div>  
</template>


<script>
import axios from 'axios'

export default {
  name :'AllAccounts',

  data : function () {
    return {
      Id : this.$route.params.id,

      userArray : [],
      
      userAdmin: localStorage.getItem('Admin'), 
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