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
                    <button class="trailer" title="Trailer" @click="trailer()" v-if="content.key != 'abc'">
                        <a :href="'https://www.youtube.com/watch?v=' + content.key" target="_blank">
                            <i class="fas fa-play"></i>
                            <span>Trailer</span>
                        </a>
                    </button>
                    <div class="btn save" :class="{'remove' : data.savedIds.includes(content.id)}" @click="save()">
                        <span></span>
                        <span></span>
                        <div class="btn__title">
                            <div class="btn__text">
                                {{(data.savedIds.includes(content.id) ? 'Rimuovi da' : 'Aggiungi a')}} La mia lista
                            </div>
                            <div class="btn__square"></div>
                        </div>
                    </div>
                    <div class="btn volume" :class="{'unmute' : !isMuted}" @click="volume()" title="Volume" v-show="content.key != 'abc'">
                        <img src="../../assets/img/buttons/volume.png" alt="">
                        <span></span>
                    </div>
                </div>
                <div class="text row">
                    <div class="left">
                        <div class="row top">
                            <div class="vote" v-if="content.vote_average" :class="{'green' : content.vote_average >= 6, 'yellow' : content.vote_average >= 4 && content.vote_average < 6, 'red' : content.vote_average < 4}">
                                <p>{{Math.floor(content.vote_average * 10)}}% di voti positivi</p>
                            </div>
                            <div v-if="content.year" class="year">
                                <span>{{content.year}}</span>
                            </div>
                            <div v-if="content.duration" class="duration">
                                <span>{{content.duration}}</span>
                            </div>
                        </div>
                        <div class="rank row" v-if="top">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon svg-icon-top-10-badge" style="color: rgb(229, 9, 20);"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3ZM17.2299 10.8934C16.6125 10.4971 15.8913 10.2996 15.0673 10.2996C14.2444 10.2996 13.5231 10.4971 12.9056 10.8934C12.2881 11.2905 11.8114 11.8536 11.4762 12.5839C11.1411 13.3149 10.9735 14.1695 10.9735 15.1493C10.9735 16.1383 11.1411 16.9957 11.4762 17.7221C11.8114 18.4478 12.2881 19.0091 12.9056 19.4052C13.5231 19.8014 14.2444 20 15.0673 20C15.8913 20 16.6125 19.8014 17.2299 19.4052C17.8475 19.0091 18.3242 18.4478 18.6594 17.7221C18.9945 16.9957 19.1612 16.1383 19.1612 15.1493C19.1612 14.1695 18.9945 13.3149 18.6594 12.5839C18.3242 11.8536 17.8475 11.2905 17.2299 10.8934ZM9.47922 19.7994V10.3263L4.92658 11.4351V13.2656L7.20991 12.6774V19.7994H9.47922ZM13.7606 12.9513C14.0767 12.4298 14.5117 12.1701 15.0673 12.1701C15.6239 12.1701 16.0589 12.4298 16.3751 12.9513C16.6913 13.4718 16.8489 14.2058 16.8489 15.1493C16.8489 16.0938 16.6913 16.8268 16.3751 17.3473C16.0589 17.8688 15.6239 18.1296 15.0673 18.1296C14.5117 18.1296 14.0767 17.8688 13.7606 17.3473C13.4442 16.8268 13.2868 16.0938 13.2868 15.1493C13.2868 14.2058 13.4442 13.4718 13.7606 12.9513ZM13.0737 4.19939C12.7285 4.06677 12.3485 4 11.9344 4C11.5194 4 11.1405 4.06677 10.7952 4.19939C10.4521 4.33122 10.1518 4.51771 9.89848 4.75622C9.64404 4.99367 9.44963 5.27379 9.312 5.59396C9.17437 5.91504 9.10556 6.26299 9.10556 6.63872C9.10556 7.01446 9.17437 7.36241 9.312 7.68349C9.44963 8.00352 9.64404 8.28286 9.89848 8.52136C10.1518 8.75974 10.4521 8.9453 10.7952 9.07792C11.1405 9.20976 11.5194 9.27745 11.9344 9.27745C12.3485 9.27745 12.7285 9.20976 13.0737 9.07792C13.4168 8.9453 13.7161 8.75974 13.9704 8.52136C14.2239 8.28286 14.4194 8.00352 14.557 7.68349C14.6947 7.36241 14.7635 7.01446 14.7635 6.63872C14.7635 6.26299 14.6947 5.91504 14.557 5.59396C14.4194 5.27379 14.2239 4.99367 13.9704 4.75622C13.7161 4.51771 13.4168 4.33122 13.0737 4.19939ZM8.75526 5.30869V4.12288H4V5.30869H5.63894V9.15457H7.11632V5.30869H8.75526ZM18.9904 4.3469C18.6683 4.19847 18.2893 4.12327 17.8484 4.12327H15.5101V9.15392H16.9855V7.70838H17.8484C18.2893 7.70838 18.6683 7.63318 18.9904 7.48384C19.3117 7.33541 19.5601 7.12483 19.7366 6.85484C19.9132 6.58578 20 6.26931 20 5.90845C20 5.55682 19.9132 5.24587 19.7366 4.97602C19.5601 4.70683 19.3117 4.49624 18.9904 4.3469ZM11.2392 5.39166C11.4387 5.27379 11.6701 5.21545 11.9344 5.21545C12.1988 5.21545 12.4302 5.27379 12.6297 5.39166C12.8292 5.50954 12.9849 5.67653 13.0955 5.89001C13.2072 6.10521 13.2632 6.35386 13.2632 6.63872C13.2632 6.92267 13.2072 7.17224 13.0955 7.38651C12.9849 7.60092 12.8292 7.76791 12.6297 7.88565C12.4302 8.00352 12.1988 8.062 11.9344 8.062C11.6701 8.062 11.4387 8.00352 11.2392 7.88565C11.0397 7.76791 10.8841 7.60092 10.7724 7.38651C10.6617 7.17224 10.6057 6.92267 10.6057 6.63872C10.6057 6.35386 10.6617 6.10521 10.7724 5.89001C10.8841 5.67653 11.0397 5.50954 11.2392 5.39166ZM16.9855 5.27195H17.6149C17.9252 5.27195 18.1515 5.32845 18.2913 5.43895C18.4309 5.54931 18.5017 5.70616 18.5017 5.90845C18.5017 6.11535 18.4309 6.27589 18.2913 6.38902C18.1515 6.50228 17.9252 6.55878 17.6149 6.55878H16.9855V5.27195Z" fill="currentColor"></path></svg>
                            <p>Oggi al n° {{top}} fra {{data.selected == data.pages[0] ? 'i' : data.selected == data.pages[1] ? 'le serie' : 'i film'}} più popolari</p>
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
        trailer() {
            this.player.stopVideo();
            this.YTWrapper.style.opacity = '0';
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
        },
        top() {
            let index;
            data.top10.forEach((id, i) => {
                data.contentInfo.content.id == id ? index = i + 1 : '';
            });
            return index;
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
    overflow: auto;
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
            margin-top: 15vw;
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
                    max-width: 60%;
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
                        font-weight: 500;
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
                margin-top: 3rem;
                margin-bottom: 2rem;
                flex-direction: column;
                .top {
                    align-items: center;
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
                .rank {
                    margin: .9rem 0;
                    align-items: center;
                    svg {
                        margin-right: .5rem;
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
                    margin-bottom: 0;
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
            margin-top: 150px !important;
            .content-title h2 {
                font-size: 3.5rem;
            }
            .text {
                margin-top: 80px !important;
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