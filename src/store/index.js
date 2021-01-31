import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latestMovies: null
  },
  getters: {
    latestMovies(state) {
      return state.latestMovies;
    }
  },
  mutations: {
    setLatestMovies(state, userData) {
      state.latestMovies = userData;
    }
  },
  actions: {
    checkLatestMovies({commit}) {
      const key = process.env.VUE_APP_API_KEY;
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        )
        .then((response) => {
          console.log("response is");
          console.log(response);
          commit("setLatestMovies", response.data.results)
          this.latestMovies = response.data.results;
        })
        .catch((error) => {
          console.log("Error in contacting movie db");
          console.log(error);
        });
    },
  },
})
