import axios from "axios";
import dayjs from "dayjs";
import data from './data.js';
const
apiUrl = 'https://api.themoviedb.org/3',
apiKey = '3390a8a14e621ee87b8e65a286d5c250',
lang = 'it-IT',
commonsApi = {
    params: {
        api_key: apiKey,
        language: lang
    }
},
trendingEndpoints = [
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
];
let apiStatus, genres, trendingApiCalls;

getDataFromApi();

// functions

// get data from apis
function getDataFromApi() {
    apiStatus = 0, genres = false, trendingApiCalls = 0;
    getAllGenres();
    getDataFromEndpoints();
    checkApiCalls();
}


// get all genres
function getAllGenres() {
    axios.all([
        axios.get(apiUrl + '/genre/tv/list', commonsApi),
        axios.get(apiUrl + '/genre/movie/list', commonsApi)
    ])
    .then(response => {
        data.genres = response[0].data.genres.concat(response[1].data.genres);
        genres = true;
        apiStatus++;
    })
    .catch(err => {
        console.log(err);
    });
}

// api call for each endpoint
function getDataFromEndpoints() {
    if (genres) {
        trendingEndpoints.forEach(obj => {
            axios.get(apiUrl + obj.enpoint, commonsApi)
            .then(response => {
                data.trending[obj.contents] = response.data.results;
                data.trending[obj.contents].forEach(content => {
                    getYear(content);
                    getGenres(content);
                    getAdditionalInfo(content);
                });
            })
            .catch(err => {
                console.log(err);
            });
        });
    } else setTimeout(() => {
        getDataFromEndpoints();
    }, 250);
}

// check api calls

// all api calls
function checkApiCalls() {
    if (apiStatus == 2) {
        data.apiCalls = true;
        console.log('fine chiamate', data.apiCalls);
    } else setTimeout(() => {
        checkApiCalls();
    }, 250);
}

// functions per content

// year
function getYear(content) {
    if (content.media_type == 'movie') {
        content.year = dayjs(content.release_date, 'YYYY-MM-DD').format('YYYY');  
    } else if (content.media_type == 'tv') { 
    content.year = dayjs(content.first_air_date, 'YYYY-MM-DD').format('YYYY');
    } else content.year = null;
}

// genres
function getGenres(content) {
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
}

// additional content info api calls
function getAdditionalInfo(content) {
    axios.all([
        // images
        axios.get(apiUrl + `/${content.media_type}/${content.id}/images`, {
            params: {
                api_key: apiKey,
                include_image_language: 'en,it,null'
            }
        }),
        // videos
        axios.get(apiUrl + `/${content.media_type}/${content.id}/videos`, commonsApi),
        // credits
        axios.get(apiUrl + `/${content.media_type}/${content.id}/credits`, commonsApi),
        // general
        axios.get(apiUrl + `/${content.media_type}/${content.id}`, commonsApi)
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

        trendingApiCalls++;
        if (trendingApiCalls == 120) apiStatus++;
    })
    .catch(err => {
        console.log(err);
    });
}