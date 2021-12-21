<template>
  <div id="app">
    <Header/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/macro/Header.vue'
import Main from './components/macro/Main.vue'
import Footer from './components/macro/Footer.vue'
// import data from './share/data.js'
export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer
  },
  // data() {
  //   return {
  //     data
  //   }
  // },
  // methods: {
  // },
  // created() {
  //   this.data.myFunc.getTrending();
  // }
}
</script>

<style lang="scss">
@import './assets/style/global.scss';
</style>
