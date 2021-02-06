
<template>
  <div class="detail">
   <div class="detail-container" id="detail-container"  v-show="show">
     <div class="inner-container"></div>
   </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    name: "detail",
    data() {
      return {
      show: false
      }
    },
    computed: mapGetters({
    movieDetail: "movieDetail",
    backdropPath: "backdropPath"
    }),
    beforeMount() {
      this.$store.dispatch("getMovieDetailFromId");
    },
    mounted() {
      const backgroundImage = `https://image.tmdb.org/t/p/original` + this.backdropPath;
       document.getElementById("detail-container").style.backgroundImage =  `url(` + backgroundImage +  ` )`;
       this.show = true;
    }
}
</script>

<style lang="scss" scoped>
.detail {
  // margin-top: 30px;

  .detail-container {
    background: no-repeat #000;
    background-size: cover;
    min-height: calc(100vh- 145px);

    .inner-container {
      min-height: calc(100vh - 145px);
      background-image: linear-gradient(rgba(0,0,0,.85) 15%,rgba(0,0,0,.2) 40%,#000 90%);
      background-attachment: fixed;
    }
  }


}
</style>