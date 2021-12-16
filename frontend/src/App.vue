<template>
  <div id="app">
    <Header v-on="forceRerender()" v-bind:key="headerKey"></Header>
    {{headerKey}}
    <router-view/>
    <Footer></Footer>
  </div>
</template>


<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'

  export default {
      name:'App',

      data : function () {
      return {
        headerKey: 0
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
