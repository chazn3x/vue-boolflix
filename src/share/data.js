import Vue from 'vue';

export default Vue.observable({
    apiCalls: false,
    menuIsOpen: false,
    search: "",
    searchBar: false,
    screen: null,
    contentInfo: {
        open: false,
        content: null
    },
    heroInterval: null,
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
        allWeek: [],
        moviesWeek: [],
        seriesWeek: [],
        allDay: [],
        moviesDay: [],
        seriesDay: [],
    },
    genres: [],
});