<template>
<div>
    <ul class="liste">
         <!--on crée une boucle pour la liste de film avec un index unique avec v-bind:key--->
        <li v-for="(film, index) in myArr" v-bind:key="index">
            <div class="card">
                <div class="card-body">
                    Titre : {{film.titre}}
                    <br>
                    Date : {{film.date}}
                </div>
            </div>
        </li>
    </ul>
    <br>
    <!--on crée un titre qui sera modifié-->
    <p>{{txt}}</p>
     <!--au click du bouton on applique la method changeTitre-->.
    <div v-on:click="changeTitre" class="btn btn-danger mt-2">modifie le titre</div>

    <!--au click du bouton on applique la method suppFilm. 
    ATTENTION si on fait 2 mêmes tableaux et qu'on clique sur un des 2 boutons cela supprimera 1 film dans les 2 tableaux
     car ils viennent de la même data = valeur de référence (tableau et objet) -->
    <div v-on:click="supprFilm" class="btn btn-danger mt-2">supprime le film</div>
    
    <!--au click du bouton on applique la method suppTxt.
    ATTENTION si on fait 2 mêmes titres et qu'on clique sur un des 2 boutons seul 1 mot sera supprimé = valeur primitive 
    (string, number, bolean) -->
    <div v-on:click="supprTxt" class="btn btn-danger mt-2">supprime le txt</div>

     <!--texte de contenue2 intégré au slot-->
    <slot></slot>
    <!--ou <slot>texte slot</slot> sans écrire texte slot dans contenu2-->

    <!--on associe le template nommé à ce slot-->
    <slot name = 'info'></slot>

    
</div>
</template>




<script>
//on importe l'instance bus
//import {bus} from '../main'

export default {
    name: 'Liste2',
    data (){
        return {  
        }
    },

    methods: {
        //on applique une methode pour supprimer un film du tableau
        /*supprFilm: function(){
          this.myArr.pop()
        },
        //on applique une methode pour supprimer un texte
          supprTxt: function(){
          this.txt=''
        },*/
           changeTitre: function(){
          //on applique une methode pour changer le titre du parent contenu2.vue en utilisant this.$emit    
          this.$emit('changeTitre','Mon nouveau titre')
          //on applique une methode pour changer le titre du header en utilisant bus.$emit
         //bus.$emit('changeTitre','Titre changé avec le bus!')
        }
        
    },
    props : ['myArr', 'txt'] 
}

</script>




<style scoped src="./Liste.css">
</style>

