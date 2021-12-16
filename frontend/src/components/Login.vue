<template>
    <div class="container">   
        <form>
            <h1 class="mt-5">Connexion</h1>
            <div class="form-group col-md mb-2">
                <label for="email" class="mb-1">Adresse email</label>
                <input class="form-control form-control-lg" v-model="user.email" type="email" id="email" title="Entrez votre adresse email" required/>
                <p v-if="errorEmail" class="mt-2 text-danger">Ce champ est obligatoire</p>  
            </div>

            <div class="form-group col-md">
                <label for="mot de passe" class="mb-1">Mot de passe</label>
                <input class="form-control form-control-lg" v-model="user.password" type="password" id="mot de passe" title="Entrez votre mot de passe" autocomplete="on" required/>
                <p v-if="errorPassword" class="mt-2 text-danger">Ce champ est obligatoire</p>
            </div>

            <button v-on:click.prevent="sendForm" type="submit" class="btn btn-info btn-lg btn-block mt-3">Se connecter</button>
        </form>
        <br>

        <router-link class="createAccount" v-bind:to="`/contact`">Mot de passe oublié?</router-link>
      
        <p class="text-right mt-3">Vous n'avez pas de compte ? <router-link class="createAccount" v-bind:to="`/signup`">Créez-en un</router-link></p>   
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name :'Login',

        data() {
            return {
                user:{
                    email: '',
                    password: '',
                },
                errorEmail: false,

                errorPassword: false,
            }
        },

        methods: {
            sendForm(){
                if (this.user.email == '') {
                    this.errorEmail = true
                } 

                if (this.user.password == '') {
                    this.errorPassword = true
                } 

                else {
                    axios.post("http://localhost:3000/api/auth/login", this.user)
                    .then((res) => {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('Id', res.data.userId)
                        localStorage.setItem('Admin', res.data.userAdmin)
                        localStorage.setItem('Firstname', res.data.userFirstname)
                        localStorage.setItem('ImageUrl', res.data.userImageUrl)
                        this.$router.push('/articles')
                        this.errorEmail = false
                        this.errorPassword = false
                    })
                    .catch((err) =>{ 
                        console.log(err.response.data);
                        window.alert(err.response.data);
                        this.errorEmail = false
                        this.errorPassword = false
                    })
                }  
                
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
</style>
