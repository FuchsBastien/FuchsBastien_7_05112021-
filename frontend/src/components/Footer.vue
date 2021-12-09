<template>
    <div v-if="user" id="nav" >
        <img class = img_footer src='http://localhost:3000/images/logo-footer.png' alt="">
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

    #nav a:hover, #nav a.router-link-exact-active {
        color: pink;
    }

    .img_footer {
        height: 100px;
        width: 500px;
    }
 </style>