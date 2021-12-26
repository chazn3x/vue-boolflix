<template>
    <main>
        <Hero v-if="data.selected == data.pages[0] && data.search == ''"/>
        <div class="no-content" v-if="data.search != '' && data.series.length == 0 && data.movies.length == 0 && data.loader == false">
            Non ci sono contenuti che soddisfano i criteri di ricerca.
        </div>
        <div class="sections" v-else :class="{'home' : data.selected == data.pages[0]}">
            <Trending v-if="(data.selected == data.pages[0] || data.selected == data.pages[3]) && data.search == ''"/>
            <Movies v-if="data.selected == data.pages[0] || data.selected == data.pages[2]"/>
            <Series v-if="data.selected == data.pages[0] || data.selected == data.pages[1]"/>
            <Saved v-if="(data.selected == data.pages[0] || data.selected == data.pages[4]) && data.search == ''"/>
        </div>
    </main>
</template>

<script>
import Hero from '../commons/Hero.vue'
import Movies from '../pages/Movies.vue'
import Series from '../pages/Series.vue'
import Trending from '../pages/Trending.vue'
import Saved from '../pages/Saved.vue'
import data from '../../share/data.js'
import axios from 'axios'
export default {
    name: "Main",
    components: {
        Movies,
        Series,
        Trending,
        Saved,
        Hero
    },
    data() {
        return {
            data
        }
    },
    methods: {
        allGenres() {
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
    },
    created() {
        this.allGenres();
    }
}
</script>

<style lang="scss">
@import '../../assets/style/mixins/mixin.scss';
main {
    // padding-top: 70px;
    position: relative;
    .sections {
        padding: 70px 40px 40px;
        z-index: 2;
        &.home {
            padding-top: 0;
            position: absolute;
            width: 100%;
            top: 70vh;
        }
    }
    @include noContent;
    >.no-content {
        margin-top: 200px;
    }
}
</style>