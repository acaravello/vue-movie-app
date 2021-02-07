import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {

    latestMovies: null,
    movieDetail: null,
    backdropPath: null,
    tagline: null,
    title: null,
    release_date: null,
    vote_average: null,
    budget: null,
    revenue: null,

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

    tagline(state) {
      return state.tagline
    },

    title(state) {
      return state.title
    },

    release_date(state) {
      return state.release_date;
    },

    vote_average(state) {
      return state.vote_average;
    },

    budget(state) {
      return state.budget;
    },

    revenue(state) {
      return state.revenue;
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

    setTagline(state, userData) {
      state.tagline = userData;
    },

    setTitle(state, userData) {
      state.title = userData
    },

    setReleaseDate(state, userData) {
      state.release_date = userData;
    },

    setVoteAverage(state, userData) {
      state.vote_average = userData;
    },

    setBudget(state, userData) {
      if(userData && userData !== 0) {
        state.budget = " $" + userData
      } else {
        state.budget = null;
      }
    },

    setRevenue(state, userData) {
      if(userData && userData !== 0) {
        state.revenue = " $" + userData
      } else {
        state.revenue = null;
      }
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

      //cancel previous data
      commit("setTagline", "");
      commit("setTitle", "");
      commit("setVoteAverage", "");
      commit("setBudget", null),
      commit("setRevenue", null)

      if(state.movieDetail && state.movieDetail.id) {
        axios.get(`https://api.themoviedb.org/3/movie/${state.movieDetail.id}?api_key=${key}&language=en-US`)
        .then(response => {
          console.log("response data");
          console.log(response.data)
          commit("setTagline", response.data.tagline);
          commit("setTitle", response.data.title);
          commit("setReleaseDate", response.data.release_date);
          commit("setVoteAverage", response.data.vote_average);
          commit("setBudget", response.data.budget);
          commit("setRevenue", response.data.revenue)
        })
        .catch(error => {
          console.log("Error in contacting movie db");
          console.log(error)
        })
      }

    }
  },

})
