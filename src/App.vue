<template>
  <div id="app" @click="closeBar()">
    <Header/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/macro/Header.vue'
import Main from './components/macro/Main.vue'
import Footer from './components/macro/Footer.vue'
import data from './share/data.js'
export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer
  },
  data() {
    return {
      data
    }
  },
  methods: {
    closeBar() {
      if (data.search == '') {
        data.searchBar = false
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/style/global.scss';
</style>
