<template>
    <div class="hero">
        <div class="carousel" ref="carousel" v-if="heroContents.length == 20">
            <div class="card" v-for="(content, index) in contents" :key="index">
                <div class="background-img">
                    <img :src="'https://image.tmdb.org/t/p/original/' + content.backdrop_path" alt="">
                    <div class="layover"></div>
                </div>
                <div class="info">
                    <div class="content-title" @click="openInfo(content)">
                        <h2>{{content.title || content.name}}</h2>
                    </div>
                    <div class="rank">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon svg-icon-top-10-badge" style="color: rgb(229, 9, 20);"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3ZM17.2299 10.8934C16.6125 10.4971 15.8913 10.2996 15.0673 10.2996C14.2444 10.2996 13.5231 10.4971 12.9056 10.8934C12.2881 11.2905 11.8114 11.8536 11.4762 12.5839C11.1411 13.3149 10.9735 14.1695 10.9735 15.1493C10.9735 16.1383 11.1411 16.9957 11.4762 17.7221C11.8114 18.4478 12.2881 19.0091 12.9056 19.4052C13.5231 19.8014 14.2444 20 15.0673 20C15.8913 20 16.6125 19.8014 17.2299 19.4052C17.8475 19.0091 18.3242 18.4478 18.6594 17.7221C18.9945 16.9957 19.1612 16.1383 19.1612 15.1493C19.1612 14.1695 18.9945 13.3149 18.6594 12.5839C18.3242 11.8536 17.8475 11.2905 17.2299 10.8934ZM9.47922 19.7994V10.3263L4.92658 11.4351V13.2656L7.20991 12.6774V19.7994H9.47922ZM13.7606 12.9513C14.0767 12.4298 14.5117 12.1701 15.0673 12.1701C15.6239 12.1701 16.0589 12.4298 16.3751 12.9513C16.6913 13.4718 16.8489 14.2058 16.8489 15.1493C16.8489 16.0938 16.6913 16.8268 16.3751 17.3473C16.0589 17.8688 15.6239 18.1296 15.0673 18.1296C14.5117 18.1296 14.0767 17.8688 13.7606 17.3473C13.4442 16.8268 13.2868 16.0938 13.2868 15.1493C13.2868 14.2058 13.4442 13.4718 13.7606 12.9513ZM13.0737 4.19939C12.7285 4.06677 12.3485 4 11.9344 4C11.5194 4 11.1405 4.06677 10.7952 4.19939C10.4521 4.33122 10.1518 4.51771 9.89848 4.75622C9.64404 4.99367 9.44963 5.27379 9.312 5.59396C9.17437 5.91504 9.10556 6.26299 9.10556 6.63872C9.10556 7.01446 9.17437 7.36241 9.312 7.68349C9.44963 8.00352 9.64404 8.28286 9.89848 8.52136C10.1518 8.75974 10.4521 8.9453 10.7952 9.07792C11.1405 9.20976 11.5194 9.27745 11.9344 9.27745C12.3485 9.27745 12.7285 9.20976 13.0737 9.07792C13.4168 8.9453 13.7161 8.75974 13.9704 8.52136C14.2239 8.28286 14.4194 8.00352 14.557 7.68349C14.6947 7.36241 14.7635 7.01446 14.7635 6.63872C14.7635 6.26299 14.6947 5.91504 14.557 5.59396C14.4194 5.27379 14.2239 4.99367 13.9704 4.75622C13.7161 4.51771 13.4168 4.33122 13.0737 4.19939ZM8.75526 5.30869V4.12288H4V5.30869H5.63894V9.15457H7.11632V5.30869H8.75526ZM18.9904 4.3469C18.6683 4.19847 18.2893 4.12327 17.8484 4.12327H15.5101V9.15392H16.9855V7.70838H17.8484C18.2893 7.70838 18.6683 7.63318 18.9904 7.48384C19.3117 7.33541 19.5601 7.12483 19.7366 6.85484C19.9132 6.58578 20 6.26931 20 5.90845C20 5.55682 19.9132 5.24587 19.7366 4.97602C19.5601 4.70683 19.3117 4.49624 18.9904 4.3469ZM11.2392 5.39166C11.4387 5.27379 11.6701 5.21545 11.9344 5.21545C12.1988 5.21545 12.4302 5.27379 12.6297 5.39166C12.8292 5.50954 12.9849 5.67653 13.0955 5.89001C13.2072 6.10521 13.2632 6.35386 13.2632 6.63872C13.2632 6.92267 13.2072 7.17224 13.0955 7.38651C12.9849 7.60092 12.8292 7.76791 12.6297 7.88565C12.4302 8.00352 12.1988 8.062 11.9344 8.062C11.6701 8.062 11.4387 8.00352 11.2392 7.88565C11.0397 7.76791 10.8841 7.60092 10.7724 7.38651C10.6617 7.17224 10.6057 6.92267 10.6057 6.63872C10.6057 6.35386 10.6617 6.10521 10.7724 5.89001C10.8841 5.67653 11.0397 5.50954 11.2392 5.39166ZM16.9855 5.27195H17.6149C17.9252 5.27195 18.1515 5.32845 18.2913 5.43895C18.4309 5.54931 18.5017 5.70616 18.5017 5.90845C18.5017 6.11535 18.4309 6.27589 18.2913 6.38902C18.1515 6.50228 17.9252 6.55878 17.6149 6.55878H16.9855V5.27195Z" fill="currentColor"></path></svg>
                        <p>Oggi al n° {{index + 1}} fra i più popolari</p>
                    </div>
                    <!-- <div class="vote">
                        <p>{{content.vote_average * 10}}% di voti positivi</p>
                    </div> -->
                    <div class="overview">
                        <p>{{content.overview}}</p>
                    </div>
                    <div class="info-btn" @mouseover="stopCarousel()" @mouseleave="startCarousel()" @click="openInfo(content)">
                        <div class="circle">
                            <span>i</span>
                        </div>
                        <span>Mostra info</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
