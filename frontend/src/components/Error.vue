<template>
<div>
    <div class="container">
            <div class="row">
                <div class="col">
                    <h1 class="mt-5">Erreur 404</h1>
                    <h3>Page introuvable</h3>
                    <br>
                    <router-link class="createAccount" v-bind:to="`/`">Retour à la page d'accueil</router-link> 
                </div>
            </div>
    </div>
</div>
</template>


<script>
    export default {
        name: 'SignupSuccess',

        data() {
            return {
                email : "groupomania-contact@gmail.com"
            }
        },
    }
</script>


<style scoped>
    .container {
        padding-top : 250px; 
   }

    label, a, p, h1 {
        color: black;
    }

    a:hover {
        color: white;
    }

</style>