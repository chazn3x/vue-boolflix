import Vue from 'vue';
// import axios from 'axios'

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
    genres: [],
    myFunc: {
        commons(contents, type) {
            contents.forEach(content => {
                try {
                    content.langImg = require('../assets/img/flags/' + content.original_language + '.png');
                }
                catch(err) {
                    content.langImg = null;
                }
                content.vote = Math.floor(content.vote_average / 2);
                content.saved = false;
                if (type != 'all') {
                    content.type = type;
                }
                // console.log(content.genre_ids);
                
            });
        }
    }
});