// import axios from 'axios'
export default {
    name: 'Hero',
    data() {
        return {
            data,
            number: 0,
            interval: null
        }
    },
    props: {
        heroContents: Array
    },
    methods: {
        startCarousel() {
            if (!data.contentInfo.open) {
                this.interval = setInterval(() => {
                    this.$refs.carousel.style.transform = 'translate(-10%)';
                }, 8000);
            }
        },
        stopCarousel() {
            clearInterval(this.interval);
        },
        carousel() {
            this.startCarousel();
            this.$refs.carousel.addEventListener('transitionend', (e) => {
                if (e.target == this.$refs.carousel) {
                    this.$refs.carousel.appendChild(this.$refs.carousel.firstElementChild);
                    this.$refs.carousel.style.transition = 'none';
                    this.$refs.carousel.style.transform = 'translate(0)';
                    setTimeout(() => {
                        this.$refs.carousel.style.transition = 'all 2s';
                    });
                }
            });
        },
        openInfo(content) {
            data.contentInfo.open = true;
            data.contentInfo.content = content;
            if (data.contentInfo.open) {
                document.body.style.overflow = 'hidden';
            } else document.body.style.overflow = 'auto';
        }
    },
    mounted() {
        setTimeout(() => {
            this.carousel();
        }, 1000);
    },
    computed: {
        contents() {
            let array = this.heroContents.filter(content => {
                if (content.overview) {
                    return content;
                }
            });
            array.length = 10;
            return array;
        },
    },
    watch: {
        '$data.data.contentInfo.open'(val) {
            if (val) {
                this.stopCarousel();
            } else this.startCarousel();
        },
    }
}
</script>

<style lang="scss" scoped>
.hero {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 110vw;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    scroll-behavior: smooth;
    @media screen and (min-width: 768px) {
        min-height: 56vw;
        height: 100vh;
    }
    .carousel {
        width: 1000%;
        height: 100%;
        flex-shrink: 0;
        display: flex;
        justify-content: flex-start;
        transition: all 2s;
        .card {
            width: 100%;
            height: 100%;
            position: relative;
            .background-img {
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: -1;
                img {
                    position: absolute;
                    z-index: -1;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    opacity: .4;
                    @media screen and (min-width: 768px) {
                        opacity: 1;
                    }
                }
                .layover {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(rgba(0,0,0,0) 40%, rgba(20,20,20,1) 92%);
                    @media screen and (min-width: 768px) {
                        background: linear-gradient(rgba(0,0,0,0) 40%, rgba(20,20,20,1) 92%),
                            linear-gradient(to left, rgba(0,0,0,0) 40%, rgba(6,6,6,.9) 100%);
                    }
                }
            }
            .info {
                padding: 70px 1rem;
                .rank {
                    display: flex;
                    align-items: center;
                    font-size: 1.2rem;
                    margin: 1.5rem 0;
                    font-weight: 400;
                    svg {
                        transform: scale(1.5);
                        transform-origin: left;
                        margin-right: 1.4rem;
                    }
                }
                .vote {
                    font-size: 1.1rem;
                    font-weight: 500;
                    p {
                        color: rgb(70,211,105);
                    }
                }
                .overview {
                    margin-top: 1rem;
                    font-size: 1.1rem;
                    font-weight: 400;
                    line-height: 1.6rem;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
                .info-btn {
                    display: flex;
                    align-items: center;
                    background-color: rgba(109, 109, 110, 0.7);
                    width: max-content;
                    padding: 10px 15px;
                    border-radius: 4px;
                    color: #fff;
                    margin-top: 20px;
                    transition: background-color .2s;
                    .circle {
                        width: 1.3rem;
                        height: 1.3rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        border: 2px solid white;
                        font-size: .8rem;
                        margin-right: 15px;
                        font-weight: 500;
                    }
                    &:hover {
                        background-color: rgba(109, 109, 110, 0.4);
                    }
                }
                @media screen and (min-width: 768px) {
                    padding: 100px 50px;
                    max-width: 768px;
                    .content-title {
                        cursor: pointer;
                        width: max-content;
                        max-width: 700px;
                        h2 {
                            font-size: 3rem;
                        }
                    }
                    .rank {
                        font-size: 1.4rem;
                        svg {
                            transform: scale(1.7);
                        }
                    }
                    .info-btn {
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>