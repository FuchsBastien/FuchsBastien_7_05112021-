<template>
    <div>
        <div class="container">
            <form class="form-inline justify-content-center">
                <h3 class="mt-5">Inscription</h3>

                <div class="form-group">
                    <label class="mb-2">Nom</label>
                    <input class="form-control" v-model="user.firstname" type="text" name="Votre nom" placeholder="Dupont"  required/>
                </div>

                <div class="form-group">
                    <label class="mb-1 mt-2">Prénom</label>
                    <input class="form-control" v-model="user.lastname" type="text" name="Votre prénom" placeholder="Marc" required/>
                </div>

                <div class="form-group">
                    <label class="mb-1 mt-2">Adresse mail</label>
                    <input class="form-control" v-model="user.email" type="email" name="Votre adresse email" placeholder="dupontmarc@gmail.com"  required/>
                </div>

                <div class="form-group ">
                    <label class="mb-1 mt-2">Mot de passe</label>
                    <input class="form-control"  v-model="user.password" type="password" name="Votre mot de passe" placeholder="Au moins 6 caractères dont un chiffre" autocomplete="on" required/>
                </div>

                <button class="submit btn btn-info btn-lg btn-block mt-3" v-on:click.prevent="sendForm" type="submit">S'inscrire</button>

                <p v-if="errorSignup" class="mt-2 text-danger"> Création de compte impossible, veuillez remplir tous les champs. </p>

                <p class="createAcc text-right mt-3">
                    Déjà inscrit ?
                   <router-link class="createAccount" v-bind:to="`/`">Se connecter</router-link>
                </p>
            </form>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'Signup',
        data() {
            return {
                user:{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: ''
                },
                errorSignup: false,
            }   
        },
        methods: {
            sendForm(){

               if (this.user.nom == '' || this.user.prenom == '' || this.user.email == ''|| this.user.password == '') {
                    this.errorSignup = true
                    return
                } else {

                axios.post("http://localhost:3000/api/auth/signup", this.user)
                .then(() => {
                    console.log("Le compte a été créé !")
                   this.$router.push('/success');
                    this.errorSignup = false
                })
                .catch((error) =>{
                    console.log(error.message);
                    this.errorSignup = true
                })

           }},
        }
    }
</script>


<style scoped>
input.form-control:valid {
    border:3px solid #0a0 !important;
}

input.form-control:invalid {
    border:1px solid grey !important;
} 

label, a, p, h3{
    color: black;
}

a:hover {
    color: white;
}

.router-link {
    color: black;
}
</style>