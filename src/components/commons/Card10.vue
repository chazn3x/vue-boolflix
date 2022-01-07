<template>
    <div class="card" ref="card" @mouseleave="closeInfo()">
        <div class="number" :class="{'ten': number == 10}">
            {{number}}
        </div>
        <div class="content" @click="openInfo()" :title="content.title || content.name" @mouseover="hovered()">
            <div class="boolflix-logo">
                <img src="../../assets/img/logo-b.png" alt="Boolflix small logo">
            </div>
            <div class="poster">
                <img :src="'https://image.tmdb.org/t/p/w780/' + poster" :alt="(content.title || content.name) + ' poster'">
            </div>
        </div>
        <CardHovered v-if="data.bigScreen && data.device != 'touch'" :content="content" :showInfo="showInfo" :x="x" :y="y"/>
    </div>
</template>

<script>
import data from '../../share/data.js'
import CardHovered from './CardHovered.vue'
export default {
    name: 'Card10',
    components: {
        CardHovered
    },
    props: {
        content: Object,
        number: Number
    },
    data() {
        return {
            data,
            poster: null,
            showInfo: false,
            x: null,
            y: null,
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
                    this.$refs.card.style.zIndex = 2;
                    this.showInfo = true;
                }, 500);
            }
        },
        closeInfo() {
            if (data.bigScreen && data.device != 'touch') {
                this.$refs.card.style.zIndex = 0;
                clearTimeout(data.cardInfo.timeout);
                data.cardInfo.open = false;
                this.showInfo = false;
            }
        }
    },
    mounted() {
        if (this.content.images.posters.length > 0) {
            let n = this.content.images.posters.length;
            let index = Math.floor(Math.random() * n);
            this.poster = this.content.images.posters[index].file_path;
        } else this.poster = this.content.poster_path;
        if (data.smallScreen) {
            this.$refs.card.style.zIndex = 10 - this.number;
        } else this.$refs.card.style.zIndex = 0;
    },
    watch: {
        '$data.data.contentInfo.open'(open) {
            if (open && data.bigScreen) {
                this.closeInfo();
            }
        },
        '$data.data.cardInfo.open'(open) {
            if (!open && this.showInfo) {
                this.closeInfo();
            }
        },
        '$data.data.smallScreen'(smallScreen) {
            if (smallScreen) {
                this.$refs.card.style.zIndex = 10 - this.number;
            } else this.$refs.card.style.zIndex = 0;
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    width: 150px;
    height: calc(150px * 1.1);
    flex-shrink: 0;
    position: relative;
    .number {
        color: rgb(13,13,13);
        position: absolute;
        z-index: 1;
        top: 100%;
        right: 100%;
        transform: translate(80%, -90%);
        font-size: 110px;
        line-height: 110px;
        font-weight: 900;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: rgb(200,200,200);
        &.ten {
            letter-spacing: -15px;
            font-size: 100px;
            left: 10;
        }
    }
    .content {
        width: 80%;
        height: 100%;
        position: absolute;
        background-color: rgb(30,30,30);
        top: 0;
        right: 0;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: .5rem 0 1.5rem .5rem rgb(20,20,20);
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
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
@media screen and (min-width: 768px) {
    .card {
        width: 290px;
        height: calc(290px * 0.71);
        padding: .3rem;
        .number {
            font-size: 260px;
            line-height: 260px;
            top: 50%;
            transform: translateY(-50%);
            right: .4em;
            z-index: 0;
            -webkit-text-stroke-width: 4px;
            -webkit-text-stroke-color: rgb(100,100,100);
            &.ten {
                letter-spacing: -35px;
                font-size: 230px;
                left: 0;
            }
        }
        .content {
            width: 50%;
            border-radius: 2px;
            box-shadow: none;
            cursor: pointer;
        }
    }
}
</style>