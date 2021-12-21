<template>
  <div id="app" >
    <Header :key="headerKey"></Header>
    <router-view v-on:connexion="forceRerender()"></router-view>
    <Footer></Footer>
  </div>
</template>


<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'

  export default {
    name:'App',

    data () {
      return {
        headerKey: 0,
      }
    },

    components: {
      Header,
      Footer
    },

    methods: {
      forceRerender() {
      this.headerKey += 1;
      }
    }
  }
</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #dfe3ee;
  }
</style>
