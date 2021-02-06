import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {

    latestMovies: null,
    movieDetail: null,
    backdropPath: null,
    movieDetailComplete: null,
    tagline: null

  },

  getters: {


    latestMovies(state) {
      return state.latestMovies;
    },

    movieDetail(state) {
      return state.movieDetail;
    },

    backdropPath(state) {
      return state.backdropPath;
    },

    movieDetailComplete(state) {
      console.log("getter of moviedetail complete")
      return state.movieDetailComplete;
    },

    tagline(state) {
      return state.tagline
    }

  },

  mutations: {

    setLatestMovies(state, userData) {
      state.latestMovies = userData;
    },

    setMovieDetail(state, userData) {
      console.log("userdata");
      console.log(userData)
      state.movieDetail = userData;
    },

    setBackdropPath(state, userData) {
      state.backdropPath = userData;
    },

    setMovieDetailComplete(state, userData) {
      state.movieDetailComplete = userData
    },

    setTagline(state, userData) {
      state.tagline = userData;
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
          console.log("latest movies are");
          console.log(response);
          commit("setLatestMovies", response.data.results)
          this.latestMovies = response.data.results;
        })
        .catch((error) => {
          console.log("Error in contacting movie db");
          console.log(error);
        });
    },

    setMovieDetail({commit}, element) {
      commit("setMovieDetail", element);
      commit("setBackdropPath", element.backdrop_path);
    },

    getMovieDetailFromId({commit, state}) {
      const key =process.env.VUE_APP_API_KEY;
      if(state.movieDetail && state.movieDetail.id) {
        axios.get(`https://api.themoviedb.org/3/movie/${state.movieDetail.id}?api_key=${key}&language=en-US`)
        .then(response => {
          commit("setMovieDetailComplete", response.data);
          commit("setTagline", response.data.tagline);
        })
        .catch(error => {
          console.log("Error in contacting movie db");
          console.log(error)
        })
      }
    }
  },

})
