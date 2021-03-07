<template>
  <div class="people">
      <div class="people-list-container">
      <div class="cards-container">
        <div class="card" v-for="person in popularPeople" :key="person.id">
          <img :src="imageRootPath + person.profile_path" class="card-img-top-people" :alt="person.name" @click="toPersonDetail(person)"/>
          <div class="card-body">
            <h5 class="card-title">{{person.name}}</h5>
            <div class=known-for-container>
              <p class="card-text">
              Known for:
            </p>
            <div class="known-for-item" v-for="element in person.known_for" :key="element.id" @click="toElementDetail(element)">
              <div class="poster">
                <img :src="imageRootPath + element.poster_path" class="card-img-top" :alt="element.media_type==='movie' ? element.title: element.name">
              </div>
              <div class="known-for-info">
                <div class="title">
                {{element.media_type==='movie' ? element.title : element.name}}
              </div>
              <div class="year">
                {{getYear(element)}}
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
import {mapGetters} from "vuex";
export default {
    name: "people",
    data() {
    return {
      imageRootPath: "https://image.tmdb.org/t/p/original",
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
    };
  },
  computed: mapGetters({
    popularPeople: "popularPeople",
  }),

  methods: {

    toPersonDetail(person) {
      console.log("Setting actor selected");
      console.log(person)
      this.$store.dispatch("setActorSelected", person)
      const randomIndex = Math.floor(Math.random() * person.known_for.length);
      this.$store.dispatch("setKnownForBackdropPath", person.known_for[randomIndex].backdrop_path);
      this.$router.push({path: "/known-for"})
    },
    
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
    }
  },

}
</script>

<style lang="scss" scoped>
.people {
  margin-top: 30px;

  .people-list-container {
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
            background: -webkit-linear-gradient(to top, #35495E, #00b35f);
            background: linear-gradient(to top, #35495E, #00b35f);
          
            h5 {
              line-height: 1.7rem;
              text-transform: uppercase;
              border-bottom: 1px solid #00b35f;
              padding-bottom: 5px;
            }

            .card-img-top-people {
              border-radius: 0px;
              cursor: pointer;
              filter: none;
              transition: filter 0.8s ease;

                &:hover {
                filter: grayscale(30%) contrast(1) brightness(90%)
              }

            }

            .card-body {
              background: #35495E;
              background: -webkit-linear-gradient(to top, #00b35f, #35495E);
              background: linear-gradient(to top, #00b35f, #35495E);

              .card-text {
              font-size: 0.95rem;
              line-height: 20px;
              text-transform: uppercase;
              }

              .known-for-item {
                display: flex;
                opacity:1;
                cursor: pointer;
                margin-bottom: 8px;
                transition: opacity 0.8s ease, background-color 0.8s ease;
                border-radius: 4px;

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
      }

  }

}
</style>

