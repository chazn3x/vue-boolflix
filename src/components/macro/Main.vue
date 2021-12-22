<template>
    <main>
        <Hero v-if="data.selected == data.pages[0] && data.search == ''"/>
        <div class="no-content" v-if="data.search != '' && data.series.length == 0 && data.movies.length == 0 && data.loader == false">
            Non ci sono contenuti che soddisfano i criteri di ricerca.
        </div>
        <div class="sections" v-else>
            <Trending v-if="(data.selected == data.pages[0] || data.selected == data.pages[3]) && data.search == ''"/>
            <Movies v-if="data.selected == data.pages[0] || data.selected == data.pages[2]"/>
            <Series v-if="data.selected == data.pages[0] || data.selected == data.pages[1]"/>
            <Saved v-if="(data.selected == data.pages[0] || data.selected == data.pages[4]) && data.search == ''"/>
        </div>
    </main>
</template>

<script>
import Hero from '../sections/Hero.vue'
import Movies from '../sections/Movies.vue'
import Series from '../sections/Series.vue'
import Trending from '../sections/Trending.vue'
import Saved from '../sections/Saved.vue'
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
    padding-top: 70px;
    .sections {
        padding: 0 40px;
    }
    @include noContent;
    >.no-content {
        margin-top: 200px;
    }
}
</style>