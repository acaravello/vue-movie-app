<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </header>

    <router-view />
  </div>
</template>

<style lang="scss">

  @import "~@fontsource/roboto/index.css";
  @import "~@fontsource/roboto/100.css";
  @import "~@fontsource/roboto/300.css";
  @import "~@fontsource/roboto/500.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fefefe;
  font-family: "Roboto";

  & h1 {
    font-weight: 100;
  }

  & h3 {
    color:   #267953;
  }

  &::selection {
    background: transparentize($color: #42b983, $amount: 0.5)
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #fff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

}

body {
  background-color: #1c2631 !important;

  a:hover {
    text-decoration: none ;
    color: #35ad75 ;
  }
  .btn-vue {
    color: #fff;
    background-color: #42b983;
    border-color: #42b983;
  }

  .btn-vue:hover {
    color: #fff;
    background-color: #35ad75;
    border-color: #35ad75;
  }

  .btn:focus {
    box-shadow: none;
  }

}
</style>
