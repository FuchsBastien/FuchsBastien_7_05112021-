<template>
    <div class="container">
        <form class="form-inline justify-content-center" @submit="checkForm" method="post" >
            <h1 class="mt-5">Inscription</h1>

            <div class="form-group">
                <label for="Votre prénom" class="mb-2">Prénom</label>
                <input class="form-control" v-model="user.firstname" type="text" id="Votre prénom" placeholder="Marc"  required/>
                <p v-if="errorFirstnameEmpty" class="mt-2 text-danger">Ce champ est obligatoire</p>
                <p v-if="errorFirstnameRegex" class="mt-2 text-danger">Aucun chiffre ou symbole n'est autorisé</p>
            </div>

            <div class="form-group">
                <label for="Votre nom" class="mb-1 mt-2">Nom</label>
                <input class="form-control" v-model="user.lastname" type="text" id="Votre nom" placeholder="Dupont" required/>
                <p v-if="errorLastnameEmpty" class="mt-2 text-danger">Ce champ est obligatoire</p>
                <p v-if="errorLastnameRegex" class="mt-2 text-danger">Aucun chiffre ou symbole n'est autorisé</p>
                
            </div>

            <div class="form-group">
                <label  for="Votre adresse email" class="mb-1 mt-2">Adresse mail</label>
                <input class="form-control" v-model="user.email" type="email" id="Votre adresse email" placeholder="dupontmarc@gmail.com" required/>
                <p v-if="errorEmailEmpty" class="mt-2 text-danger">Ce champ est obligatoire</p>
                <p v-if="errorEmailRegex" class="mt-2 text-danger">Email invalide, voici un exemple de format : votre.nom@domaine.fr </p>
            </div>

            <div class="form-group ">
                <label for="Votre mot de passe" class="mb-1 mt-2">Mot de passe</label>
                <input class="form-control"  v-model="user.password" type="password" id="Votre mot de passe" placeholder="Au moins 6 caractères dont un chiffre" autocomplete="on" required/>
                <p v-if="errorPasswordEmpty" class="mt-2 text-danger">Ce champ est obligatoire</p>
                <p v-if="errorPasswordRegex" class="mt-2 text-danger">Le mot de passe doit comporter au moins 6 caractères dont au moins un chiffre</p>
            </div>

            <div class="form-group "> 
                <label class="mb-1 mt-2">Avatar</label>
                <br>
                <input  aria-label="envoi image" accept="image/*" type="file" @change="onSelect" class="form-control-file" id="image">

                <div class="preview_picture">
                   <img class = "picture" v-if="picturePreview" :src="picturePreview"/>
                </div>
                <p v-if="errorImageUrlEmpty" class="mt-2 text-danger">Veuillez choisir un avatar</p>
            </div>

            <button class="submit btn btn-info btn-lg btn-block mt-3" v-on:click.prevent="sendForm" type="submit">S'inscrire</button>

            <p class="createAcc text-right mt-3">Déjà inscrit ? <router-link class="createAccount" v-bind:to="`/`">Se connecter</router-link></p>
        </form>
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

                picturePreview : "",

                errorFirstnameEmpty: false,
                errorLastnameEmpty: false,
                errorEmailEmpty: false,
                errorPasswordEmpty: false,
                errorImageUrlEmpty: false,

                errorFirstnameRegex: false,
                errorLastnameRegex: false,
                errorPasswordRegex: false,
                errorEmailRegex: false
            }   
        },

        methods: {
            firstnameValidation() {
                const regexFirstnameLastname = /^[A-Z-a-z\s]{3,40}$/;

                if (this.user.firstname == '') {
                    this.errorFirstnameEmpty = true
                } 
                else (
                    this.errorFirstnameEmpty = false
                )

                if (this.user.firstname && !regexFirstnameLastname.test(this.user.firstname)){
                    this.errorFirstnameRegex = true
                } 
                else (
                    this.errorFirstnameRegex = false
                )
            },

            lastnameValidation() {
                const regexFirstnameLastname = /^[A-Z-a-z\s]{3,40}$/;

                if (this.user.lastname == '') {
                    this.errorLastnameEmpty = true
                } 
                else (
                    this.errorLastnameEmpty = false
                )

                if (this.user.lastname && !regexFirstnameLastname.test(this.user.lastname)){
                    this.errorLastnameRegex = true
                } 
                else (
                    this.errorLastnameRegex = false
                )
            },

            emailValidation() {
                 //const regexEmail = /^[A-Z-a-z\s]{3,40}$/;

                if (this.user.email == '') {
                    this.errorEmailEmpty = true
                } 
                else (
                    this.errorEmailEmpty = false
                )

               /* if (this.user.email && !regexEmail.test(this.user.email)){
                    this.errorEmailRegex = true
                } 
                else (
                    this.errorEmailRegex = false
                )*/
            },

            passwordValidation() {
                const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

                if (this.user.password == '') {
                    this.errorPasswordEmpty = true
                } 
                else (
                    this.errorPasswordEmpty = false
                )

                if (this.user.password && !regexPassword.test(this.user.password)){
                    this.errorPasswordRegex = true
                } 
                else (
                    this.errorPasswordRegex = false
                )
            },

            imageUrl() {
                if (this.user.imageUrl == '') {
                    this.errorImageUrlEmpty = true
                } 
                else (
                    this.errorImageUrlEmpty = false
                )
            },
                
            sendForm(){
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
                })
                .catch((err)=>{
                    console.log(err.response.data);
                    window.alert(err.response.data);
                    this.firstnameValidation()
                    this.lastnameValidation()
                    this.emailValidation()
                    this.passwordValidation()
                    this.imageUrl()
                })
            },

            onSelect(event) {
            this.user.imageUrl = event.target.files[0];
            this.picturePreview = URL.createObjectURL(this.user.imageUrl);
            console.log(event);
            },
        },
    }
</script>


<style scoped>
    .container {
        padding-top : 250px; 
        padding-bottom : 100px;
    }

    @media screen and (max-width: 640px) {
        .container {
            padding-top : 100px; ;
        }
    }

    .picture {
        width: 400px;
        height : 200px;
        object-fit: contain;
        margin: 20px 0px 20px 0px;
    }

    @media screen and (max-width: 640px) {
        .picture {
            width: 320px;
            height : 150px;
        }
    }

    input.form-control {
        width : 50%;
        margin-left : auto;
        margin-right : auto;
    }

    @media screen and (max-width: 640px) {
        input.form-control {
            width: 100%;
      }
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