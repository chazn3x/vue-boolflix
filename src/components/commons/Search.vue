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
            data,
            searching: false,
            timeout : null,
        }
    },
    methods: {
        startSearch() {
            this.timeout = setTimeout(() => {
                data.loader = false;
                this.searching = false;
                if (data.search != '') {
                    const apiParams = {
                        params: {
                            api_key: '3390a8a14e621ee87b8e65a286d5c250',
                            query: data.search,
                            language: 'it-IT'
                        }
                    }
                    axios.get(data.apiUrl + '/search/movie', apiParams)
                    .then(response => {
                        data.movies = response.data.results;
                        data.myFunc.commons(data.movies, 'movie');
                    });
                    axios.get(data.apiUrl + '/search/tv', apiParams)
                    .then(response => {
                        data.series = response.data.results;
                        data.myFunc.commons(data.series, 'tv');
                    });
                    if (data.selected == data.pages[3] || data.selected == data.pages[4]) {
                        data.selected = data.pages[0];
                        document.title = data.pages[0] + ' - Boolflix';
                    }
                } else {
                    data.movies = [];
                    data.series = [];
                }
            }, 1500);
        },
        search() {
            window.scrollTo(0,0);
            if (data.selected == data.pages[3] || data.selected == data.pages[4]) {
                data.selected = data.pages[0];
                document.title = data.pages[0] + ' - Boolflix';
            }
            data.loader = true;
            if (data.search == '') {
                data.loader = false;
            }
            this.stopSearch();
            if (!this.searching) {
                this.searching = true;
                this.startSearch();
            }
        },
        stopSearch() {
            if (this.searching) {
                clearTimeout(this.timeout);
                this.searching = false;
            }
        }
    }
}
</script>