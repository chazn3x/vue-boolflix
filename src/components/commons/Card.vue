<template>
    <div class="card" @mouseover="hovered()" @mouseleave="closeInfo()" ref="card">
        <div class="content" @click="openInfo()" :title="content.title || content.name">
            <div class="boolflix-logo">
                <img src="../../assets/img/logo-b.png" alt="Boolflix small logo">
            </div>
            <div class="poster">
                <img class="content-poster" v-if="(data.bigScreen ? backdrop : poster)" :src="'https://image.tmdb.org/t/p/w780/' + (data.bigScreen ? backdrop : poster)" :alt="(content.title || content.name) + (data.bigScreen ? ' backdrop' : ' poster')">
                <img class="null-poster" v-else-if="(content.logo)" :src="'https://image.tmdb.org/t/p/w300/' + content.logo" :alt="content.title || content.name + ' logo'">
                <img class="null-poster" v-else src="../../assets/img/logo.png" alt="Boolflix extended logo">
            </div>
            <div v-if="top" class="top">
                <div class="square">
                    <span class="text">TOP</span>
                    <span class="number">10</span>
                </div>
                <div class="triangle"></div>
            </div>
            <div v-if="searched && data.bigScreen && backdrop && content.logo" class="logo">
                <img :src="'https://image.tmdb.org/t/p/w300/' + content.logo" :alt="content.title || content.name + ' logo'">
            </div>
        </div>
        <CardHovered v-if="data.bigScreen && data.device != 'touch'" :content="content" :showInfo="showInfo" :x="x" :y="y"/>
    </div>
</template>

<script>
import data from '../../share/data.js'
import CardHovered from './CardHovered.vue'
export default {
    name: 'Card',
    components: {
        CardHovered
    },
    props: {
        content: Object,
        searched: Boolean
    },
    data() {
        return {
            data,
            top: false,
            poster: null,
            backdrop: null,
            showInfo: false,
            x: null,
            y: null
        }
    },
    methods: {
        openInfo() {
            data.contentInfo.open = true;
            data.contentInfo.content = this.content;
        },
        hovered() {
            if (!data.cardInfo.open && data.bigScreen && data.device != 'touch') {
                data.cardInfo.open = true;
                const position = this.$refs.card.getBoundingClientRect();
                if (position.x >= 230 && position.x < window.innerWidth - 450) {
                    this.x = position.x + (position.width / 2);
                } else if (position.x < 230) {
                    this.x = 250;
                } else if (position.x >= window.innerWidth - 450) {
                    this.x = window.innerWidth - 250;
                }
                this.y = position.y + (position.height / 2);
                data.cardInfo.timeout = setTimeout(() => {
                    this.showInfo = true;
                }, 500);
            }
        },
        closeInfo() {
            if (data.bigScreen && data.device != 'touch') {
                clearTimeout(data.cardInfo.timeout);
                data.cardInfo.open = false;
                this.showInfo = false;
            }
        }
    },
    mounted() {
        data.top10.forEach(content => {
            if (this.content.id == content.id) {
                this.top = true;
            }
        });
        if (!this.searched) {
            if (this.content.images.backdrops.length > 0) {
                const n = this.content.images.backdrops.length;
                const index = Math.floor(Math.random() * n);
                this.backdrop = this.content.images.backdrops[index].file_path;
            } else this.backdrop = this.content.backdrop_path;
            if (this.content.images.posters.length > 0) {
                const n = this.content.images.posters.length;
                const index = Math.floor(Math.random() * n);
                this.poster = this.content.images.posters[index].file_path;
            } else this.poster = this.content.poster_path;
        } else {
            this.poster = this.content.poster_path;
            this.backdrop = this.content.backdrop_path;
        }
    },
    watch: {
        '$data.data.contentInfo.open'(open) {
            if (open && data.bigScreen) {
                this.closeInfo();
            }
        },
        '$data.data.cardInfo.open'(open) {
            if (!open && data.bigScreen) {
                this.closeInfo();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    width: 120px;
    height: calc(120px * 1.4);
    flex-shrink: 0;
    padding: .3rem;
    .content {
        width: 100%;
        height: 100%;
        background-color: rgb(30,30,30);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        .boolflix-logo {
            position: absolute;
            top: .5rem;
            left: .5rem;
            height: 24px;
            img {
                height: 100%;
            }
        }
        .poster {
            width: 100%;
            height: 100%;
            background-color: rgb(15,15,15);
            img.content-poster {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            img.null-poster {
                width: 70%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .top {
            position: absolute;
            top: 0;
            right: 0;
            width: 1.7rem;
            height: 2.5rem;
            color: white;
            font-weight: 900;
            .square {
                width: 100%;
                height: 80%;
                background-color: rgb(230,30,20);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .text {
                    font-size: .6rem;
                    line-height: .6rem;
                }
                .number {
                    font-size: .9rem;
                    line-height: .9rem;
                }
            }
            .triangle {
                width: 110%;
                height: 20%;
                background-color: rgb(230,30,20);
                transform: rotate(15deg);
                transform-origin: bottom right;
            }
        }
        .logo {
            position: absolute;
            left: 0.5rem;
            bottom: 0.5rem;
            max-width: 60%;
            img {
                width: 100%;
                max-height: 100px;
            }
        }
    }
}
@media screen and (min-width: 768px) {
    .card {
        width: 290px;
        height: calc(290px * 0.56);
        .content {
            cursor: pointer;
        }
    }
}
</style>