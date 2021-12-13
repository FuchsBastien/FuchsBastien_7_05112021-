<template>
<div>
    <div class="container">
            <div class="row">
                <div class="col">
                    <h1 class="mt-5">Réinitialiser mon mot de passe</h1>
                    <p>Veuillez transmettre votre mail à cette adresse pour réinitialiser votre mot de passe</p>
                    <a v-bind:href="`mailto:${email}`" v-bind:to="`/`" type="submit" class="btn btn-info btn-lg btn-block mt-3">Contact</a>
                    <br><br>
                    <router-link class="createAccount" v-bind:to="`/`">Retour à la session</router-link> 

                    <p class="text-right mt-3">Vous n'avez pas de compte ? <router-link class="createAccount" v-bind:to="`/signup`">Créez-en un</router-link></p>   
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