import Vue from 'vue';

export default Vue.observable({
    apiCalls: false,
    menuIsOpen: false,
    search: "",
    searchBar: false,
    searchResults: [],
    noResults: false,
    searchLoader: false,
    screen: null,
    bigScreen: false,
    smallScreen: false,
    device: null,
    contentInfo: {
        open: false,
        content: null
    },
    heroInterval: null,
    cardInfo: {
        open: false,
        timeout: null
    },
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
    top10: [],
    genres: [],
});