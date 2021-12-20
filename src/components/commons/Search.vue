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
                data.contents = [];
                let movies = [], series = [];
                axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: '3390a8a14e621ee87b8e65a286d5c250',
                        query: data.search,
                        language: 'it-IT'
                    }
                })
                .then(response => {
                    movies = response.data.results;
                    axios.get('https://api.themoviedb.org/3/search/tv', {
                        params: {
                            api_key: '3390a8a14e621ee87b8e65a286d5c250',
                            query: data.search,
                            language: 'it-IT'
                        }
                    })
                    .then(response => {
                        series = response.data.results;
                        data.contents = movies.concat(series);
                        data.contents.forEach(content => {
                            try {
                                content.langImg = require('../../assets/img/flags/' + content.original_language + '.png');
                            }
                            catch(err) {
                                content.langImg = null;
                            }
                        });
                    });
                });
            } else {
                data.contents = [];
            }
        }
    }
}
</script>

<style>

</style>