import Vue from 'vue';

export default Vue.observable({
    search: "",
    searchBar: false,
    loader: false,
    movies: [],
    trendingMovies: [],
    trendingMoviesToday: [],
    series: [],
    trendingSeries: [],
    trendingSeriesToday: [],
    trending: [],
    trendingToday: [],
    saved: [],
    savedIds: [],
    pages: ['Home', 'Serie TV', 'Film', 'Nuovi e popolari', 'La mia lista'],
    selected: 'Home',
    genres: [],
    commonsApi: {
        params: {
            api_key: '3390a8a14e621ee87b8e65a286d5c250',
            language: 'it-IT'
        }
    },
    apiUrl: 'https://api.themoviedb.org/3',
    myFunc: {
        commons(contents, type) {
            contents.forEach(content => {
                try {
                    content.langImg = require('../assets/img/flags/' + content.original_language + '.png');
                }
                catch(err) {
                    content.langImg = null;
                }
                content.vote = Math.round(content.vote_average / 2);
                content.saved = false;
                if (type != 'all') {
                    content.type = type;
                }
            });
        },
    }
});