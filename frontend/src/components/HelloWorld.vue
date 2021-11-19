<!--un seul bloc (ici div), template n'est pas un bloc-->
<template>
  <div class="liste">
    <h1>mon premier composant {{nom}}</h1>
  </div>
</template>

<!--logique où l'on peut avoir le nom du composant, les props et même des datas-->
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data : function () {
             return{
             nom: 'John Doe',
             }    
}
}
</script>

<!--"scoped" veut dire que le style sera appliqué qu'à ce composant
on peut l'écrire ici ou faire des fichiers css à part et les importer -->

<style scoped src="./Liste.css">
</style>
