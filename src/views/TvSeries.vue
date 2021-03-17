<template>
  <div class="tv-series">
    <div class="tv-series-list-container">
      <div class="cards-container">
        <div class="card" v-for="series in popularTvSeries" :key="series.id" @click="toSeriesDetail(series)">
          <img :src="imageRootPath + series.poster_path" class="card-img-top" :alt="series.name" />
          <div class="card-body">
            <h5 class="card-title">{{series.name}}</h5>
            <p class="card-text">
              {{series.overview}}
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    name: "tv-series",
    data() {
    return {
      imageRootPath: "https://image.tmdb.org/t/p/original",
    };
  },
  computed: mapGetters({
    popularTvSeries: "popularTvSeries",
  }),

  methods: {
    toSeriesDetail(series) {
       this.$store.dispatch("setTvSeriesDetail", series)
       this.$router.push({path: "/series-detail"})
    }
  },

}
</script>

<style lang="scss" scoped>
.tv-series {
  margin-top: 30px;

  .tv-series-list-container {
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

}

$small: 991px;
$medium: 992px;

@media screen and (max-width: $small) {

  .card {
    width: 15rem !important;
  }
  
}

</style>

