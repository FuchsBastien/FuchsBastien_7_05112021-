<template>
 <Articles></Articles>
  <!--<CreateArticles></CreateArticles-->
</template>



<script>
//importer components
import Articles from './components/Articles.vue'
//import CreateArticles from './components/CreateArticles.vue'


export default {
  name: 'App',
  components: {
    //importer components
    Articles,
    //CreateArticles
   
  }
}
</script>


<style>
/*on annule le css de l'application*/
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
