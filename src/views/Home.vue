<template>
  <div class="home">
    <div class="selector-container">
      <button class="type-selector btn" @click="searchPopular" :class="movieActiveSection === 'popular' ? 'active' : null">Popular</button>
      <button class="type-selector btn" @click="searchLatest" :class="movieActiveSection === 'latest' ? 'active' : null">Latest</button>
    </div>
    <div class="movies-list-container">
      <div class="cards-container" v-if="movieActiveSection === 'popular'">
        <div class="card" v-for="movie in popularMovies" :key="movie.id" @click="toMovieDetail(movie)">
          <img :src="imageRootPath + movie.poster_path" class="card-img-top" :alt="movie.title" />
          <div class="card-body">
            <h5 class="card-title">{{movie.title}}</h5>
            <p class="card-text">
              {{movie.overview}}
            </p>
          </div>
        </div>
      </div>
       <div class="cards-container" v-if="movieActiveSection === 'latest'">
        <div class="card" v-for="movie in latestMovies" :key="movie.id" @click="toMovieDetail(movie)">
          <img :src="imageRootPath + movie.poster_path" class="card-img-top" :alt="movie.titles" />
          <div class="card-body">
            <h5 class="card-title">{{movie.title}}</h5>
            <p class="card-text">
              {{movie.overview}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "Home",
  components: {
  },

  data() {
    return {
      imageRootPath: "https://image.tmdb.org/t/p/original",
    };
  },

  computed: mapGetters({
    popularMovies: "popularMovies",
    latestMovies: "latestMovies",
    movieActiveSection: "movieActiveSection",
  }),

  methods: {

    toMovieDetail(movie) {
      this.$store.dispatch("setMovieDetail", movie)
      this.$router.push({path: "/detail"})
    },

    searchPopular() {
      if(this.movieActiveSection !== "popular") {
        this.$store.dispatch("setMovieActiveSection", "popular")
      }
    },

    searchLatest() {
      if(this.movieActiveSection !== "latest") {
        this.$store.dispatch("setMovieActiveSection", "latest")
      }
    }
  },

  
};
</script>

<style lang="scss" scoped>

.home {

  margin-top: 30px;

  .selector-container {
    display: flex;
    justify-content: flex-end;
    margin-right: 60px;
    margin-bottom: 60px;

    .type-selector {
          color: #fff;
          border-color: transparent;
          text-transform: uppercase;
          margin-left: 10px;
          margin-right: 10px;
          opacity: 1;
          transition: opacity 0.8s ease, color 0.6s ease, border-color 0.4s ease;
          line-height: 20px;

          &:hover {
            opacity: 0.8;
          }

          &.active {
            color: #00E67A;
            border: 1px solid #00E67A;
            transition: border-color 0.8s ease, opacity 0.8s ease;
            opacity: 1;
            background-color: transparent;
          }

          &.active:hover {
            border-bottom-color: rgba(0,230,122, 0.8);
            opacity: 0.8
          }
    }
  }

  .movies-list-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 48px auto 24px auto;

    .button-container {
      width: 200px;
      display: flex;
      justify-content: center;
      margin:auto;
    }

    .cards-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;

      .card {
            display: flex;
            min-width: 0;
            background-clip: border-box;
            border-radius: 0px;
            flex-direction: column;
            width: 18rem;
            margin-left: 24px;
            margin-right: 24px;
            margin-bottom: 48px;
            border:none;
            box-shadow:  0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
            cursor: pointer;
            opacity:1;
            transition: opacity 0.8s ease;
            background: -webkit-linear-gradient(to top, #35495E, #00b35f);
            background: linear-gradient(to top, #35495E, #00b35f);

            &:hover {
              opacity: 0.6;
            }

            h5 {
              line-height: 1.7rem;
              text-transform: uppercase;
              border-bottom: 1px solid #00b35f;
              padding-bottom: 5px;
            }

            img {
              border-radius: 0px;
            }

            .card-body {
              background: #35495E;
              background: -webkit-linear-gradient(to top, #00b35f, #35495E);
              background: linear-gradient(to top, #00b35f, #35495E);

              .card-text {
              font-size: 13px;
              line-height: 20px;
              }

            }
      }
    }

    .check-movies {
      margin-bottom: 24px;
    }
  }
}

$small: 991px;
$medium: 992px;

@media screen and (max-width: $small) {

  .card {
    width: 15rem !important;
  }
  
}

</style>
