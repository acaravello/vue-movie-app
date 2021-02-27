<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/" :class="$route.path === '/detail' && !knownForActive ? 'router-link-exact-active' : null">Movies</router-link>
        <router-link to="/tv-series" @click.native="resetState" :class="$route.path === '/series-detail' && !knownForActive ? 'router-link-exact-active' : null">Tv Series</router-link>
        <router-link to="/people" @click.native="resetState" :class="$route.path === '/known-for' || knownForActive ? 'router-link-exact-active' : null">People</router-link>
        <router-link to="/search" @click.native="resetState">Search</router-link>
      </div>
    </header>

      <router-view />
    
    <footer>
      <div class="credits">
        thanks to <div class="thanks"><a href="https://github.com/franci-star/" target="_blank">franci-star</a> </div> for the design
      </div>
    </footer>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  methods: {
    resetState() {
      this.$store.dispatch("setMovieActiveSection", "popular");
      this.$store.dispatch("setKnownForActive", false)
    }
  },
   computed: mapGetters({
    knownForActive: "knownForActive",
  }),
};
</script>

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
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & h1,
  h2 {
    font-weight: 100;
  }

  & h3 {
    color: #267953;
    font-weight: 300;
  }

  &::selection {
    background: transparentize($color: #00e67a, $amount: 0.5);
  }
}

#nav {
  padding: 40px 30px;

  a {
    font-weight: 300;
    color: #fff;
    font-size: 16px;
    margin: 0 20px;
    padding: 8px 10px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    opacity: 0.4;
    transition: color 0.6s ease, border-color 0.4s ease, opacity 0.4s linear;
    padding-bottom: 10px;
    border: 1px solid transparent;
    &:hover {
      opacity: 0.7;
    }

    &.router-link-exact-active {
      color: #00e67a;
      opacity: 1;
      border-color: #00e67a;
    }
  }

}


body {
  background-color: #1c2631 !important;

  a:hover {
    text-decoration: none;
    color: #00cc6d;
  }
  .btn-vue {
    color: #fff;
    background-color: #00e67a;
    border-color: #00e67a;
  }

  .btn-vue:hover {
    color: #fff;
    background-color: #00cc6d;
    border-color: #00cc6d;
  }

  .btn:focus {
    box-shadow: none;
  }
}

footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
      margin-top: auto;

      .credits {
        text-transform: uppercase;
        font-weight: 300;
        display: flex;
        justify-content: center;
        line-height: 16px;
      }
       a {
          margin-left: 5px;
          margin-right: 5px;
          color: #00e67a;
       }


       .thanks {
         margin-left: 2px;
         margin-right: 2px;
         transition: transform 0.8s ease;
         font-weight: 500;
       }

       .thanks:hover {
         
         transform: translateY(-2px);
       }

}
</style>
