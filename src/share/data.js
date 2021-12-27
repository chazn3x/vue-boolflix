import Vue from 'vue';

export default Vue.observable({
    menuIsOpen: false,
    search: "",
    searchBar: false,
    screen: null,
    contentInfo: {
        open: false,
        content: null,
        key: null
    },
    loader: false,
    show: false,
    top: null,
    left: null,
    movies: [],
    series: [],
    saved: [],
    savedIds: [],
    pages: ['Home', 'Serie TV', 'Film', 'Nuovi e popolari', 'La mia lista'],
    selected: 'Home',
    trending: {
        trendingEndpoints: [
            {
                enpoint: '/trending/all/week',
                type: 'all',
                contents: 'allWeek'
            },
            {
                enpoint: '/trending/all/day',
                type: 'all',
                contents: 'allDay',
            },
            {
                enpoint: '/trending/tv/week',
                type: 'tv',
                contents: 'seriesWeek'
            },
            {
                enpoint: '/trending/tv/day',
                type: 'tv',
                contents: 'seriesDay'
            },
            {
                enpoint: '/trending/movie/week',
                type: 'movie',
                contents: 'moviesWeek'
            },
            {
                enpoint: '/trending/movie/day',
                type: 'movie',
                contents: 'moviesDay'
            },
        ],
        status: 0,
        allWeek: [],
        moviesWeek: [],
        seriesWeek: [],
        allDay: [],
        moviesDay: [],
        seriesDay: [],
    },
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