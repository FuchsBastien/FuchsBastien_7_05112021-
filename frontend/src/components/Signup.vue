<template>
    <div class="container">
        <form class="form-inline justify-content-center">
            <h1 class="mt-5">Inscription</h1>

            <div class="form-group">
                <label class="mb-1 mt-2" for="Votre prénom">Prénom</label>
                <input class="form-control" v-model="user.firstname" type="text" id="Votre prénom" placeholder="Marc" required/>
                <p v-if="errorFirstnameEmpty" class="mt-2 text-danger">Ce champ est obligatoire</p>
                <p v-if="errorFirstnameRegex" class="mt-2 text-danger">Aucun chiffre ou symbole n'est autorisé</p>
            </div>

            <div class="form-group">
                <label class="mb-1 mt-2" for="Votre nom">Nom</label>
                <input class="form-control" v-model="user.lastname" type="text" id="Votre nom" placeholder="Dupont" required/>
                <p v-if="errorLastnameEmpty" class="mt-2 text-danger">Ce champ est obligatoire</p>
                <p v-if="errorLastnameRegex" class="mt-2 text-danger">Aucun chiffre ou symbole n'est autorisé</p>
                
            </div>

            <div class="form-group">
                <label class="mb-1 mt-2" for="Votre adresse email">Adresse mail</label>
                <input class="form-control" v-model="user.email" type="email" id="Votre adresse email" placeholder="dupontmarc@gmail.com" required/>
                <p v-if="errorEmailEmpty" class="mt-2 text-danger">Ce champ est obligatoire</p>
                <p v-if="errorEmailRegex" class="mt-2 text-danger">Email invalide, voici un exemple de format : votre.nom@domaine.fr </p>
            </div>

            <div class="form-group ">
                <label class="mb-1 mt-2" for="Votre mot de passe">Mot de passe</label>
                <input class="form-control"  v-model="user.password" type="password" id="Votre mot de passe" placeholder="Au moins 6 caractères dont un chiffre" autocomplete="on" required/>
                <p v-if="errorPasswordEmpty" class="mt-2 text-danger">Ce champ est obligatoire</p>
                <p v-if="errorPasswordRegex" class="mt-2 text-danger">Le mot de passe doit comporter au moins 6 caractères dont au moins un chiffre</p>
            </div>

            <div class="form-group "> 
                <label class="mb-1 mt-2" for="Votre avatar">Avatar</label>
                <br>
                <input class="form-control-file" aria-label="envoi image" accept="image/*" type="file" id="Votre avatar" @change="onSelect">
                <p v-if="errorImageUrlEmpty" class="mt-2 text-danger">Veuillez choisir un avatar</p>

                <div class="preview_picture">
                   <img class = "picture" v-if="picturePreview" :src="picturePreview"/>
                </div>
            </div>

            <button class="submit btn btn-info btn-lg btn-block mt-3" v-on:click.prevent="sendForm" type="submit">S'inscrire</button>
        </form>

        <p class="text-right mt-3">Déjà inscrit ? <router-link class="createAccount" v-bind:to="`/`">Se connecter</router-link></p>
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

                errorFirstnameEmpty: false,
                errorLastnameEmpty: false,
                errorEmailEmpty: false,
                errorPasswordEmpty: false,
                errorImageUrlEmpty: false,

                errorFirstnameRegex: false,
                errorLastnameRegex: false,
                errorPasswordRegex: false,
                errorEmailRegex: false,

                picturePreview : "",
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
                const regexEmail = /^(([^<>()[\].,;:s@"]+(.[^<>()[\].,;:s@"]+)*)|(".+"))@(([^<>()[\].,;:s@"]+.)+[^<>()[\].,;:s@"]{2,})$/;

                if (this.user.email == '') {
                    this.errorEmailEmpty = true
                } 
                else (
                    this.errorEmailEmpty = false
                )

                if (this.user.email && !regexEmail.test(this.user.email)){
                    this.errorEmailRegex = true
                } 
                else (
                    this.errorEmailRegex = false
                )
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
                    this.firstnameValidation()
                    this.lastnameValidation()
                    this.emailValidation()
                    this.passwordValidation()
                    this.imageUrl()
                })
            },

            fichier () {
            
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