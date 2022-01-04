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
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
import './share/apiCalls.js' // api calls
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
    },
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
