<template>
    <div v-if="user" id="nav" >
        <img class = img_footer src='http://localhost:3000/images/logo-footer.png' alt="logo-footer">
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
         position: fixed;
        bottom : 0;
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
        color: grey;
        text-decoration: none;
        cursor: pointer;   
    }

    #nav a:hover, #nav a.router-link-exact-active {
        color: pink;
    }

    .img_footer {
        height: 70px;
        width: 400px;
    }
 </style>