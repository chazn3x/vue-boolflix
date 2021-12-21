<template>
    <section>
        <div class="section-title">
            <img src="../../assets/img/logo-b.png" alt="Boolflix single letter logo movies">
            <h2>Film</h2>
        </div>
        <div class="no-content" v-if="data.search != '' && data.movies.length == 0">
            Non ci sono film che soddisfano i criteri di ricerca.
        </div>
        <div class="cards" v-else-if="data.search != ''">
            <Card v-for="(content, index) in data.movies" :key="index" :content="content"/>
        </div>
        <div class="cards" v-else>
            <Card v-for="(content, index) in data.trendingMovies" :key="index" :content="content"/>
        </div>
    </section>
</template>

<script>
import data from '../../share/data.js'
import Card from '../commons/Card.vue'
import axios from 'axios'
export default {
    name: "Movies",
    components: {
        Card
    },
    data() {
        return {
            data
        }
    },
    methods: {
        trending() {
            const apiParams = {
                params: {
                    api_key: '3390a8a14e621ee87b8e65a286d5c250',
                    language: 'it-IT'
                }
            }
            axios.get('https://api.themoviedb.org/3/trending/movie/week', apiParams)
            .then(response => {
                data.trendingMovies = response.data.results;
                data.myFunc.commons(data.trendingMovies, 'movie');
            });
        },
        // commons(contents) {
        //     contents.forEach(content => {
        //         try {
        //             content.langImg = require('../../assets/img/flags/' + content.original_language + '.png');
        //         }
        //         catch(err) {
        //             content.langImg = null;
        //         }
        //         content.vote = Math.floor(content.vote_average / 2);
        //         content.saved = false;
        //         content.type = 'movie';
        //         const apiParams = {
        //             params: {
        //                 api_key: '3390a8a14e621ee87b8e65a286d5c250',
        //                 language: 'it-IT',
        //             }
        //         };
        //         axios.get(`https://api.themoviedb.org/3/movie/${content.id}/credits`, apiParams)
        //         .then(response => {
        //             if (response.data.cast != undefined) {
        //                 content.cast = response.data.cast;
        //             }
        //         })
        //         .catch(() => {
        //             content.cast = ['N/A'];
        //         });
        //         axios.get(`https://api.themoviedb.org/3/movie/${content.id}`, apiParams)
        //         .then(response => {
        //             if (response.data.genres != undefined) {
        //                 content.genres = response.data.genres;
        //             }
        //         })
        //         .catch(() => {
        //             content.genres = ['N/A'];
        //         });
        //     });
        // }
    },
    created() {
        this.trending();
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include sectionTitle;
@include noContent;
</style>