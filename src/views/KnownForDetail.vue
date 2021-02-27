<template>
  <div class="known-for">
    
    <div class="known-for-detail-container" id="known-for-detail-container">
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
      
              <div class="stats-container">
                <div class="stats-column">
                  <div class="stats-category">
                    <h5 class="stats-title">Name:</h5>
                    <div class="stats-info">{{knownForDetail && knownForDetail.name}}</div>
                  </div>
                  <div class="stats-category">
                    <h5 class="stats-title">Birthday:</h5>
                    <div class="stats-info">{{knownForDetail && knownForDetail.birthday}}</div>
                  </div>
                </div>
                <div class="stats-column">
                  <div class="stats-category">
                    <h5 class="stats-title">Role:</h5>
                    <div class="stats-info">{{knownForDetail && getDepartment()}}</div>
                  </div>
                  <div class="stats-category">
                    <h5 class="stats-title">Place Of Birth:</h5>
                    <div class="stats-info">{{knownForDetail && knownForDetail.place_of_birth}}</div>
                  </div>
                </div>
              </div>

              <div class="buttons-container">
                <div class="filmography-container">
                <a @click="goToFilmography">
                  <back-icon />
                  <span class="link-text">Filmography</span>
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
import BackIcon from '../assets/icons/backIcon.vue'
export default {
  name: "known-for",
  components: {
    BackIcon
  },

  data() {
    return {
      imageRootPath: "https://image.tmdb.org/t/p/original",
      posterPath: "",
    };
  },

  computed: {
    knownForDetail() {
      this.posterPath = `https://image.tmdb.org/t/p/w500` + this.$store.getters.actorSelected.profile_path;
      return this.$store.getters.knownForDetail;
    },

    backdropPath() {
        return this.$store.getters.knownForBackdropPath
    },
  }, 

  methods: {
    goToFilmography() {
      console.log("Going to filmography")
      this.$router.push({path: "/filmography"})
    },

    goBack()  {
        this.$router.back();
      },

    getDepartment() {
      if(this.knownForDetail.known_for_department === "Acting")
      {
        if(this.knownForDetail.gender === 1) {
          return "Actress";
        } else {
          return "Actor";
        }
      }
      return this.knownForDetail.known_for_department;
    }

  },

  beforeMount() {
    this.$store.dispatch("checkActorSelectedData");
  },

  mounted() {
      const backgroundImage = `https://image.tmdb.org/t/p/original` + this.backdropPath;
       document.getElementById("known-for-detail-container").style.backgroundImage =  `url(` + backgroundImage +  ` )`;
       this.show = true;
    },
  
};
</script>

<style lang="scss" scoped>
.known-for {

  .known-for-detail-container {
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
            align-items: center;

            .title-container {
              margin-top: 10px;
            }

            .inner-content {
              display: flex;
              flex-direction: column;
              margin: auto;

            .stats-container {
              margin-top: 20px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;

              .stats-column {
                display: flex;
                flex-direction: column;
                margin-right: 30px;

                h5 {
                  font-size: 1.35rem;
                  font-weight: 300;
                }

                .stats-title {
                  cursor: default;
                }

                .stats-info {
                  font-size: 22px;
                  color: #00e67a;
                  line-height: 32px;
                  margin-bottom: 30px;
                  cursor: default;
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

    .filmography-container {
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

}
</style>
