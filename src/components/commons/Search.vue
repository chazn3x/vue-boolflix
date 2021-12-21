<template>
    <input type="text" v-model="data.search" @keyup="search()" placeholder="Cerca un film o una serie TV">
</template>

<script>
import data from '../../share/data.js'
import axios from 'axios'
export default {
    name: 'Search',
    data() {
        return {
            data
        }
    },
    methods: {
        search() {
            if (data.search != '') {
                const apiParams = {
                    params: {
                        api_key: '3390a8a14e621ee87b8e65a286d5c250',
                        query: data.search,
                        language: 'it-IT'
                    }
                }
                axios.get('https://api.themoviedb.org/3/search/movie', apiParams)
                .then(response => {
                    data.movies = response.data.results;
                    this.commons(data.movies);
                });
                axios.get('https://api.themoviedb.org/3/search/tv', apiParams)
                .then(response => {
                    data.series = response.data.results;
                    this.commons(data.series);
                });
                if (data.selected == 'Nuovi e popolari' || data.selected == 'La mia lista') {
                    data.selected = 'Home';
                }
            } else {
                data.movies = [];
                data.series = [];
            }
        },
        commons(contents) {
            contents.forEach(content => {
                try {
                    content.langImg = require('../../assets/img/flags/' + content.original_language + '.png');
                }
                catch(err) {
                    content.langImg = null;
                }
                content.vote = Math.floor(content.vote_average / 2);
                content.saved = false;
            });
        }
    }
}
</script>