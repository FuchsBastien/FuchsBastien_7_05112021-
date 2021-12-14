<template>
    <div class="container">
        <form class="form-inline justify-content-center" @submit="checkForm" method="post" >
            <h1 class="mt-5">Inscription</h1>

            <div class="form-group">
                <label for="Votre prénom" class="mb-2">Prénom</label>
                <input class="form-control" v-model="user.firstname" type="text" id="Votre prénom" placeholder="Marc"  required/>
                 <p v-if="errorFirstname" class="mt-2 text-danger">Ce champ est obligatoire</p>
            </div>

            <div class="form-group">
                <label for="Votre nom" class="mb-1 mt-2">Nom</label>
                <input class="form-control" v-model="user.lastname" type="text" id="Votre nom" placeholder="Dupont" required/>
                <p v-if="errorLastname" class="mt-2 text-danger">Ce champ est obligatoire</p>
            </div>

            <div class="form-group">
                <label  for="Votre adresse email" class="mb-1 mt-2">Adresse mail</label>
                <input class="form-control" v-model="user.email" type="email" id="Votre adresse email" placeholder="dupontmarc@gmail.com" required/>
                <p v-if="errorEmail" class="mt-2 text-danger">Ce champ est obligatoire</p>
            </div>

            <div class="form-group ">
                <label for="Votre mot de passe" class="mb-1 mt-2">Mot de passe</label>
                <input class="form-control"  v-model="user.password" type="password" id="Votre mot de passe" placeholder="Au moins 6 caractères dont un chiffre" autocomplete="on" required/>
                <p v-if="errorPassword" class="mt-2 text-danger">Ce champ est obligatoire</p>
            </div>

            <div class="form-group "> 
                <label class="mb-1 mt-2">Avatar</label>
                <br>
                <input  aria-label="envoi image" accept="image/*" type="file" @change="onSelect" class="form-control-file" id="image">
                <p v-if="errorImageUrl" class="mt-2 text-danger">Veuillez choisir un avatar</p>
            </div>

            <button class="submit btn btn-info btn-lg btn-block mt-3" v-on:click.prevent="sendForm" type="submit">S'inscrire</button>

            <p class="createAcc text-right mt-3">Déjà inscrit ? <router-link class="createAccount" v-bind:to="`/`">Se connecter</router-link></p>
        </form>
        <!--{{user}}-->
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
                    password: '',
                    imageUrl: ''
                },

                errorFirstname: false,

                errorLastname: false,

                errorEmail: false,

                errorPassword: false,

                errorImageUrl: false,

                errorSignup: false
            }   
        },

        methods: {
            sendForm(){
             
                if (this.user.firstname == '' || this.user.firstname.length > 50 ) {
                    this.errorFirstname = true
                } 

                if (this.user.lastname == '' || this.user.lastname.length > 50 ) {
                    this.errorLastname = true
                } 

                if (this.user.email == '' || this.user.email.length > 50 ) {
                    this.errorEmail = true
                } 

                if (this.user.password == '') {
                    this.errorPassword = true
                } 
                 
                if (this.user.imageUrl == '') {
                    this.errorImageUrl = true
                } 

                if (this.user.nom == '' || this.user.prenom == '' || this.user.email == ''|| this.user.password == ''|| this.user.email == ''|| this.user.password == ''|| this.user.imageUrl == '') {
                    this.errorSignup = true

                }
                else {
                    const formData = new FormData()
                    formData.append('firstname', this.user.firstname);
                    formData.append('lastname', this.user.lastname);
                    formData.append('email', this.user.email);
                    formData.append('password', this.user.password);
                    formData.append('imageUrl', this.user.imageUrl);

                    axios.post("http://localhost:3000/api/auth/signup", formData)
                    .then(()=>{
                        console.log("Le compte a été créé !")
                        this.$router.push('/success');
                        this.errorFirstname = false
                        this.errorLastname = false
                        this.errorEmail = false
                        this.errorPassword = false
                        this.errorimageUrl = false
                        this.errorSignup = false
                    })
                    .catch((err)=>{
                        console.log(err.response.data);
                        window.alert(err.response.data);
                        this.errorFirstname = false
                        this.errorLastname = false
                        this.errorEmail = false
                        this.errorPassword = false
                        this.errorImageUrl = false
                        this.errorSignup = false
                    })
                }
            },

            onSelect(event) {
                this.user.imageUrl = event.target.files[0];
                console.log(event);
            },

        }
    }
</script>


<style scoped>
   .container {
      padding-top : 250px; 
   }

   input.form-control {
        width : 50%;
        margin-left : auto;
        margin-right : auto;
    }

    input.form-control:valid {
        border:3px solid #0a0 !important;
    }

    input.form-control:invalid {
        border:1px solid grey !important;
    } 

    label, a, p, h1 {
        color: black;
    }

    a:hover {
        color: orangered;
    }

    .router-link {
        color: black;
    }
</style>