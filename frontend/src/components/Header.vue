<template>
    <div v-if="user" id="nav" >
        <img class = img_header src='http://localhost:3000/images/logo.png' alt="">
        <router-link to="/articles">Tous les Articles</router-link> 
        <router-link to="/account">Mon compte</router-link> 
        <a class = deconnexion v-on:click ="LocalstorageClear">Déconnexion</a>

    </div>
</template>


<script>
    export default {
        name : 'Header',

        data : function () {
            return {
                user: localStorage.getItem('Id'),
            }
        }, 

        methods : { 
            LocalstorageClear () {
            localStorage.clear();
            this.user=null 
            this.$router.push('/');   
            },
        }
    }
</script>


<style scoped>
    #nav {
        display: flex;
        justify-content: space-around;
        margin: auto;
        padding: 30px;
        font-size: 1.3em;
        background-color: #2c3e50;;
        height: auto; 
        align-items: center;
    }

    #nav a {
        font-weight: bold;
        color: grey;
        text-decoration: none;
        cursor: pointer;   
    }

    #nav a.router-link-exact-active {
        color: orangered;
    }

    .img_header {
        height: 75px;
        width: 75px;
    }
 </style>