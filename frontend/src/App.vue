<template>
<div id="app">
  <div id="nav">
     <router-link to="/">Tous les Articles</router-link> 
     <router-link to="/CreateArticles">Publier un article</router-link> 
     <router-link to="/Account">Mon compte</router-link>
     
  </div>

  <router-view/>
</div>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {

 
  display: flex;
    justify-content: space-around;
    margin: auto;
    padding: 30px;
    font-size: 1.3em;
    background-color: grey;
    height: auto;
    
  }


#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: orangered;;
}
</style>
