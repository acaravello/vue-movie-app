<template>
  <div class="search">
    <div class="selector-container">
      <button class="type-selector btn" @click="searchMovies" :class="searchActiveSection === 'movies' ? 'active' : null">Movies</button>
      <button class="type-selector btn" @click="searchTv" :class="searchActiveSection === 'tv' ? 'active' : null">Tv</button>
      <button class="type-selector btn" @click="searchPeople" :class="searchActiveSection === 'people' ? 'active' : null">People</button>
    </div>
    <div class="search-list-container">
      <div class="cards-container" v-if="searchActiveSection === 'movies'">
          <div class="search-wrapper">
            <input class="search-input" id="movie-search" placeholder="Search for a movie" v-model="movieInput" :keyup="finishedTyping()"/> 
          </div> 
          <div class="search-list" v-if="searchListVisible">
            <div class="card" v-for="element in searchListRetrieved" :key="element.id" @click="toMovieDetail(element)">
              <img :src="imageRootPath + element.poster_path" class="card-img-top" :alt="element.media_type==='movie' ? element.title: element.name" />
              <div class="card-body">
            <h5 class="card-title">{{element.title}}</h5>
            <h5 class="card-year">{{getYear(element)}}</h5>
            <p class="card-text">
              {{element.overview}}
            </p>
            </div>
          </div>

           
          </div>
      </div>
       <div class="cards-container" v-if="searchActiveSection === 'tv'">
       Search for a Tv series
      </div>
      <div class="cards-container" v-if="searchActiveSection === 'people'">
       Search for a Person
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
  },

  data() {

    return {
      imageRootPath: "https://image.tmdb.org/t/p/original",
      movieInput: "",
      timer: null,
       getYear(element) {
          if(element.release_date) {
            return element.release_date.substr(0, 4);
          }
      },
    };
  },
  
    computed: {

      searchActiveSection() {
        return this.$store.getters.searchActiveSection;
      },

      searchListRetrieved() {
        return this.$store.getters.searchListRetrieved;
      },

      searchListVisible() {
        return this.$store.getters.searchListVisible;
      }

    },

  methods: {

    searchMovies() {
      if(this.searchActiveSection !== "movies") {
        this.$store.dispatch("setSearchActiveSection", "movies");
        this.$store.dispatch("setSearchListRetrieved", null);
      }
    },

    searchTv() {
      if(this.searchActiveSection !== "tv") {
        this.$store.dispatch("setSearchActiveSection", "tv");
        this.$store.dispatch("setSearchListRetrieved", null);
      }
    },

    searchPeople() {
      if(this.searchActiveSection !== "people") {
        this.$store.dispatch("setSearchActiveSection", "people");
        this.$store.dispatch("setSearchListRetrieved", null);
      }
    },

    searchForAMovie() {
      console.log("Searching for a movie")
    },

    finishedTyping() {
      window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(() => {
        if(this.movieInput.length > 2) {
          this.$store.dispatch("setSearchListVisible", true)
          this.$store.dispatch("checkSearchListMovies", this.movieInput)
        }
      }, 1500)
    },

    toMovieDetail(element) {
      this.$store.dispatch("setMovieDetail", element)
          this.$router.push({path: "/detail"})
    }
  },


};
</script>

<style lang="scss" scoped>

.search {
  margin-top: 30px;

     .search-wrapper {
      overflow: hidden;
      border-bottom: 1px solid #00E67A;
      width: 100%;
      max-width: 860px;
      margin:auto;

      .search-input {
        width: 100%;
        height: 56px;
        line-height: 22px;
        padding: 0 18px;
        background-color: transparent;
        overflow: hidden;
        color: #00E67A;
        border:none;
        font-size: 18px;
        letter-spacing: 0.5px;
        font-weight: 300;
      }

      input:focus {
        outline: none;
      }
  }

 

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

  .search-list-container {
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
      flex-direction: column;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;

      .search-list {

        margin-top: 30px;
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

              &.card-year {
                border-bottom: none;
                margin-top: -2px;
              }
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
    }

    .search-item {
                display: flex;
                opacity:1;
                cursor: pointer;
                transition: opacity 0.8s ease, background-color 0.8s ease;
                border-radius: 4px;
                margin: 8px 12px;

                &:hover {
                  opacity: 0.8;
                  background-color: #1c2631
                }

                .poster {
                width: 5rem;
                }

                .known-for-info {
                  display:flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  width: 100%;

                  .title {
                  font-size: 0.9rem;
                  margin-bottom: 2px;
                  }

                  .year {
                    font-size: 0.95rem;
                  }

                }
              }
   }
}
</style>
