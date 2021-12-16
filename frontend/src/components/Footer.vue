<template>
    <div id="nav" >
        <img class = "img_footer" src='http://localhost:3000/images/logo-footer.png' alt="logo-footer">
    </div>
</template>


<script>
    export default {
        name : 'Header',
    }
</script>


<style scoped>
    #nav {
        position: fixed;
        bottom : 0;
        left : 0;
        width: 100%;
        margin: auto;
        padding: 5px;
        font-size: 1.3em;
        background-color: #2c3e50;;
        height: auto; 
        align-items: center;
    }

    .img_footer {
        height: 70px;
        width: 400px;
    }
 </style>