<template>
  <div id="app" @click="close()">
    <Header/>
    <ContentInfo/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/macro/Header.vue'
import ContentInfo from './components/macro/ContentInfo.vue'
import Main from './components/macro/Main.vue'
import Footer from './components/macro/Footer.vue'
import data from './share/data.js'
import axios from 'axios'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
export default {
  name: 'App',
  components: {
    Header,
    ContentInfo,
    Main,
    Footer
  },
  data() {
    return {
      data,
    }
  },
  methods: {
    close() {
      if (data.search == '') {
        data.searchBar = false
      }
      if (data.menuIsOpen) {
        data.menuIsOpen = false;
      }
    },
  },
  beforeCreate() {
    // API calls
    getDataFromApi()

    function getDataFromApi() {
      data.trending.trendingEndpoints.forEach(endpoint => {
        getDataForEachEndpoint(endpoint);
      });
      // get all genres
      let movieGenres = [], tvGenres = [];
      axios.get(data.apiUrl + '/genre/movie/list', data.commonsApi)
      .then(response => {
        movieGenres = response.data.genres;
        axios.get(data.apiUrl + '/genre/tv/list', data.commonsApi)
        .then(response => {
          tvGenres = response.data.genres;
          data.genres = movieGenres.concat(tvGenres);
        })
      })
    }
    async function getDataForEachEndpoint(item) {
      return axios.get(data.apiUrl + item.enpoint, data.commonsApi)
      .then(response => {
        data.trending[item.contents] = response.data.results;
        data.myFunc.commons(data.trending[item.contents], item.type);
        data.trending[item.contents].forEach(content => {
          // other api calls
          getAdditionalsApi(content);
          // year
          if (content.media_type == 'movie') {
            content.year = dayjs(content.release_date, 'YYYY-MM-DD').format('YYYY');  
          } else if (content.media_type == 'tv') { 
            content.year = dayjs(content.first_air_date, 'YYYY-MM-DD').format('YYYY');
          }
          // genres
          setTimeout(() => {
            let genres = [];
            content.genres = '';
            content.smallGenres = '';
            content.genre_ids.forEach(id => {
              data.genres.forEach(genre => {
                if (genre.id == id) {
                  if (!genres.includes(genre.name)) {
                    genres.push(genre.name);
                  }
                }
              });
            });
            genres.forEach((genre, i) => {
              content.genres += genre;
              if (i < genres.length - 1) content.genres += ', ';
              if (i < 3) {
                content.smallGenres += genre;
                if (i < 2 && i < genres.length - 1) content.smallGenres += ', '
              }
            });
          }, 500);
        });
      });
    }
    async function getAdditionalsApi(content) {
      // images
      return axios.get(data.apiUrl + `/${content.media_type}/${content.id}/images`, {
        params: {
          api_key: '3390a8a14e621ee87b8e65a286d5c250',
          include_image_language: 'en,it,null'
        }
      })
      .then(response => {
          content.images = response.data;
          if (content.images.logos.length > 0) {
            content.logo = content.images.logos[0].file_path;
          } else content.logo = null;
          // trailer
          axios.get(data.apiUrl + `/${content.media_type}/${content.id}/videos`, data.commonsApi)
          .then(response => {
              if (response.data.results.length > 0) {
                content.key = response.data.results[0].key;
              } else content.key = 'abc';
              // crew and cast
              axios.get(data.apiUrl + `/${content.media_type}/${content.id}/credits`, data.commonsApi)
              .then(response => {
                const people = response.data;
                content.people = {
                  producers: '',
                  executiveProducers: '',
                  directors: '',
                  creators: '',
                  writers: '',
                  cast: '',
                  smallCast:''
                }
                const producers = {
                  type: 'producers',
                  name: 'producer',
                  list: []
                };
                const executiveProducers = {
                  type: 'executiveProducers',
                  name: 'executive producer',
                  list: []
                };
                const directors = {
                  type: 'directors',
                  name: 'director',
                  list: []
                };
                const creators = {
                  type: 'creators',
                  name: 'creator',
                  list: []
                };
                const writers = {
                  type: 'writers',
                  name: 'writer',
                  list: []
                };
                const crew = [producers, executiveProducers, directors, creators, writers];
                people.crew.forEach(member => {
                  crew.forEach(department => {
                    if (member.job.toLowerCase() == department.name && !department.list.includes(member.name)) {
                      department.list.push(member.name);
                    }
                  });
                });
                crew.forEach(department  => {
                  department.list.forEach((member, i) => {
                    content.people[department.type] += member;
                    if (i < department.list.length - 1) content.people[department.type] += ', ';
                  });
                });
                people.cast.forEach((actor, i) => {
                  content.people.cast += actor.name;
                  if (i < people.cast.length - 1) content.people.cast += ', ';
                  if (i < 3) {
                    content.people.smallCast += actor.name;
                    if (i < 2) content.people.smallCast += ', '
                  }
                });
                // duration
                axios.get(data.apiUrl + `/${content.media_type}/${content.id}`, data.commonsApi)
                .then(response => {
                  if (content.media_type == 'movie') {
                    let duration = response.data.runtime;
                    let h, m;
                    h = Math.floor(duration / 60);
                    m = duration - (h * 60);
                    content.duration = h + 'h ' + m + 'min';
                  } else if (content.media_type == 'tv') {
                    content.duration = response.data.number_of_seasons;
                    content.duration > 1 ? content.duration += ' stagioni' : content.duration += ' stagione';
                  }
                data.trending.status++;
                });
              });
          });
      });
    }
  },
  created() {
    data.screen = window.innerWidth;
    window.addEventListener('resize', () => {
      data.screen = window.innerWidth;
    });
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    }
  },
  watch: {
    '$data.data.selected'() {
      clearInterval(data.heroInterval);
    },
    '$data.data.contentInfo.open'(open) {
      if (open) {
        clearInterval(data.heroInterval);
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/style/global.scss';
#app {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
