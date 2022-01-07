<template>
    <input type="text" :value="data.search" @input="event => data.search = event.target.value" placeholder="Cerca un film o una serie TV" spellcheck="false" translate="false">
</template>

<script>
import data from '../../share/data.js'
import axios from 'axios'
import dayjs from "dayjs";
export default {
    name: 'Search',
    data() {
        return {
            data,
            searching: false,
            timeout : null,
            movies: [],
            series: [],
            moviesCounter: 0,
            seriesCounter: 0,
            totalMovies: 0,
            totalSeries: 0,
            searchApiCalls: false
        }
    },
    methods: {
        search(searchQuery) {
            data.searchResults = [];
            this.movies = [];
            this.series = [];
            this.moviesCounter = 0;
            this.seriesCounter = 0;
            this.searchApiCalls = false;
            this.searching = true;
            data.searchLoader = true;
            this.timeout = setTimeout(() => {
                const apiParams = {
                    params: {
                        api_key: '3390a8a14e621ee87b8e65a286d5c250',
                        query: searchQuery,
                        language: 'it-IT',
                        region: 'IT'
                    }
                }
                axios.all([
                    axios.get('https://api.themoviedb.org/3/search/movie', apiParams),
                    axios.get('https://api.themoviedb.org/3/search/tv', apiParams)
                ])
                .then(response => {
                    // this.movies = response[0].data.results;
                    response[0].data.results.forEach(content => {
                        this.movies.push(content);
                    });
                    this.totalMovies = response[0].data.total_results;
                    console.log(response[0].data.total_pages);
                    if (response[0].data.total_pages > 1) {
                        const max = 40;
                        axios.get('https://api.themoviedb.org/3/search/movie', {
                            params: {
                                api_key: '3390a8a14e621ee87b8e65a286d5c250',
                                query: searchQuery,
                                language: 'it-IT',
                                region: 'IT',
                                page: 2
                            }
                        })
                        .then(response => {
                            response.data.results.forEach(content => {
                                this.movies.push(content);
                            });
                            if (this.movies.length > 0) {
                                this.movies.forEach(movie => {
                                    this.getAdditionalData(movie, apiParams, 'movie', max);
                                });
                            }
                        })
                    } else {
                        if (this.movies.length > 0) {
                            const max = 20;
                            this.movies.forEach(movie => {
                                this.getAdditionalData(movie, apiParams, 'movie', max);
                                this.checkSearchCalls();
                            });
                        }
                    }
                    // this.series = response[1].data.results;
                    response[1].data.results.forEach(content => {
                        this.series.push(content);
                    });
                    this.totalSeries = response[1].data.total_results;
                    if (response[1].data.total_pages > 1) {
                        const max = 40;
                        axios.get('https://api.themoviedb.org/3/search/tv', {
                            params: {
                                api_key: '3390a8a14e621ee87b8e65a286d5c250',
                                query: searchQuery,
                                language: 'it-IT',
                                region: 'IT',
                                page: 2
                            }
                        })
                        .then(response => {
                            response.data.results.forEach(content => {
                                this.series.push(content);
                            });
                            if (this.series.length > 0) {
                                this.series.forEach(movie => {
                                    this.getAdditionalData(movie, apiParams, 'tv', max);
                                    this.checkSearchCalls();
                                });
                            }
                        })
                    } else {
                        if (this.series.length > 0) {
                            const max = 20;
                            this.series.forEach(movie => {
                                this.getAdditionalData(movie, apiParams, 'tv', max);
                            });
                        }
                    }
                    if (this.movies.length > 0 || this.series.length > 0) {
                        this.checkSearchCalls();
                    } else {
                        this.searching = false
                        data.noResults = true;
                        data.searchLoader = false;
                    }
                });
            }, 1500);
        },
        getAdditionalData(content, apiParams, type, max) {
            // year
            if (content.release_date) {
                content.year = dayjs(content.release_date, 'YYYY-MM-DD').format('YYYY');  
            } else if (content.first_air_date) { 
            content.year = dayjs(content.first_air_date, 'YYYY-MM-DD').format('YYYY');
            } else content.year = null;
            // genres
            let genres = [];
            content.genres = '';
            content.smallGenres = '';
            content.genre_ids.forEach(id => {
                data.genres.forEach(genre => {
                    if (genre.id == id && !genres.includes(genre.name)) {
                        genres.push(genre.name);
                    }
                });
            });
            genres.forEach((genre, i) => {
                content.genres += genre;
                if (i < genres.length - 1) content.genres += ', ';
                if (i < 3) {
                    content.smallGenres += genre;
                    if (i < 2 && i < genres.length - 1) content.smallGenres += ', ';
                }
            });
            // other api calls
            axios.all([
                // images
                axios.get('https://api.themoviedb.org/3' + `/${type}/${content.id}/images`, {
                    params: {
                        api_key: '3390a8a14e621ee87b8e65a286d5c250',
                        include_image_language: 'en,it,null'
                    }
                }),
                // videos
                axios.get('https://api.themoviedb.org/3' + `/${type}/${content.id}/videos`, apiParams),
                // credits
                axios.get('https://api.themoviedb.org/3' + `/${type}/${content.id}/credits`, apiParams),
                // general
                axios.get('https://api.themoviedb.org/3' + `/${type}/${content.id}`, apiParams)
            ])
            .then(response => {
                // images
                content.images = response[0].data;
                if (content.images.logos.length > 0) {
                    content.logo = content.images.logos[0].file_path;
                } else content.logo = null;

                // videos
                if (response[1].data.results.length > 0) {
                    content.key = response[1].data.results[0].key;
                } else content.key = 'abc';

                // cast and crew
                const people = response[2].data;
                content.people = {
                    producers: '',
                    executiveProducers: '',
                    directors: '',
                    creators: '',
                    writers: '',
                    cast: '',
                    smallCast:''
                }
                const producers = {
                    type: 'producers',
                    name: 'producer',
                    list: []
                };
                const executiveProducers = {
                    type: 'executiveProducers',
                    name: 'executive producer',
                    list: []
                };
                const directors = {
                    type: 'directors',
                    name: 'director',
                    list: []
                };
                const creators = {
                    type: 'creators',
                    name: 'creator',
                    list: []
                };
                const writers = {
                    type: 'writers',
                    name: 'writer',
                    list: []
                };
                const crew = [producers, executiveProducers, directors, creators, writers];
                people.crew.forEach(member => {
                    crew.forEach(department => {
                    if (member.job.toLowerCase() == department.name && !department.list.includes(member.name)) {
                        department.list.push(member.name);
                    }
                    });
                });
                crew.forEach(department  => {
                    department.list.forEach((member, i) => {
                    content.people[department.type] += member;
                    if (i < department.list.length - 1) content.people[department.type] += ', ';
                    });
                });
                people.cast.forEach((actor, i) => {
                    content.people.cast += actor.name;
                    if (i < people.cast.length - 1) content.people.cast += ', ';
                    if (i < 3) {
                    content.people.smallCast += actor.name;
                    if (i < 2) content.people.smallCast += ', '
                    }
                });

                // duration
                if (content.media_type == 'movie') {
                    let duration = response[3].data.runtime;
                    let h, m;
                    h = Math.floor(duration / 60);
                    m = duration - (h * 60);
                    content.duration = h + 'h ' + m + 'min';
                } else if (content.media_type == 'tv') {
                    content.duration = response[3].data.number_of_seasons;
                    content.duration > 1 ? content.duration += ' stagioni' : content.duration += ' stagione';
                }
                if (type == 'movie') {
                    this.moviesCounter++;
                    if (this.moviesCounter == this.totalMovies || this.moviesCounter == max) {
                        this.searchApiCalls = true;
                    }
                } else if (type == 'tv') {
                    this.seriesCounter++;
                    if (this.seriesCounter == this.totalSeries || this.seriesCounter == max) {
                        this.searchApiCalls = true;
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        checkSearchCalls() {
            if (this.searchApiCalls) {
                data.searchResults = this.movies.concat(this.series);
                const popularity = (a, b) => {
                    return a.popularity < b.popularity;
                }
                data.searchResults.sort(popularity);
                this.searching = false;
                data.noResults = false;
                data.searchLoader = false;
            } else setTimeout(() => {
                this.checkSearchCalls();
            }, 250);
        }
    },
    watch: {
        '$data.data.search'(searchQuery) {
            window.scrollTo(0,0);
            if (searchQuery != '' && !this.searching) {
                this.search(searchQuery);
            } else if (searchQuery != '' && this.searching) {
                clearTimeout(this.timeout);
                this.search(searchQuery);
            } else {
                clearTimeout(this.timeout);
            }
        }
    }
}
</script>