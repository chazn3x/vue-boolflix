<template>
  <div id="app" @click="close()">
    <Header/>
    <Main/>
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Header from './components/macro/Header.vue'
import Main from './components/macro/Main.vue'
// import Footer from './components/macro/Footer.vue'
import data from './share/data.js'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Header,
    Main,
    // Footer
  },
  data() {
    return {
      data
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
    }
  },
  beforeCreate() {
    // trending API calls
    data.trending.trendingEndpoints.forEach(item => {
      axios.get(data.apiUrl + item.enpoint, data.commonsApi)
      .then(response => {
          data.trending[item.contents] = response.data.results;
          data.myFunc.commons(data.trending[item.contents], item.type);
          console.log(item.enpoint, item.type, data.trending[item.contents]);
      });
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
  },
  created() {
    data.screen = window.innerWidth;
    window.addEventListener('resize', () => {
      data.screen = window.innerWidth;
    });
  }
}
</script>

<style lang="scss">
@import './assets/style/global.scss';
.lorem {
  padding-top: 100px;
  color: white;
}
</style>
