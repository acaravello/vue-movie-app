<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="movies-list-container">
      <div class="button-container">
        <button type="button" class="btn btn-vue check-movies" @click="checkLatestMovies">
        Check latest movies
      </button>
      </div>
      
      <div class="cards-container">
        <div class="card" v-for="movie in latestMovies" :key="movie.id">
          <img :src="imageRootPath + movie.poster_path" class="card-img-top" :alt="movie.original_title" />
          <div class="card-body">
            <h5 class="card-title">{{movie.original_title}}</h5>
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
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      type: "",
      imageRootPath: "https://image.tmdb.org/t/p/original",
      latestMovies: [],
    };
  },
  methods: {
    checkLatestMovies() {
      console.log("Checking latest movies");
      const key = process.env.VUE_APP_API_KEY;
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        )
        .then((response) => {
          console.log("response is");
          console.log(response);
          this.latestMovies = response.data.results;
        })
        .catch((error) => {
          console.log("Error in contacting movie db");
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {

  .movies-list-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 12px auto 48px auto;

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

            h5 {
              line-height: 1.7rem;
              text-transform: uppercase;
              border-bottom: 1px solid #41B883;
              padding-bottom: 5px;
            }

            img {
              border-radius: 0px;
            }

            .card-body {
              background: #35495E;
              background: -webkit-linear-gradient(to top, #41B883, #35495E);
              background: linear-gradient(to top, #41B883, #35495E);

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
</style>
