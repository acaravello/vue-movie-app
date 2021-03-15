<template>
  <div class="cast">
    <div class="cast-list-container">
        <h1>{{castOf}}</h1>

    <div v-if="director">
      <div class="cards-container">
        <div class="card" v-for="person in director" :key="person.id" @click="toPersonDetail(person)">
          <img :src="imageRootPath + person.profile_path" class="card-img-top" :alt="person.name" />
          <div class="card-body">
            <h5 class="card-title-director-role">Director</h5>
            <h5 class="card-title card-title-director">{{person.name}}</h5>
          </div>

        </div>
      </div>
    </div>
        
      <div class="cards-container">
        <div class="card" v-for="person in castArray" :key="person.id" @click="toPersonDetail(person)">
          <img :src="imageRootPath + person.profile_path" class="card-img-top" :alt="person.name" />
          <div class="card-body">
            <h5 class="card-title">{{person.name}}</h5>
            <div class=known-for-container>
              <p class="card-text">
                {{person.character}}
            </p>
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "cast",
    data() {
    return {
      imageRootPath: "https://image.tmdb.org/t/p/original",
    };
  },
 
 computed: {

     castOf() {
      return this.$store.getters.castOf;
    },

    castArray() {
      return this.$store.getters.castArray;
    },

    fromCastToDetailBackground() {
        return this.$store.getters.fromCastToDetailBackground;
    },

    director() {
      return this.$store.getters.director;
    }

  }, 

  methods: {

     toPersonDetail(person) {
      this.$store.dispatch("setActorSelected", person)
      this.$store.dispatch("setKnownForBackdropPath", this.fromCastToDetailBackground);
      this.$router.push({path: "/known-for"})
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
.cast {
  margin-top: 30px;

  .cast-list-container {
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
            width: 15rem;
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

              &.card-title-director {
                border-bottom: none;
              }

              &.card-title-director-role {
                border-bottom: none;
                font-size: 15px;
                padding-top: 18px;
                margin-bottom: 0px;
                padding-bottom: 0px;
                color: #ddd;
                letter-spacing: 0.2px;
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
              font-size: 0.95rem;
              line-height: 20px;
              text-transform: uppercase;
              }

            }
        }
      }

  }

}
</style>

