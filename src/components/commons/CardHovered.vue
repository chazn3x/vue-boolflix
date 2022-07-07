<template>
    <div class="card-hovered" :class="{'show': showInfo}" :style="{'top' : y + 'px', 'left' : x + 'px'}">
        <div class="preview" @click="openInfo()">
            <div class="backdrop">
                <img :src="'https://image.tmdb.org/t/p/original/' + content.backdrop_path" alt="">
            </div>
            <div class="logo transition" v-if="content.logo">
                <img :src="'https://image.tmdb.org/t/p/w300/' + content.logo" alt="">
            </div>
        </div>
        <div class="info transition">
            <div class="top-row">
                <div class="content-title" @click="openInfo()">
                    <h4>{{content.title || content.name}}</h4>
                </div>
                <div class="btn" @click="openInfo()">
                    <i class="fas fa-chevron-down"></i>
                    <div class="btn__title">
                        <div class="btn__text">
                            Altre info
                        </div>
                        <div class="btn__square"></div>
                    </div>
                </div>
            </div>
            <div class="middle-row">
                <div v-if="content.vote_average" class="vote" :class="{'green' : content.vote_average >= 6, 'yellow' : content.vote_average >= 4 && content.vote_average < 6, 'red' : content.vote_average < 4}">
                    <p>{{Math.floor(content.vote_average * 10)}}% di voti positivi</p>
                </div>
                <div v-if="content.year" class="year">
                    <span>{{content.year}}</span>
                </div>
                <div v-if="content.duration" class="duration">
                    <span>{{content.duration}}</span>
                </div>
            </div>
            <div class="bottom-row">
                <div v-if="content.smallGenres" class="genres">
                    <p>{{content.smallGenres}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
export default {
    name: 'CardHovered',
    props: {
        content: Object,
        showInfo: Boolean,
        y: Number,
        x: Number
    },
    data() {
        return {
            data
        }
    },
    methods: {
        openInfo() {
            data.contentInfo.open = true;
            data.contentInfo.content = this.content;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include btn;
.card-hovered {
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    background-color: rgb(20,20,20);
    box-shadow: 0 0 1rem rgba(0,0,0,0.8);
    width: 0;
    height: 0;
    border-radius: 7px;
    z-index: 10;
    opacity: 0;
    transition: width .2s, height .2s, opacity .4s;
    overflow: hidden;
    .preview {
        width: 100%;
        height: calc(400px * 0.56);
        position: relative;
        cursor: pointer;
        border-radius: 7px 7px 0 0;
        overflow: hidden;
        .backdrop img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .logo {
            position: absolute;
            left: 1rem;
            bottom: 1rem;
            img {
                max-width: 70%;
                max-height: 100px;
            }
        }
    }
    .info {
        padding: 1rem;
        color: rgba(255,255,255,0.9);
        .top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .content-title h4 {
                cursor: pointer;
                font-size: 1.4rem;
                font-weight: 400;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
        .middle-row {
            display: flex;
            align-items: center;
            margin: .5rem 0 .4rem;
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
        .bottom-row {
            .genres p {
                font-size: .9rem;
                font-weight: 400;
                color: rgba(200,200,200,1);
            }
        }
    }
    .transition {
        opacity: 0;
        transition: opacity .5s;
        transition-delay: .3s;
    }
    &.show {
        width: 400px;
        height: 350px;
        opacity: 1;
        overflow: unset;
        .transition {
            opacity: 1;
        }
    }
}
</style>