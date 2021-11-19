<template>
<div>
    <ul class="liste">
        <!--on crée une boucle pour la liste de fruits avec un index unique avec v-bind:key--->
        <li v-for="(fruits, index) in fruits" v-bind:key="index">{{fruits}}
        </li>
    </ul>
    <!--on appelle la props prenom-->
    <p>{{prenom}}</p>
    <!--on appelle la method reversing (on ne l'appelle que dans Liste.vue)-->
    <p>{{reversing ()}}</p>
</div>
</template>



<script>
export default {
    name: 'Liste',
    //data () = data : function ()
    data (){
        return {
            fruits : ['Orange','Papaye','Fraise']
        }
    },
    //propriétés qui ont les valeurs prenom et taille et legumes qu'on passe du l'enfant Liste.vue au parent Contenu.vue
    props : ['prenom', 'taille', 'legume'],
     /*on peut mettre cela pour préciser les types de données des props 
     props : {
        prenom {
            type : String
        }
        taille {
            type : Number
        }
        legume {
            type : String
        }
    }*/

    //on applique une method pour recupérer prenom (qui est considéré comme un data) pour inverser la donnée
    methods: {
        reversing : function () {
            return this.prenom.split('').reverse().join('')
            
        }
    }
}
</script>



<!--"scoped" veut dire que le style sera appliqué qu'à ce composant
on peut l'écrire ici ou faire des fichiers css à part et les importer -->

<!--soit on importe le fichier css à part avec src...--> 
<style scoped src="./Liste.css">
</style>


<!--ou on écrit directement le css dans style. Ici c'est l'import qui prime-->
<style scoped src="./Liste.css">
ul {
    background: orange;
}
p {
    color : red;
}
</style>