<template>
    <div>
        <div class="container">
            <form class="form-inline justify-content-center">
                <h3 class="mt-5">Inscription</h3>

                <div class="form-group">
                    <label class="mb-2">Prénom</label>
                    <input class="form-control" v-model="user.firstname" type="text" name="Votre prénom" placeholder="Marc"  required/>
                </div>

                <div class="form-group">
                    <label class="mb-1 mt-2">Nom</label>
                    <input class="form-control" v-model="user.lastname" type="text" name="Votre nom" placeholder="Dupont" required/>
                </div>

                <div class="form-group">
                    <label class="mb-1 mt-2">Adresse mail</label>
                    <input class="form-control" v-model="user.email" type="email" name="Votre adresse email" placeholder="dupontmarc@gmail.com"  required/>
                </div>

                <div class="form-group ">
                    <label class="mb-1 mt-2">Mot de passe</label>
                    <input class="form-control"  v-model="user.password" type="password" name="Votre mot de passe" placeholder="Au moins 6 caractères dont un chiffre" autocomplete="on" required/>
                </div>

               <div class="form-group "> 
                    <label class="mb-1 mt-2">Avatar</label>
                    <br>
                    <input  aria-label="envoi image" accept="image/*" type="file" @change="onSelect" class="form-control-file" id="image">
                    <!-- <button _ngcontent-fxu-c7 mat-raised-button class = "mat-raised-button mat-button-base mat-primary">
                        <span class="mat-button-wrapper">Ajouter avatar</span>
                        <div class="mat-button-ripple mat-ripple" matripple></div>
                        <div class="mat-button-focus-overlay"></div>
                    </button>-->
                </div>

                <button class="submit btn btn-info btn-lg btn-block mt-3" v-on:click.prevent="sendForm" type="submit">S'inscrire</button>

                <p v-if="errorSignup" class="mt-2 text-danger"> Inscription impossible, veuillez remplir tous les champs et choisir un avatar</p>

                <p class="createAcc text-right mt-3">Déjà inscrit ? <router-link class="createAccount" v-bind:to="`/`">Se connecter</router-link></p>
            </form>
            <!--{{user}}-->
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
                    password: '',
                    imageUrl: ''
                },
                
                errorSignup: false,
            }   
        },

        methods: {
            sendForm(){

                if (this.user.nom == '' || this.user.prenom == '' || this.user.email == ''|| this.user.password == ''|| this.user.email == ''|| this.user.password == ''|| this.user.imageUrl == '') {
                    this.errorSignup = true
                    return
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
                        this.errorSignup = false
                    })
                    .catch(()=>{
                        console.log("Adresse mail existe déjà !");
                        window.alert('Adresse mail existe déjà !');
                        this.errorSignup = true
                    })
                }
            },

            onSelect(event) {
                this.user.imageUrl = event.target.files[0];
                console.log(event);
            }
        }
    }
</script>


<style scoped>
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