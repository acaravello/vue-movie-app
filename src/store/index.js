import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {

    //Movies
    latestMovies: null,
    popularMovies: null,
    movieDetail: null,
    backdropPath: null,
    tagline: null,
    title: null,
    release_date: null,
    vote_average: null,
    budget: null,
    revenue: null,
    movieActiveSection: "popular",
    //Tv Series
    popularTvSeries: null,
    tvSeriesDetail:null,
    tvSeriesBackdropPath: null,
    seriesTitle: null,
    seriesTagline: null,
    seriesFirstAirDate: null,
    seriesVoteAverage: null,
    seriesSeasons: null,
    seriesEpisodes: null,

    //People
    popularPeople: null,
    knownForActive: false,
    knownForDetail: null,
    knownForCredits: null,
    actorSelected: null,
    knownForBackdropPath: null,

    //Search
    searchActiveSection: "movies",
  },

  getters: {

    //Movies
    latestMovies(state) {
      return state.latestMovies;
    },

    popularMovies(state) {
      return state.popularMovies;
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
    },

    movieActiveSection(state) {
      return state.movieActiveSection;
    },

    //Tv series
    popularTvSeries(state) {
      return state.popularTvSeries;
    },

    tvSeriesDetail(state) {
      return state.tvSeriesDetail;
    },

    tvSeriesBackdropPath(state) {
      return state.tvSeriesBackdropPath;
    },

    seriesTitle(state) {
      return state.seriesTitle;
    },

    seriesTagline(state) {
      return state.seriesTagline;
    },

    seriesFirstAirDate(state) {
      return state.seriesFirstAirDate;
    },

    seriesVoteAverage(state) {
      return state.seriesVoteAverage;
    },

    seriesSeasons(state) {
      return state.seriesSeasons;
    },

    seriesEpisodes(state) {
      return state.seriesEpisodes;
    },

    //People
    popularPeople(state) {
      return state.popularPeople;
    },

    knownForActive(state) {
      return state.knownForActive;
    },

    knownForDetail(state) {
      return state.knownForDetail;
    },

    knownForCredits(state) {
      return state.knownForCredits;
    },

    actorSelected(state) {
      return state.actorSelected;
    },

    knownForBackdropPath(state) {
      return state.knownForBackdropPath;
    },

    //Search
    searchActiveSection(state) {
      return state.searchActiveSection
    }

  },

  mutations: {

    //Movies
    setLatestMovies(state, userData) {
      state.latestMovies = userData;
    },

    setPopularMovies(state, userData) {
      state.popularMovies = userData;
    },

    setMovieDetail(state, userData) {
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
        let userDataFormatted = userData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        state.budget = " $" + userDataFormatted;
      } else {
        state.budget = null;
      }
    },

    setRevenue(state, userData) {
      if(userData && userData !== 0) {
        let userDataFormatted = userData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        state.revenue = " $" + userDataFormatted;
      } else {
        state.revenue = null;
      }
    },

    setMovieActiveSection(state, userData) {
      state.movieActiveSection = userData;
    },

    //Tv Series
    setPopularTvSeries(state, userData) {
      state.popularTvSeries = userData;
    },

    setTvSeriesDetail(state, userData) {
      state.tvSeriesDetail = userData;
    },

    setTvSeriesBackdropPath(state, userData) {
      state.tvSeriesBackdropPath = userData;
    },

    setSeriesTitle(state, userData) {
      state.seriesTitle = userData;
    },

    setSeriesFirstAirDate(state, userData) {
      state.seriesFirstAirDate = userData;
    },

    setSeriesVoteAverage(state, userData) {
      state.seriesVoteAverage = userData;
    },

    setSeriesSeasons(state, userData) {
      state.seriesSeasons = userData;
    },

    setSeriesEpisodes(state, userData) {
      state.seriesEpisodes = userData;
    },

    setSeriesTagline(state, userData) {
      state.seriesTagline = userData;
    },

    //People
    setPopularPeople(state, userData) {
      state.popularPeople = userData;
    },

    setKnownForActive(state, userData) {
      state.knownForActive = userData;
    },

    setKnownForDetail(state, userData) {
      state.knownForDetail = userData;
    },

    setKnownForCredits(state, userData) {
      state.knownForCredits = userData;
    },

    setActorSelected(state, userData) {
      state.actorSelected = userData;
    },

    setKnownForBackdropPath(state, userData) {
      state.knownForBackdropPath = userData;
    },

    //Search
    setSearchActiveSection(state, userData) {
      state.searchActiveSection = userData;
    },

  },

  actions: {

    //Movies
    checkLatestMovies({commit}) {
      const key = process.env.VUE_APP_API_KEY;
      axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
          
        )
        .then((response) => {
          console.log("latest movies are");
          console.log(response);
          commit("setLatestMovies", response.data.results)
        })
        .catch((error) => {
          console.log("Error in contacting movie db");
          console.log(error);
        });
    },

    checkPopularMovies({commit}) {
      const key = process.env.VUE_APP_API_KEY;
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
          
        )
        .then((response) => {
          console.log("popular movies are");
          console.log(response);
          commit("setPopularMovies", response.data.results)
        })
        .catch((error) => {
          console.log("Error in contacting movie db");
          console.log(error);
        });
    },

    setMovieDetail({commit}, element) {
      commit("setMovieDetail", element);
      commit("setBackdropPath", element.backdrop_path);
      //cancel previous data
      commit("setTagline", "");
      commit("setTitle", "");
      commit("setVoteAverage", "");
      commit("setBudget", null),
      commit("setRevenue", null)
    },

    getMovieDetailFromId({commit, state}) {

      const key =process.env.VUE_APP_API_KEY;
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
    },

    setMovieActiveSection({commit}, element) {
      commit("setMovieActiveSection", element);
    },

    //TvSeries
    checkPopularTvSeries({commit}) {
      const key = process.env.VUE_APP_API_KEY;
      axios
        .get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
          
        )
        .then((response) => {
          console.log("popular tv series are");
          console.log(response);
          commit("setPopularTvSeries", response.data.results)
        })
        .catch((error) => {
          console.log("Error in contacting movie db");
          console.log(error);
        });
    },

    setPopularTvSeries({commit}, element) {
      commit("setPopularTvSeries", element)
    },

    setTvSeriesDetail({commit}, element) {
      commit("setTvSeriesDetail", element);
      commit("setTvSeriesBackdropPath", element.backdrop_path);
      //cancel previous data
      commit("setSeriesTitle", "");
      commit("setSeriesTagline", "")
      commit("setSeriesFirstAirDate", "");
      commit("setSeriesVoteAverage", "");
      commit("setSeriesSeasons", "");
      commit("setSeriesEpisodes", "");
    },

    getTvSeriesDetailFromId({commit, state}) {

      const key =process.env.VUE_APP_API_KEY;
      if(state.tvSeriesDetail && state.tvSeriesDetail.id) {
        axios.get(`https://api.themoviedb.org/3/tv/${state.tvSeriesDetail.id}?api_key=${key}&language=en-US`)
        .then(response => {
          console.log("response data");
          console.log(response.data)
          commit("setSeriesTitle", response.data.name);
          commit("setSeriesTagline", response.data.tagline);
          commit("setSeriesFirstAirDate", response.data.first_air_date);
          commit("setSeriesVoteAverage", response.data.vote_average);
          commit("setSeriesSeasons", response.data.number_of_seasons);
          commit("setSeriesEpisodes", response.data.number_of_episodes);
        })
        .catch(error => {
          console.log("Error in contacting movie db");
          console.log(error)
        })
      }
    },

    //People 
    checkPopularPeople({commit}) {
      const key = process.env.VUE_APP_API_KEY;
      axios
        .get(
          `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`
          
        )
        .then((response) => {
          console.log("popular people are");
          console.log(response);
          commit("setPopularPeople", response.data.results)
        })
        .catch((error) => {
          console.log("Error in contacting movie db");
          console.log(error);
        });
    },

    setPopularPeople({commit}, element) {
      commit("setPopularPeople", element)
    },

    setKnownForActive({commit}, element) {
      commit("setKnownForActive", element)
    },

    checkActorSelectedData({commit, state}) {
      const key = process.env.VUE_APP_API_KEY;
      if(state.actorSelected && state.actorSelected.id) {
        axios
        .get(
          `https://api.themoviedb.org/3/person/${state.actorSelected.id}?api_key=${key}&language=en-US`
          
        )
        .then((response) => {
          console.log("known for details are");
          console.log(response.data);
          commit("setKnownForDetail", response.data)
        })
        .catch((error) => {
          console.log("Error in contacting movie db");
          console.log(error);
        });
      }
      
    },

    checkActorSelectedCredits({commit, state}) {
      const key = process.env.VUE_APP_API_KEY;
      if(state.actorSelected && state.actorSelected.id) {
        axios
        .get(
          `https://api.themoviedb.org/3/person/${state.actorSelected.id}/combined_credits?api_key=${key}&language=en-US`
          
        )
        .then((response) => {
          console.log("known for credits are");
          console.log(response.data.cast);

          let responseDataFiltered = [...response.data.cast];
          for(let i = 0; i < responseDataFiltered.length; i++) {
            if(!responseDataFiltered[i].poster_path || responseDataFiltered[i].character.toLowerCase().indexOf("self") !== -1
             || responseDataFiltered[i].character === "") {
              responseDataFiltered.splice(i, 1);
              i--;
            }
          }
          console.log("Response data filtered");
          console.log(responseDataFiltered)

          responseDataFiltered.sort((el1, el2) => {

            let date1, date2;
            if(el1.release_date  || el1.first_air_date) {
              date1 = new Date(el1.media_type==="movie" ? el1.release_date : el1.first_air_date);
            } else {
              date1 = 0;
            }
            if(el2.release_date || el2.first_air_date) {
              date2 = new Date(el2.media_type === "movie" ? el2.release_date : el2.first_air_date);
            } else {
              date2 = 0;
            }

            return date1 - date2;

          }).reverse();
          
          commit("setKnownForCredits", responseDataFiltered)
        })
        .catch((error) => {
          console.log("Error in contacting movie db");
          console.log(error);
        });
      }
      
    },

    setActorSelected({commit}, element) {
        commit("setKnownForDetail", "");
        commit("setKnownForCredits", "");
        commit("setActorSelected", element);
    },

    setKnownForBackdropPath({commit}, element) {
      commit("setKnownForBackdropPath", element);
    },

    //Search
    setSearchActiveSection({commit}, element) {
      commit("setSearchActiveSection", element);
    }

  }
})
