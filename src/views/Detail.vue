
<template>
  <div class="detail">
   <div class="detail-container" id="detail-container"  v-show="show">
     <div class="inner-container">
       <div class="container">
         <div class="row">
           <div class="col-sm-12 col-md-10 offset-md-1 detail-card">
             <div class="image-container col-xs-12 col-md-4 col-lg-5">
               <img :src="this.posterPath" alt="poster"/>
             </div>
             <div class="info-container col-xs-12 col-md-8 col-lg7">
              <h2 class="movie-title">{{movieDetail.title}}</h2>
              <h4 class="movie-tagline">{{tagline}}</h4>
              <p class="movie-overview">{{movieDetail.overview}}</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>

export default {

    name: "detail",

    data() {

      return {
      show: false,
      posterPath: "",
      }

    },

    computed: {

      backdropPath() {
        return this.$store.getters.backdropPath
      },

      movieDetail() {
      this.posterPath = `https://image.tmdb.org/t/p/w500` + this.$store.getters.movieDetail.poster_path;
      return this.$store.getters.movieDetail
      },

      movieDetailComplete() {
        console.log("Movie detail complete is");
        return this.$store.getters.movieDetailComplete;
      },

      tagline() {
        return this.$store.getters.tagline;
      }

    },

    beforeMount() {
      this.$store.dispatch("getMovieDetailFromId");
    },

    mounted() {
      const backgroundImage = `https://image.tmdb.org/t/p/original` + this.backdropPath;
       document.getElementById("detail-container").style.backgroundImage =  `url(` + backgroundImage +  ` )`;
       this.show = true;
    },

}

</script>

<style lang="scss" scoped>
.detail {

  .detail-container {
    background: no-repeat #000;
    background-size: cover;
    min-height: calc(100vh- 145px);

    .inner-container {
      min-height: calc(100vh - 145px);
      background-image: linear-gradient(rgba(0,0,0,.85) 15%,rgba(0,0,0,.2) 40%,#000 90%);
      background-attachment: fixed;
      display: flex;
      align-items: center;

      .detail-card {
        min-height: 300px;
        display:flex;

          .image-container {

            img {
              width: 100%;
            }

          }

          .info-container {
          }
      }

    }
  }


}
</style>