import Vue from 'vue';

export default Vue.observable({
    search: "",
    searchMain: true,
    searchHeader: false,
    movies: [],
    trendingMovies: [],
    series: [],
    trendingSeries: [],
    trending: [],
    saved: [],
    savedIds: [],
    pages: ['Home', 'Serie TV', 'Film', 'Nuovi e popolari', 'La mia lista'],
    selected: 'Home',
});