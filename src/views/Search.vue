<template>
  <div class="search">
    <div class="selector-container">
      <button class="type-selector btn" @click="searchMovies" :class="searchActiveSection === 'movies' ? 'active' : null">Movies</button>
      <button class="type-selector btn" @click="searchTv" :class="searchActiveSection === 'tv' ? 'active' : null">Tv</button>
      <button class="type-selector btn" @click="searchPeople" :class="searchActiveSection === 'people' ? 'active' : null">People</button>
    </div>
    <div class="search-list-container">
      <div class="cards-container" v-if="searchActiveSection === 'movies'">
        Search for a Movie
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
    };
  },
  
    computed: {

      searchActiveSection() {
        return this.$store.getters.searchActiveSection;
      },

    },

  methods: {

    searchMovies() {
      if(this.searchActiveSection !== "movies") {
        this.$store.dispatch("setSearchActiveSection", "movies")
      }
    },

    searchTv() {
      if(this.searchActiveSection !== "tv") {
        this.$store.dispatch("setSearchActiveSection", "tv")
      }
    },

    searchPeople() {
      if(this.searchActiveSection !== "people") {
        this.$store.dispatch("setSearchActiveSection", "people")
      }
    },
   
  },

};
</script>

<style lang="scss" scoped>

.search {
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
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
    }

  }
}
</style>
