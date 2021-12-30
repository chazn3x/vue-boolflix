<template>
    <div class="content-info" :class="{'active' : data.contentInfo.open}" @click="closeInfo()" v-if="data.contentInfo.content">
        <div class="card" @click.stop>
            <div class="close-icon" @click="closeInfo()">
                <div class="icon">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="preview" ref="preview">
                <img :src="'https://image.tmdb.org/t/p/original/' + content.backdrop_path" alt="">
                <div class="video" ref="youtubeWrapper">
                    <youtube
                    :video-id="key"
                    :player-vars="playerVars"
                    :nocookie="true"
                    :width="100 + '%'"
                    :height="100 + '%'"
                    @ready="ready()"
                    @error="error()"
                    @playing="playing()"
                    @ended="ended()"
                    @paused="paused()"
                    ref="youtube"
                    ></youtube>
                </div>
                <div class="layover" ref="layover"></div>
                <div class="video-controls" v-if="key.length > 3" :class="{'full-screen' : isFullScreen}" ref="controls">
                    <div class="btn play-pause" :class="isPlaying ? 'pause' : 'play'" @click="playPause()">
                        <div class="btn-container">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div v-if="!isStopped" class="btn stop" @click="stop()">
                        <div class="square"></div>
                    </div>
                    <div class="btn volume" :class="{'unmute' : !isMuted}" @click="volume()">
                        <img src="../../assets/img/buttons/volume.png" alt="">
                        <span></span>
                    </div>
                    <div class="btn screen" @click="fullScreen()">
                        <div class="square">
                            <div class="squares"></div>
                            <div class="squares"></div>
                            <div class="squares"></div>
                            <div class="squares"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info">
                <div class="content-title">
                    <h2>{{content.title || content.name}}</h2>
                </div>
                <div class="text row">
                    <div class="left">
                        <div class="row top">
                            <div class="vote">
                                <p>{{content.vote_average * 10}}% di voti positivi</p>
                            </div>
                            <div class="year">
                                <span>{{year}}</span>
                            </div>
                        </div>
                        <div class="overview">
                            <p>{{content.overview}}</p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="cast">
                            <p><span class="list-title">Cast: </span><span>{{cast}}</span></p>
                        </div>
                        <div class="genres">
                            <p><span class="list-title">Generi: </span><span>{{genres}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import data from '../../share/data.js'
import VueYoutube from 'vue-youtube'
import Vue from 'vue'
Vue.use(VueYoutube);
import Dayjs from 'vue-dayjs';
Vue.use(Dayjs);
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
            key: '',
            isPlaying: false,
            isStopped: true,
            isMuted: true,
            isFullScreen: false,
            timeout: null,
            year: null,
            cast: null,
            genres: null
        }
    },
    methods: {
        closeInfo() {
            document.body.style.overflow = 'auto';
            data.contentInfo.open = false
            this.isPlaying = false;
        },
        error() {
            console.log(this.key);
            this.YTWrapper.style.opacity = '0';
        },
        ready() {
            // console.log("prova");
            // console.log(this.$refs.youtube.player.onError());
        },
        playing() {
            this.isPlaying = true;
            this.isStopped = false;
            this.YTWrapper.style.opacity = '1';
        },
        ended() {
            this.player.stopVideo();
            this.YTWrapper.style.opacity = '0';
            this.isPlaying = false;
            this.isStopped = true;
        },
        paused() {
            this.isPlaying = false;
            this.YTWrapper.style.opacity = '0';
        },
        playPause() {
            if (this.isPlaying) {
                this.player.pauseVideo();
            } else {
                this.player.playVideo();
                this.YTWrapper.style.opacity = '1';
            }
        },
        stop() {
            this.YTWrapper.style.opacity = '0';
            this.player.stopVideo();
            this.isPlaying = false;
            this.isStopped = true;
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
        fullScreen() {
            // if (!document.webkitFullscreenElement && this.$refs.preview.webkitRequestFullscreen) {
            //     console.log("fullscreen safari");
            //     this.$refs.preview.webkitRequestFullscreen();
            // } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
            //     console.log("exit fullscreen safari");
            //     document.webkitExitFullscreen();
            // }
            // if (!document.fullscreenElement && this.$refs.preview.webkitRequestFullscreen) {
            //     console.log("fullscreen");
            //     this.$refs.preview.webkitRequestFullscreen();
            // } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
            //     console.log("exit fullscreen");
            //     document.webkitExitFullscreen();
            // }
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                if (this.$refs.preview.requestFullscreen) {
                    console.log("fullscreen");
                    this.$refs.preview.requestFullscreen();
                } else if (this.$refs.preview.webkitRequestFullscreen) {
                    console.log("safari fullscreen");
                    this.$refs.preview.webkitRequestFullscreen();
                } else if (this.$refs.preview.msRequestFullscreen) {
                    console.log("mozilla fullscreen");
                    this.$refs.preview.msRequestFullscreen();
                }
                if (this.isMuted) {
                    this.isMuted = false;
                    this.player.unMute();
                }
                if (!this.isPlaying) {
                    this.isPlaying = true;
                    this.$refs.youtube.player.playVideo();
                }
                this.YTWrapper.style.opacity = '1';
                if (data.screen < 768) {
                    screen.orientation.lock("landscape");
                }
            } else {
                if (document.exitFullscreen) {
                    console.log("exit fullscreen");
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    console.log("safari exit fullscreen");
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    console.log("mozilla exit fullscreen");
                    document.msExitFullscreen();
                }
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
        getGenres(content) {
            data.contentInfo.genres = [];
            content.genre_ids.forEach(id => {
                data.genres.forEach(genre => {
                    if (genre.id == id) {
                        if (!data.contentInfo.genres.includes(genre.name)) {
                            data.contentInfo.genres.push(genre.name);
                        }
                    }
                });
            });
            if (data.contentInfo.genres.length == 0) {
                data.contentInfo.genres = ['N/A'];
            }
            let genres = data.contentInfo.genres;
            if (genres.length > 3) {
                genres.length = 3;
            }
            this.genres = '';
            genres.forEach((genre, i) => {
                this.genres += genre;
                if (i < genres.length - 1) this.genres += ', '; else this.genres += '.'
            });
        },
        getCast() {
            let cast = data.contentInfo.cast;
            if (cast.length > 3) {
                cast.length = 3;
            }
            this.cast = '';
            cast.forEach((actor, i) => {
                this.cast += actor.name;
                if (i < cast.length - 1) this.cast += ', '; else this.cast += '.'
            });
        }
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
        },
        playerControls() {
            return this.$refs.controls;
        }
    },
    watch: {
        '$data.data.contentInfo.content'(content) {
            axios.get(data.apiUrl + `/${content.media_type}/${content.id}/videos`, data.commonsApi)
            .then(response => {
                if (response.data.results.length > 0) {
                    this.key = response.data.results[0].key;
                } else this.key = 'abc';
            })
            axios.get(data.apiUrl + `/${content.media_type}/${content.id}/credits`, data.commonsApi)
            .then(response => {
                data.contentInfo.cast = response.data.cast;
                this.getCast();
            });
            this.year = this.$dayjs(content.release_date, 'YYYY-MM-DD').format('YYYY');
            this.getGenres(content);
        },
        '$data.data.contentInfo.open'(open) {
            setTimeout(() => {
                if (this.$refs.youtube) {
                    if (open) {
                        this.$refs.youtube.player.playVideo();
                    } else {
                        this.$refs.youtube.player.stopVideo();
                    }
                }
            }, 200);
        },
    },
    created() {
        const controls = () => {
            this.showControls();
        };
        document.addEventListener('fullscreenchange', () => {
            this.isFullScreen = !this.isFullScreen;
            if (this.isFullScreen) {
                this.$refs.layover.style.opacity = '0';
                this.hideControls();
                this.$refs.preview.addEventListener('mousemove', controls, true);
            } else {
                this.$refs.preview.removeEventListener('mousemove', controls, true);
                this.$refs.layover.style.opacity = '1';
                clearTimeout(this.timeout);
                this.$refs.preview.style.cursor = 'default';
                this.playerControls.style.opacity = '1';
                this.playerControls.style.visibility = 'visible';
            }
        });
        document.addEventListener('webkitfullscreenchange', () => {
            console.log("prova");
            this.isFullScreen = !this.isFullScreen;
            if (this.isFullScreen) {
                this.$refs.layover.style.opacity = '0';
                this.hideControls();
                this.$refs.preview.addEventListener('mousemove', controls, true);
            } else {
                this.$refs.preview.removeEventListener('mousemove', controls, true);
                this.$refs.layover.style.opacity = '1';
                clearTimeout(this.timeout);
                this.$refs.preview.style.cursor = 'default';
                this.playerControls.style.opacity = '1';
                this.playerControls.style.visibility = 'visible';
            }
        });
    }
}
</script>

