<template>
<div class="header-top">
    <p>{{titre}}</p>
</div>
</template>

<script>
//on importe l'instance bus
//import {bus} from '../main' 

export default {
   name : 'Header',
   data : function () {
       return {
           titre : 'Mon titre de base'
       }
   },
     beforeCreate (){
       console.log("Il va être créé");
   },
   //on applique le changement de titre de header.vue au click du bouton "modifier le titre" de liste.vue du header
   /*created(){
       console.log("le composant est créé!");
       bus.$on('changeTitre', (data) => {
           this.titre = data
       })
   }*/
    beforeMount (){
    console.log("Il va être monté dans le DOM");
   },
    mounted (){
    console.log("Il est intégré dans le DOM");
   },
    beforeUpdated (){
    console.log("Il va se mettre à jour");
   },
    updated (){
    console.log("Le composant s'est mis à jour");
   },
}
</script>


<style scoped>
.header-top{
    position: fixed;
    top: 0;
    height :50px;
    background: #333;
    color : #f1f1f1;
    width : 100%;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
 }
 </style>