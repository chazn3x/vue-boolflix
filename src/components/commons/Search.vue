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
                    data.contents = response.data.results;
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