<template>
    <div class="content-info" :class="{'active' : data.contentInfo.open}" @click="closeInfo()" v-if="data.contentInfo.content">
        <div class="card" @click.stop>
            <div class="close-icon" @click="closeInfo()">
                <div class="icon">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="preview">
                <img :src="'https://image.tmdb.org/t/p/original/' + content.backdrop_path" alt="">
                <div class="video" ref="youtubeWrapper">
                    <youtube
                    :video-id="data.contentInfo.key"
                    :player-vars="playerVars"
                    :nocookie="true"
                    :width="100 + '%'"
                    :height="100 + '%'"
                    @playing="playing()"
                    @ended="ended()"
                    @paused="paused()"
                    ref="youtube"
                    ></youtube>
                </div>
                <div class="layover"></div>
                <div class="video-controls">
                    <div class="btn play-pause" :class="isPlaying ? 'pause' : 'play'" @click="playPause()">
                        <div class="btn-container">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div v-if="isPlaying" class="btn stop" @click="stop()">
                        <div class="square"></div>
                    </div>
                    <div class="btn volume" :class="{'unmute' : !isMuted}" @click="volume()">
                        <img src="../../assets/img/buttons/volume.png" alt="">
                        <span></span>
                    </div>
                    <div v-if="isPlaying" class="btn full-screen" @click="fullScreen()">
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
                <div class="row">

                </div>
                <div class="vote">
                    <p>{{content.vote_average * 10}}% di voti positivi</p>
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
            isMuted: true
        }
    },
    methods: {
        closeInfo() {
            document.body.style.overflow = 'auto';
            data.contentInfo.open = false
            this.isPlaying = false;
            // this.$refs.youtube.player.stopVideo();
        },
        playing() {
            this.isPlaying = true;
            this.$refs.youtubeWrapper.style.opacity = '1';
            // this.$refs.youtube.player.stopVideo();
            // console.log(this.$refs.youtube);
            // this.iframe = this.$refs.youtube.player.getIframe().id;
            // console.log(this.iframe);
            // this.$refs.youtube.nocookie = true;
            
            // this.$refs.youtube.player.setSize({width : 300 + '%', height : 100 + '%'})
        },
        ended() {
            this.$refs.youtubeWrapper.style.opacity = '0';
            this.isPlaying = false;
            // this.$refs.youtube.player.destroy();
            // console.log("fine");
            // this.$refs.youtube.style.display = 'none';
        },
        paused() {
            this.isPlaying = false;
        },
        playPause() {
            if (this.isPlaying) {
                this.$refs.youtube.player.pauseVideo();
            } else {
                this.$refs.youtube.player.playVideo();
                this.$refs.youtubeWrapper.style.opacity = '1';
            }
        },
        stop() {
            this.$refs.youtubeWrapper.style.opacity = '0';
            this.$refs.youtube.player.stopVideo();
            this.isPlaying = false;
        },
        volume() {
            if (this.isMuted) {
                this.isMuted = false;
                this.$refs.youtube.player.unMute();
            } else {
                this.isMuted = true;
                this.$refs.youtube.player.mute();
            }
        },
        fullScreen() {
            this.$refs.youtubeWrapper.requestFullscreen();
            if (this.isMuted) {
                this.isMuted = false;
                this.$refs.youtube.player.unMute();
            }
            this.$refs.youtubeWrapper.style.opacity = '1';
        }
    },
    computed: {
        content() {
            return data.contentInfo.content;
        },
    },
    watch: {
        '$data.data.contentInfo.content'(val) {
            axios.get(data.apiUrl + `/${val.media_type}/${val.id}/videos`, data.commonsApi)
            .then(response => {
                data.contentInfo.key = response.data.results[0].key;
            })
        },
        '$data.data.contentInfo.open'(open) {
            if (this.$refs.youtube) {
                if (open) {
                    this.$refs.youtube.player.playVideo();
                } else {
                    this.$refs.youtube.player.stopVideo();
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content-info {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 15;
    transition: .3s;
    min-height: 100vh;
    width: 100%;
    overflow-y: scroll;
    visibility: hidden;
    opacity: 0;
    .card {
        color: grey;
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
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
                opacity: 0;
                transition: opacity .3s;
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
                    border: .5px solid rgba(255,255,255,0.5);
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
                    &.full-screen {
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
            }
        }
        .info {
            margin-top: 30vw;
            .row {
                display: flex;
                justify-content: space-between;
            }
            .vote {
                font-size: 1rem;
                font-weight: 500;
                p {
                    color: rgb(70,211,105);
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
            min-height: 90vh;
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