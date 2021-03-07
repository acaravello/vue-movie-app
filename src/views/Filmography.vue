<template>
  <div class="filmography">
    <div class="filmography-list-container">
        <h1>{{knownForDetail && knownForDetail.name}}</h1>
      <div class="cards-container">
        <div class="card" v-for="element in knownForCredits" :key="element.credit_id" @click="toElementDetail(element)">
          <img :src="imageRootPath + element.poster_path" class="card-img-top" :alt="element.name" />
          <div class="card-body">
            <h5 class="card-title">{{element.media_type==="movie" ? element.title : element.name}}</h5>
            <div class="credit-element-info">
              <div class="role-name">{{element.character}}</div>
              <div class="year">{{getYear(element)}}</div>
            </div>
            <p class="card-text">
              {{element.overview}}
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "filmography",
    data() {
    return {
      imageRootPath: "https://image.tmdb.org/t/p/original",
    };
  },
 
 computed: {
    knownForDetail() {
      return this.$store.getters.knownForDetail;
    },

    knownForCredits() {
      return this.$store.getters.knownForCredits;
    },

    backdropPath() {
        return this.$store.getters.knownForBackdropPath
    },
  }, 

  methods: {
    toElementDetail(element) {
        this.$store.dispatch("setKnownForActive", true);
      switch(element.media_type) {
        case 'movie':
          this.$store.dispatch("setMovieDetail", element)
          this.$router.push({path: "/detail"})
          break;
        case 'tv':
          this.$store.dispatch("setTvSeriesDetail", element)
          this.$router.push({path: "/series-detail"})
      }
    },
    getYear(element) {
        if(element.media_type==='movie') {
          if(element.release_date) {
            return element.release_date.substr(0, 4);
          }
        } else {
          if(element.first_air_date) {
            return element.first_air_date.substr(0, 4);
          }
        }
      },
  },

}
</script>

<style lang="scss" scoped>
.filmography {
  margin-top: 30px;

  .filmography-list-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 48px auto 24px auto;

    h1 {
      margin-bottom: 36px;
    }

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

              .credit-element-info {
                margin-bottom: 10px;

                .role-name {
                  margin-bottom: 2px;
                }

                .year {
                  font-size: 13px;
                }
              }

              .card-text {
              font-size: 13px;
              line-height: 20px;
              }

            }
        }
      }

  }

}
</style>

