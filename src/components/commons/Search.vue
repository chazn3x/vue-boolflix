<template>
    <div class="search">
        <input type="text" v-model="data.search" @keyup="search()">
    </div>
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
                axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: '3390a8a14e621ee87b8e65a286d5c250',
                        query: data.search,
                        language: 'it-IT'
                    }
                })
                .then(response => {
                    data.movies = response.data.results;
                    data.movies.forEach(content => {
                        try {
                            content.langImg = require('../../assets/img/flags/' + content.original_language + '.png');
                        }
                        catch(err) {
                            content.langImg = null;
                        }
                        content.vote = Math.floor(content.vote_average / 2);
                    });
                });
                axios.get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: '3390a8a14e621ee87b8e65a286d5c250',
                        query: data.search,
                        language: 'it-IT'
                    }
                })
                .then(response => {
                    data.series = response.data.results;
                    data.series.forEach(content => {
                        try {
                            content.langImg = require('../../assets/img/flags/' + content.original_language + '.png');
                        }
                        catch(err) {
                            content.langImg = null;
                        }
                        content.vote = Math.floor(content.vote_average / 2);
                    });
                });
            } else {
                data.movies = [];
                data.series = [];
            }
        }
    }
}
</script>

<style>

</style>