<style lang="scss" scoped>
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
        min-height: 200vh;
        position: relative;
        padding: 1rem;
        overflow: hidden;
        .close-icon {
            position: absolute;
            top: 0;
            right: 0;
            margin: 1rem;
            width: 2.3rem;
            height: 2.3rem;
            background-color: rgba(0,0,0,0.5);
            border: .5px solid rgba(200,200,200,0.3);
            border-radius: 50%;
            transition: opacity .2s;
            &:hover {
                opacity: .8;
            }
            .icon {
                position: relative;
                width: 100%;
                height: 100%;
                span {
                    display: block;
                    width: 65%;
                    height: 1px;
                    position: absolute;
                    top: 50%;
                    border-radius: .5px;
                    background-color: #fff;
                }
                span:first-of-type {
                    left: 50%;
                    transform-origin: left;
                    transform: rotate(45deg) translate(-50%, -50%);
                }
                span:last-of-type {
                    right: 50%;
                    transform-origin: right;
                    transform: rotate(-45deg) translate(50%, -50%);
                }
            }
        }
        .preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            aspect-ratio: 16 / 9;
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
            .video-controls {
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                margin: 1rem;
                .btn {
                    width: 2.4rem;
                    height: 2.4rem;
                    border-radius: 10%;
                    margin-right: .6rem;
                    background-color: rgba(0,0,0,0.5);
                    border: 2px solid rgba(200,200,200,0.5);
                    position: relative;
                    transition: opacity .2s;
                    span {
                        display: block;
                        width: 100%;
                        height: 1px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-radius: .5px;
                        background-color: #fff;
                        transition: .2s;
                    }
                    &.play-pause.play {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .btn-container {
                            width: 70%;
                            height: 70%;
                            position: relative;
                            transform: rotate(-30deg);
                            span {
                                width: 86.6%;
                                left: 50%;
                            }
                            span:first-of-type {
                                top: 75%;
                                transform: translateX(-50%);
                                // right: 0;
                                // transform-origin: right;
                                // transform: rotate(30deg);
                            }
                            span:nth-of-type(2) {
                                transform-origin: left;
                                transform: rotate(60deg);
                            }
                            span:last-of-type {
                                transform-origin: left;
                                transform: rotate(120deg);
                            }
                        }
                    }
                    &.play-pause.pause {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .btn-container {
                            width: 60%;
                            height: 60%;
                            position: relative;
                            span {
                                transform: rotate(90deg);
                                top: 50%;
                            }
                            span:first-of-type {
                                left: -20%;
                            }
                            span:nth-of-type(2) {
                                opacity: 0;
                            }
                            span:last-of-type {
                                left: 20%;
                            }
                        }
                    }
                    &.stop {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .square {
                            width: 50%;
                            height: 50%;
                            border: 1px solid white;
                        }
                    }
                    &.volume {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img {
                            width: 55%;
                            filter: invert(1);
                        }
                        span {
                            opacity: 1;
                            top: 50%;
                            left: 50%;
                            width: 70%;
                            transform: rotate(45deg) translate(-50%, -50%);
                            transform-origin: left;
                        }
                        &.unmute {
                            span {
                                opacity: 0;
                            }
                        }
                    }
                    &.screen {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .square {
                            width: 50%;
                            height: 50%;
                            position: relative;
                            .squares {
                                width: 30%;
                                height: 30%;
                                position: absolute;
                            }
                            .squares:nth-of-type(1) {
                                top: 0;
                                left: 0;
                                border-top: 1px solid white;
                                border-left: 1px solid white;
                            }
                            .squares:nth-of-type(2) {
                                top: 0;
                                right: 0;
                                border-top: 1px solid white;
                                border-right: 1px solid white;
                            }
                            .squares:nth-of-type(3) {
                                bottom: 0;
                                left: 0;
                                border-bottom: 1px solid white;
                                border-left: 1px solid white;
                            }
                            .squares:nth-of-type(4) {
                                bottom: 0;
                                right: 0;
                                border-bottom: 1px solid white;
                                border-right: 1px solid white;
                            }
                        }
                    }
                    &:hover {
                        opacity: .8;
                    }
                    // img {
                    //     width: 2.5rem;
                    //     height: 2.5rem;
                    //     // width: 100%;
                    //     // height: 100%;
                    // }
                }
                &.full-screen {
                    transition: .5s;
                    // opacity: 0;
                    // visibility: hidden;
                }
            }
        }
        .info {
            margin-top: 30vw;
            .row {
                display: flex;
            }
            .text {
                margin-top: 2.5rem;
                flex-direction: column;
                .top {
                    align-items: center;
                    margin-bottom: 1rem;
                    .vote {
                        font-size: 1rem;
                        font-weight: 500;
                        margin-right: .4rem;
                        p {
                            color: rgb(70,211,105);
                        }
                    }
                }
                .overview {
                    line-height: 1.5rem;
                    font-size: 1.2rem;
                }
                .right {
                    margin-top: 1rem;
                    font-weight: 300;
                    font-style: italic;
                    .list-title {
                        font-style: normal;
                        font-weight: 400;
                        color: grey;
                    }
                    &>* {
                        margin-bottom: 1rem;
                    }
                }
            }
        }
    }
    @media screen and (min-width: 768px) {
        min-height: 56vw;
        background-color: rgba(0,0,0,0.7);
        .card {
            margin: 2.5rem auto;
            padding: 2rem;
            width: 768px;
            // min-height: 90vh;
            border-radius: .5rem;
            .close-icon {
                cursor: pointer;
            }
            .preview {
                img {
                    border-radius: .5rem .5rem 0 0;
                }
                .video-controls {
                    .btn {
                        cursor: pointer;
                    }
                }
            }
        }
        .info {
            margin-top: 250px !important;
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