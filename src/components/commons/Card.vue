<template>
    <div class="card">
        <div class="poster">
            <img v-if="content.poster_path != null" :src="'https://image.tmdb.org/t/p/w342/' + content.poster_path" :alt="content.title != undefined ? content.title + ' poster' : content.name + ' poster'">
            <div v-else class="null-poster">
                <i class="fas fa-film"></i>
            </div>
        </div>
        <div class="info">
            <div v-if="(data.savedIds.includes(content.id))" class="save" @click="remove">
                <span>-</span>
            </div>
            <div v-else class="save" @click="add">
                <span>+</span>
            </div>
            <div class="title">
                <span>Titolo: </span>
                <h3 v-if="content.title != undefined">{{content.title}}</h3>
                <h3 v-else>{{content.name}}</h3>
            </div>
            <div class="title-orig" v-if="content.title != content.original_title || content.name != content.original_name">
                <span>Titolo originale: </span>
                <p v-if="content.original_title != undefined">{{content.original_title}}</p>
                <p v-else>{{content.original_name}}</p>
            </div>
            <div class="lang">
                <span>Lingua originale: </span>
                <img v-if="content.langImg != null" :src="content.langImg" :alt="content.title != undefined ? content.title + ' language icon' : content.name + ' language icon'">
                <p v-else class="null-lang">
                    {{content.original_language}}
                </p>
            </div>
            <div class="vote">
                <span>Voto: </span>
                <p v-if="content.vote_average != 0" class="stars">
                    <span class="star" v-for="(icon, index) in 5" :key="index">
                        <span v-if="index < content.vote">&#9733;</span>
                        <span v-else>&#9734;</span>
                    </span> {{content.vote_count}} voti
                </p>
                <p v-else>-</p>
            </div>
            <div class="cast">
                <span>Cast: </span>
                <p v-for="(actor, index) in cast" :key="index">{{actor}}</p>
            </div>
            <div class="genres">
                <span>Generi: </span>
                <p v-for="(genre, index) in genres" :key="index">{{genre.name}}</p>
            </div>
            <div class="overview">
                <span>Overview: </span>
                <p v-if="content.overview != ''">{{content.overview}}</p>
                <p v-else>-</p>
            </div>
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
import axios from 'axios'
export default {
    name: "Card",
    props: {
        content: Object
    },
    data() {
        return {
            data,
            cast: [],
            genres: [],
            apiParams: {
                params: {
                    api_key: '3390a8a14e621ee87b8e65a286d5c250',
                    language: 'it-IT',
                }
            },
        }
    },
    methods: {
        add() {
            data.saved.push(this.content);
            data.savedIds.push(this.content.id);
        },
        remove() {
            for (let i = 0; i < data.saved.length; i++) {
                if (data.saved[i].id == this.content.id) {
                    data.saved.splice(i, 1);
                    data.savedIds.splice(i, 1);
                }
            }
        },
        getCast() {
            for (let i = 0; i < 5; i++) {
                axios.get(`https://api.themoviedb.org/3/movie/${this.content.id}/credits`, this.apiParams)
                .then(response => {
                    this.cast.push(response.data.cast[i].name);
                })
                .catch(() => {
                    axios.get(`https://api.themoviedb.org/3/tv/${this.content.id}/credits`, this.apiParams)
                    .then(response => {
                        this.cast.push(response.data.cast[i].name);
                    })
                    .catch(() => {
                        this.cast = [];
                    });
                });
            }
        },
        getGenres() {
            axios.get(`https://api.themoviedb.org/3/movie/${this.content.id}`, this.apiParams)
            .then(response => {
                this.genres = response.data.genres;
                console.log(response.data.genres);
            })
            .catch(() => {
                axios.get(`https://api.themoviedb.org/3/tv/${this.content.id}`, this.apiParams)
                .then(response => {
                    this.genres = response.data.genres;
                })
                .catch(() => {
                    this.genres = [];
                });
            });
        }
    },
    created() {
        this.getCast();
        this.getGenres();
    }
}
</script>

<style lang="scss" scoped>
.card {
    color: white;
    width: 100%;
    aspect-ratio: 2 / 3;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    .save {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 2.5rem;
        background: linear-gradient(-45deg, transparent 50%, rgba(255,0,0,0.5) 50%);
        &:hover {
            span {
                transition: .3s;
                transform: scale(1.3);
            }
        }
    }
    .poster {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        transition: opacity .3s, transform .5s;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .null-poster {
            width: 100%;
            height: 100%;
            background-color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            svg {
                font-size: 4rem;
            }
        }
    }
    .info {
        opacity: 0;
        transition: .3s;
        padding: 20px;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        height: 100%;
        h3, p {
            display: inline;
        }
        p {
            font-weight: 200;
        }
        span {
            font-weight: 400;
        }
        div {
            margin-bottom: 10px;
        }
        .lang {
            img, .null-lang {
                height: 1rem;
                display: inline-block !important;
            }
            .null-lang {
                width: 1rem;
                height: 1rem;
                background-color: #555;
                font-size: .6rem;
                line-height: 1rem;
                text-align: center;
                border-radius: 50%;
            }
        }
        .star {
            color: rgb(255, 203, 30);
        }
        .cast p:not(:last-of-type)::after, .genres p:not(:last-of-type)::after {
            content: ', ';
        }
    }
    &:hover {
        .info {
            opacity: 1;
        }
        .poster {
            opacity: .4;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
        }
    }
}
</style>