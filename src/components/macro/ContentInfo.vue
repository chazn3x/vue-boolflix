<template>
    <div class="content-info" ref="content" :class="{'active' : data.contentInfo.open}" @click="closeInfo()" v-if="data.contentInfo.content">
        <div class="card" @click.stop>
            <div class="close-icon" @click="closeInfo()">
                <div class="icon">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="preview" ref="preview" :style="{height: previewHeight}">
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
                    @paused="paused()"
                    ref="youtube"
                    ></youtube>
                </div>
                <div class="layover" ref="layover"></div>
                <div class="video-controls" v-if="content.key != 'abc'" :class="{'full-screen' : isFullScreen}" ref="controls">
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
                <div class="text row">
                    <div class="left">
                        <div class="row top">
                            <div class="vote" v-if="content.vote_average">
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
            isPlaying: false,
            isStopped: true,
            isMuted: true,
            isFullScreen: false,
            timeout: null,
        }
    },
    methods: {
        closeInfo() {
            document.body.style.overflow = 'auto';
            data.contentInfo.open = false
            this.isPlaying = false;
        },
        error() {
            this.YTWrapper.style.opacity = '0';
        },
        playing() {
            this.isPlaying = true;
            this.isStopped = false;
            setTimeout(() => {
                this.YTWrapper.style.opacity = '1';
            }, 500);
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
                // this.YTWrapper.style.opacity = '1';
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
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                if (this.$refs.preview.requestFullscreen) {
                    this.$refs.preview.requestFullscreen();
                } else if (this.$refs.preview.webkitRequestFullscreen) {
                    this.$refs.preview.webkitRequestFullscreen();
                } else if (this.$refs.preview.msRequestFullscreen) {
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
                if (data.device == 'touch') {
                    screen.orientation.lock("landscape");
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                if (data.device == 'touch') {
                    screen.orientation.lock("portrait");
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
        },
        previewHeight() {
            let height;
            if (data.bigScreen) height = 768 * 0.56 + 'px';
            else height = data.screen * 0.56 + 'px';
            return height;
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
        min-height: 100vh;
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
            .video-controls {
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                margin: 1rem;
                .btn {
                    width: 2.4rem;
                    height: 2.4rem;
                    border-radius: 50%;
                    margin-right: .6rem;
                    background-color: rgba(0,0,0,0.4);
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
                }
                &.full-screen {
                    transition: .5s;
                }
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
            .text {
                margin-top: 1.5rem;
                margin-bottom: 2rem;
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
                        font-weight: 500;
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
                        font-weight: 500;
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