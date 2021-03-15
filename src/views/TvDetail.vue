
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

               <div class="title-container">
                 
               </div>
              
              <div class="inner-content">
                <h2 class="tv-series-title">{{seriesTitle}}</h2>
                <h4 class="tv-series-tagline">{{seriesTagline}}</h4>
              <p class="tv-series-overview">{{tvSeriesDetail.overview}}</p>

              <div class="stats-container">
                <div class="stats-column">
                  <div class="stats-category" v-if="seriesFirstAirDate">
                    <h5 class="stats-title">First Air Date:</h5>
                    <div class="stats-info">{{seriesFirstAirDate}}</div>
                  </div>
                  <div class="stats-category" v-if="seriesSeasons">
                    <h5 class="stats-title">Seasons:</h5>
                    <div class="stats-info">{{seriesSeasons}}</div>
                  </div>
                </div>
                <div class="stats-column">
                  <div class="stats-category" v-if="seriesVoteAverage && seriesVoteAverage > 0">
                    <h5 class="stats-title">Vote Average:</h5>
                    <div class="stats-info">{{seriesVoteAverage}}</div>
                  </div>
                   <div class="stats-category" v-if="seriesEpisodes">
                    <h5 class="stats-title">Episodes:</h5>
                    <div class="stats-info">{{seriesEpisodes}}</div>
                  </div>
                </div>
              </div>

               <div class="buttons-container">
                <div class="cast-container">
                <a @click="goToCast">
                  <cast-icon />
                  <span class="link-text">Cast</span>
              </a>
              </div>

               <div class="back-container">
                <a @click="goBack">
                  <back-icon />
                  <span class="link-text">Back</span>
              </a>
              </div>
              </div>

              </div>
             </div>
           </div>
         </div>
       </div>

     </div>

   </div>
  </div>
</template>

<script>
import BackIcon from '../assets/icons/backIcon.vue';
import CastIcon from "../assets/icons/castIcon.vue";


export default {

    name: "detail",

    components: {
      BackIcon,
      CastIcon
    },
 
      data() {

      return {
      show: false,
      posterPath: "",
      }

    },

    computed: {

      backdropPath() {
        return this.$store.getters.tvSeriesBackdropPath
      },

      tvSeriesDetail() {
      this.posterPath = `https://image.tmdb.org/t/p/w500` + this.$store.getters.tvSeriesDetail.poster_path;
      return this.$store.getters.tvSeriesDetail
      },

      seriesTagline() {
        return this.$store.getters.seriesTagline;
      },

      seriesTitle() {
        return this.$store.getters.seriesTitle;
      },

      seriesFirstAirDate() {
        return this.$store.getters.seriesFirstAirDate;
      },

      seriesVoteAverage() {
        return this.$store.getters.seriesVoteAverage;
      },

      seriesSeasons() {
        return this.$store.getters.seriesSeasons;
      },

      seriesEpisodes() {
        return this.$store.getters.seriesEpisodes
      }

    },

    beforeMount() {
      this.$store.dispatch("getTvSeriesDetailFromId");
      this.$store.dispatch("setCastFrom", "tv");
    },

    mounted() {
      const backgroundImage = `https://image.tmdb.org/t/p/original` + this.backdropPath;
       document.getElementById("detail-container").style.backgroundImage =  `url(` + backgroundImage +  ` )`;
       this.show = true;
    },

    methods: {

      goBack()  {
        this.$router.back();
      },

      goToCast() {
        this.$store.dispatch("setFromCastToDetailBackground", this.backdropPath);
        this.$store.dispatch("setCastOf", this.seriesTitle);
        this.$store.dispatch("setCastArray", null);
        this.$store.dispatch("setDirector", null);
        this.$store.dispatch("checkTvCast", this.tvSeriesDetail.id);
        this.$store.dispatch("setKnownForActive", false);
        this.$router.push({path: "/cast"});
      }
    }

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
        background: rgba(0,0,0,.85);
        border-radius: 3px;

          .image-container {
            margin-left: -30px;

            img {
              width: 100%;
            }
          }

          .info-container {
            display: flex;
            flex-direction: column;
            padding: 20px 30px 20px 15px ;
            margin-left: -15px;
            align-items: center;

            .title-container {
              margin-top: 10px;
            }

            .inner-content {
              display: flex;
              flex-direction: column;
              margin: auto;

              .tv-series-overview {
              margin: 10px;
              font-size: 15px;
            }

            .tv-series-tagline {
              color: #00e67a;
              margin-top: 5px;
            }

            .stats-container {
              margin-top: 20px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;

              .stats-column {
                display: flex;
                flex-direction: column;
               

                h5 {
                  font-size: 1.35rem;
                  font-weight: 300;
                }

                .stats-info {
                  font-size: 30px;
                  color: #00e67a;
                  line-height: 32px;
                  margin-bottom: 30px;
                }
              }
            }

            }

          }

      }

    }

   .buttons-container {

    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -30px;

    .cast-container {
        display: flex;
        margin-top: 30px;
        margin-right: 20px;
        text-transform: uppercase;
        opacity: 1;
        transition: opacity 0.8s ease;

        &:hover {
          opacity: 0.8;
        }

       a {
         border: 1px solid #00e67a;
         padding: .475rem .95rem;
         line-height: 20px;
         border-radius: .25rem;
         font-size: 0.8rem;
         color: #00e67a;
         cursor: pointer;

            svg {
            width:15px;
            height: auto;
            fill: #00e67a;
            margin-right: 8px;
            margin-bottom: 3px;
            }

            .cast {
              margin-top: -2px;
              width: 14px;
            }

            .filmography {
              width: 13px;
              height: auto;
              fill: #00e67a;
              margin-right: 8px;
              margin-bottom: 5px;
            }
          }
    }

    .back-container {
      display: flex;
      margin-top: 30px;
      text-transform: uppercase;
      opacity: 1;
      transition: opacity 0.8s ease;

      &:hover {
        opacity: 0.8;
      }

       a {
         border: 1px solid #00e67a;
         padding: .475rem .95rem;
         line-height: 20px;
         border-radius: .25rem;
         font-size: 0.8rem;
         color: #00e67a;
         cursor: pointer;

            svg {
            width:15px;
            height: auto;
            fill: #00e67a;
            margin-right: 8px;
            margin-bottom: 3px;
            }
          }
        }
      }

  }

  

}
</style>