<template>
    <div v-if="user" id="nav" >
        <img class = img_header_online src='http://localhost:3000/images/logo-online.ico' alt="logo-online">
        <router-link to="/articles">Tous les Articles</router-link> 
        <router-link to="/account">Mon compte</router-link> 
        <a class = deconnexion v-on:click ="LocalstorageClear">Déconnexion</a>
    </div>

    <div v-else id="nav" >
        <img class = img_header_offline src='http://localhost:3000/images/logo-offline.png' alt="logo-offline">
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
            this.user= ''; 
            this.$router.push('/');   
            },
        }
    }
</script>


<style scoped>
    #nav {
        position: fixed;
        top : 0;
        left : 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin: auto;
        padding: 5px;
        font-size: 1.3em;
        background-color: #2c3e50;;
        height: auto; 
        align-items: center; 
        
    }

    #nav a {
        font-weight: bold;
        color: #D6D6D6;
        text-decoration: none;
        cursor: pointer;   
    }

    #nav a:hover, #nav a.router-link-exact-active {
        color: pink;
    }

    .img_header_online {
        height: 75px;
        width: 75px;
    }

    .img_header_offline {
        height: 200px;
        width: 450px;
    }
 </style>