<template>
    <div class="content-info" ref="content" :class="{'active' : data.contentInfo.open}" @click="closeInfo()" v-if="data.contentInfo.content">
        <div class="card" @click.stop>
            <div class="btn close" @click="closeInfo()" title="Chiudi">
                <span></span>
                <span></span>
            </div>
            <div class="preview" ref="preview">
                <img :src="'https://image.tmdb.org/t/p/original/' + content.backdrop_path" alt="">
                <div v-show="content.key != 'abc'" class="video" ref="youtubeWrapper">
                    <youtube
                    :video-id="content.key"
                    :player-vars="playerVars"
                    :nocookie="true"
                    :width="100 + '%'"
                    :height="100 + '%'"
                    @error="error()"
                    @playing="playing()"
                    @ended="ended()"
                    ref="youtube"
                    ></youtube>
                </div>
                <div class="layover" ref="layover"></div>
            </div>
            <div class="info">
                <div class="content-type" v-if="content.media_type == 'movie' || content.media_type == 'tv'">
                    <div class="small-logo">
                        <img src="../../assets/img/logo-b.png" alt="Boolflix small-logo content type">
                    </div>
                    <h4>{{content.media_type == 'movie' ? 'Film' : 'Serie'}}</h4>
                </div>
                <div class="content-title">
                    <img v-if="content.logo" :src="'https://image.tmdb.org/t/p/original/' + content.logo" alt="">
                    <h2 v-else>{{content.title || content.name}}</h2>
                </div>
                <div class="buttons row">
                    <button class="trailer" title="Trailer" v-if="content.key != 'abc'">
                        <a :href="'https://www.youtube.com/watch?v=' + content.key" target="_blank">
                            <i class="fas fa-play"></i>
                            <span>Trailer</span>
                        </a>
                    </button>
                    <div class="btn save" :class="{'remove' : data.savedIds.includes(content.id)}" @click="save()">
                        <span></span>
                        <span></span>
                        <div class="btn-title">
                            <div class="text">
                                {{(data.savedIds.includes(content.id) ? 'Rimuovi da' : 'Aggiungi a')}} La mia lista
                            </div>
                            <div class="square"></div>
                        </div>
                    </div>
                    <div class="btn volume" :class="{'unmute' : !isMuted}" @click="volume()" title="Volume">
                        <img src="../../assets/img/buttons/volume.png" alt="">
                        <span></span>
                    </div>
                </div>
                <div class="text row">
                    <div class="left">
                        <div class="row top">
                            <div class="vote" v-if="content.vote_average" :class="{'green' : content.vote_average >= 6, 'yellow' : content.vote_average >= 4 && content.vote_average < 6, 'red' : content.vote_average < 4}">
                                <p>{{content.vote_average * 10}}% di voti positivi</p>
                            </div>
                            <div v-if="content.year" class="year">
                                <span>{{content.year}}</span>
                            </div>
                            <div v-if="content.duration" class="duration">
                                <span>{{content.duration}}</span>
                            </div>
                        </div>
                        <div class="overview">
                            <p>{{content.overview}}</p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="cast" v-if="content.people.smallCast">
                            <p><span class="list-title">Cast: </span><span>{{content.people.smallCast}}</span></p>
                        </div>
                        <div class="genres" v-if="content.smallGenres">
                            <p><span class="list-title">Generi: </span><span>{{content.smallGenres}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="gallery" v-if="content.images.backdrops.length > 0">
                    <h3>Sfondi</h3>
                    <div class="backdrops" ref="backdrops">
                        <a :href="'https://image.tmdb.org/t/p/original/' + backdrop.file_path" target="_blank" class="backdrop" v-for="(backdrop, index) in content.images.backdrops" :key="index">
                            <img :src="'https://image.tmdb.org/t/p/original/' + backdrop.file_path" alt="">
                        </a>
                    </div>
                    <!-- <h3>Loghi</h3>
                    <div class="logos" ref="logos">
                        <div class="logo" v-for="(logo, index) in images.logos" :key="index">
                            <img :src="'https://image.tmdb.org/t/p/original/' + logo.file_path" alt="">
                        </div>
                    </div> -->
                </div>
                <div class="more-info">
                    <h3>Info su <strong>{{content.title || content.name}}</strong></h3>
                    <div class="text">
                        <div class="crew">
                            <p v-if="content.people.directors"><span class="list-title">Regia: </span><span>{{content.people.directors}}</span></p>
                            <p v-if="content.people.producers"><span class="list-title">Produzione: </span><span>{{content.people.producers}}</span></p>
                            <p v-if="content.people.creators"><span class="list-title">Produzione: </span><span>{{content.people.creators}}</span></p>
                            <p v-if="content.people.executiveProducers"><span class="list-title">Produzione esecutiva: </span><span>{{content.people.executiveProducers}}</span></p>
                            <p v-if="content.people.writers"><span class="list-title">Scrittori: </span><span>{{content.people.writers}}</span></p>
                        </div>
                        <div class="cast" v-if="content.people.cast">
                            <p><span class="list-title">Cast: </span><span>{{content.people.cast}}</span></p>
                        </div>
                        <div class="genres" v-if="content.genres">
                            <p><span class="list-title">Generi: </span><span>{{content.genres}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
import VueYoutube from 'vue-youtube'
import Vue from 'vue'
Vue.use(VueYoutube);
export default {
    name: 'ContentInfo',
    data() {
        return {
            data,
            playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                rel: 0
            },
            isMuted: true,
            timeout: null,
        }
    },
    methods: {
        closeInfo() {
            document.body.style.overflow = 'auto';
            data.contentInfo.open = false
        },
        error() {
            this.YTWrapper.style.opacity = '0';
        },
        playing() {
            setTimeout(() => {
                this.YTWrapper.style.opacity = '1';
            }, 500);
        },
        ended() {
            this.player.stopVideo();
            this.YTWrapper.style.opacity = '0';
        },
        volume() {
            if (this.isMuted) {
                this.isMuted = false;
                this.player.unMute();
            } else {
                this.isMuted = true;
                this.player.mute();
            }
        },
        showControls() {
            clearTimeout(this.timeout);
            this.playerControls.style.opacity = '1';
            this.playerControls.style.visibility = 'visible';
            this.$refs.preview.style.cursor = 'default';
            this.hideControls();
        },
        hideControls() {
            this.timeout = setTimeout(() => {
                this.playerControls.style.opacity = '0';
                this.playerControls.style.visibility = 'hidden';
                this.$refs.preview.style.cursor = 'none';
            }, 3000);
        },
        save() {
            let save = true;
            for (let i = 0; i < data.saved.length; i++) {
                if (data.saved[i].id == this.content.id) {
                    data.saved.splice(i, 1);
                    data.savedIds.splice(i, 1);
                    save = false;
                }
            }
            if (save) {
                data.saved.unshift(this.content);
                data.savedIds.unshift(this.content.id);
            }
        },
    },
    computed: {
        content() {
            return data.contentInfo.content;
        },
        player() {
            return this.$refs.youtube.player;
        },
        YTWrapper() {
            return this.$refs.youtubeWrapper;
        }
    },
    watch: {
        '$data.data.contentInfo.open'(open) {
            if (open) {
                setTimeout(() => {
                    this.$refs.content.scrollTop = 0;
                    this.$refs.backdrops.scrollLeft = 0;
                    this.$refs.youtube.player.playVideo();
                });
            } else this.$refs.youtube.player.stopVideo();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include btn;
.content-info {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 15;
    transition: .3s;
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
    visibility: hidden;
    opacity: 0;
    .card {
        color: rgb(240,240,240);
        transition: .3s;
        transform: scale(0);
        background-color: rgb(20,20,20);
        width: 100%;
        min-height: 100vh;
        position: relative;
        padding: 1rem;
        // overflow: hidden;
        .btn.close {
            position: absolute;
            top: 0;
            right: 0;
            margin: 1rem;
            background-color: rgba(0,0,0,0.8);
            border: none;
                span {
                    width: 60%;
                }
                span:first-of-type {
                    transform: rotate(45deg);
                }
                span:last-of-type {
                    transform: rotate(-45deg);
                }
        }
        .preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: calc(100vw * 0.56);
            z-index: -1;
            overflow: hidden;
            >img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                position: absolute;
                z-index: -2;
            }
            .video {
                width: 135%;
                height: 135%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);
                z-index: -1;
                opacity: 0;
                transition: opacity .3s;
                pointer-events: none;
            }
            .layover {
                width: 100%;
                height: 100%;
                background: linear-gradient(rgba(0,0,0,0) 30%, rgba(20,20,20,1) 100%);
            }
        }
        .info {
            margin-top: 20vw;
            margin-bottom: 4rem;
            h3 {
                font-size: 1.5rem;
                font-weight: 400;
                margin-bottom: 1rem;
            }
            .content-type {
                display: flex;
                align-items: center;
                height: 1.5rem;
                margin-bottom: .3rem;
                .small-logo {
                    height: inherit;
                    img {
                        height: inherit;
                        margin-right: .5rem;
                    }
                }
                h4 {
                    opacity: .8;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 700;
                    font-size: 1rem;
                }
            }
            .content-title {
                img {
                    max-width: 80%;
                    max-height: 100px;
                }
            }
            .row {
                display: flex;
            }
            .buttons {
                align-items: center;
                margin-top: 1rem;
                .trailer {
                    margin-right: .8rem;
                    display: block;
                    border: none;
                    box-shadow: none;
                    border-radius: 4px;
                    background-color: #fff;
                    a {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: .3rem 2rem;
                        color: black;
                        font-size: 1.5rem;
                        font-weight: 400;
                        span {
                            display: inline-block;
                            padding-left: 1rem;
                        }
                    }
                }
                .btn {
                    &.save {
                        span {
                            width: 50%;
                        }
                        span:last-of-type {
                            transform: rotate(90deg);
                            -webkit-transform: rotate(90deg);
                        }
                        &.remove {
                            span:last-of-type {
                                opacity: 0;
                            }
                        }
                    }
                    &.volume {
                        margin-left: auto;
                        img {
                            width: 55%;
                            filter: invert(.9);
                        }
                        span {
                            opacity: 1;
                            width: 65%;
                            transform: rotate(45deg);
                            -webkit-transform: rotate(45deg);
                        }
                        &.unmute {
                            span {
                                opacity: 0;
                            }
                        }
                    }
                }
            }
            .text {
                margin-top: 1.5rem;
                margin-bottom: 2rem;
                flex-direction: column;
                .top {
                    align-items: center;
                    margin-bottom: .6rem;
                    .vote {
                        font-size: 1rem;
                        font-weight: 500;
                        margin-right: .4rem;
                        &.green p {
                            color: rgb(70,211,105);
                        }
                        &.yellow p {
                            color: rgb(211, 185, 70);
                        }
                        &.red p {
                            color: rgb(211, 75, 70);
                        }
                    }
                    .year {
                        margin-right: .4rem;
                    }
                }
                .overview {
                    line-height: 1.7rem;
                    font-size: 1.2rem;
                    letter-spacing: .6px;
                }
                .right {
                    margin-top: 1rem;
                    font-weight: 400;
                    .list-title {
                        font-weight: 300;
                        color: grey;
                    }
                    &>* {
                        margin-bottom: 1rem;
                    }
                }
            }
            .gallery {
                margin-bottom: 2rem;
                .backdrops {
                    overflow-x: scroll;
                    overflow-y: hidden;
                    display: flex;
                    border-radius: 3px;
                    height: 140px;
                    .backdrop {
                        width: 250px;
                        height: 140px;
                        flex-shrink: 0;
                        margin-right: 10px;
                        border-radius: 3px;
                        img {
                            object-fit: cover;
                            width: 100%;
                            height: 100%;
                            border-radius: 3px;
                        }
                    }
                }
            }
            .more-info {
                .text {
                    margin-top: 1rem;
                    font-weight: 400;
                    .list-title {
                        font-weight: 300;
                        color: grey;
                    }
                    p {
                        line-height: 1.4rem;
                        margin-bottom: .6rem;
                    }
                }
            }
        }
    }
    @media screen and (min-width: 768px) {
        min-height: 56vw;
        background-color: rgba(0,0,0,0.5);
        backdrop-filter: blur(.5px);
        -webkit-backdrop-filter: blur(.5px);
        .card {
            margin: 2.5rem auto;
            padding: 2rem;
            width: 768px;
            border-radius: .5rem;
            .preview {
                height: calc(768px * 0.56);
                border-radius: .5rem .5rem 0 0;
            }
        }
        .info {
            margin-top: 200px !important;
            margin-bottom: 5rem !important;
            .content-title h2 {
                font-size: 3.5rem;
            }
            .text {
                flex-direction: row !important;
                .left {
                    width: 70%;
                    margin-right: 3rem;
                }
                .right {
                    width: 30%;
                    margin-top: 0 !important;
                }
            }
        }
    }
    &.active {
        visibility: visible;
        opacity: 1;
        .card {
            transform: scale(1);
        }
    }
}
</style>