<template>
  <div id="app">
    <header>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" id="buttonMobileMenu" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
     <span class="" role="button" ><menuIcon /></span>
  </button>

  <div class="collapse navbar-collapse nav-container" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
                <router-link to="/" :class="$route.path === '/detail' && !knownForActive || $route.path === '/cast' && this.castFrom === 'movie' ? 'router-link-exact-active' : null">Movies</router-link>
      </li>
      <li class="nav-item">
                <router-link to="/tv-series" @click.native="resetStateComplete" :class="$route.path === '/series-detail' && !knownForActive  || $route.path === '/cast' && this.castFrom === 'tv' ? 'router-link-exact-active' : null">Tv Series</router-link>
      </li>
      <li class="nav-item">
              <router-link to="/people" @click.native="resetStateComplete" :class="$route.path === '/known-for' || $route.path === '/filmography' || knownForActive ? 'router-link-exact-active' : null">People</router-link>
      </li>
      <li class="nav-item">
                <router-link to="/search" @click.native="resetState">Search</router-link>
      </li>
      
    </ul>
  </div>
</nav>
    </header>

      <router-view />
    
    <footer>
      <div class="credits">
        thanks to <div class="thanks"><a href="https://github.com/francescaformica" target="_blank">Francesca Formica</a> </div> for the design
      </div>
    </footer>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import MenuIcon from './assets/icons/menuIcon.vue';

export default {

  components: {
      MenuIcon,
    },
  methods: {

    resetState() {
      this.$store.dispatch("setMovieActiveSection", "popular");
      this.$store.dispatch("setKnownForActive", false);
      this.$store.dispatch("setSearchActiveSection", "movies");
     
    },

    resetStateComplete() {
      this.$store.dispatch("setMovieActiveSection", "popular");
      this.$store.dispatch("setKnownForActive", false);
      this.$store.dispatch("setSearchActiveSection", "movies");
      this.$store.dispatch("resetSearchLists");
    },
  },
   computed: mapGetters({
    knownForActive: "knownForActive",
    castFrom: "castFrom",
  }),

  beforeMount() {
    this.$store.dispatch("checkLatestMovies");
    this.$store.dispatch("checkPopularMovies");
    this.$store.dispatch("checkPopularTvSeries");
    this.$store.dispatch("checkPopularPeople");
  }
};
</script>

<style lang="scss">
@import "~@fontsource/roboto/index.css";
@import "~@fontsource/roboto/100.css";
@import "~@fontsource/roboto/300.css";
@import "~@fontsource/roboto/500.css";

$small: 991px;
$medium: 992px;


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

  header {
     svg {
            width:15px;
            height: auto;
            fill: #00e67a;
            margin-right: 8px;
            margin-bottom: 3px;
      }
  }
}

.navbar-expand-lg {
  justify-content: center !important;
}

.navbar-collapse {
  flex-grow: initial !important;
}

.navbar {
  padding: 0px !important;

  &.bg-light {
    margin-top: 10px;
    background-color: transparent !important;
  }
}

.nav-container {
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

@media screen and (max-width: $small) {

  .navbar-expand-lg {
    justify-content: flex-end !important;
  } 

  .navbar-toggler {
    line-height: inherit !important;
    border: none !important;
  }

  .navbar.bg-light {
    margin-bottom: 10px !important;
  }

  .home {
     .selector-container {
      justify-content: center !important;
      margin-right: 0px !important;

      .type-selector {
        line-height: 14px !important;
        font-size: 0.8rem;
      }
    }
  }

  .nav-item {
    margin-bottom: 5px;
  }

  .nav-container a {
        font-size: 0.8rem;
        margin: 0 10px;
        padding: 4px 9px;
        border-radius: 2px;
        text-transform: uppercase;
        transition: color 0.6s ease, border-color 0.4s ease, opacity 0.4s linear;
        border: 1px solid transparent;
  }

  footer {
    padding: 30px 6px;
  }

}

</style>
