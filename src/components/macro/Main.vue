<template>
    <main>
        <div class="no-content" v-if="data.search != '' && data.series.length == 0 && data.movies.length == 0">
            Non ci sono contenuti che soddisfano i criteri di ricerca.
        </div>
        <div class="sections" v-else>
            <Series v-if="data.selected == 'Home' || data.selected == 'Serie TV'"/>
            <Movies v-if="data.selected == 'Home' || data.selected == 'Film'"/>
            <Trending v-if="(data.selected == 'Home' || data.selected == 'Nuovi e popolari') && data.search == ''"/>
            <Saved v-if="(data.selected == 'Home' || data.selected == 'La mia lista') && data.search == ''"/>
        </div>
    </main>
</template>

<script>
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
        Saved
    },
    data() {
        return {
            data
        }
    },
    methods: {
        allGenres() {
            let movieGenres = [], tvGenres = [];
            const apiParams = {
                params: {
                    api_key: '3390a8a14e621ee87b8e65a286d5c250',
                    language: 'it-IT'
                }
            }
            axios.get('https://api.themoviedb.org/3/genre/movie/list', apiParams)
            .then(response => {
                movieGenres = response.data.genres;
                axios.get('https://api.themoviedb.org/3/genre/tv/list', apiParams)
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
@import '../../assets/style/mixins/mixin.scss';
main {
    padding: 90px 40px 15px;
    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, 250px);
        grid-gap: 30px;
        justify-content: center;
    }
    @include noContent;
    >.no-content {
        margin-top: 200px;
    }
}
</style>