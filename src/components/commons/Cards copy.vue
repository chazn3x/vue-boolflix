<template>
    <div class="cards portrait" v-if="!limit">
        <CardP v-for="content in contents" :key="content.id" :content="content"/>
    </div>
    <div class="wrapper" v-else>
        <div class="chevron next" @click="next()">
            <img src="../../assets/img/chevron.png" alt="">
        </div>
        <div class="chevron prev" @click="prev()">
            <img src="../../assets/img/chevron.png" alt="">
        </div>
        <div class="cards landscape" ref="carousel">
            <CardL v-for="(content, index) in contents.slice(0, limit)" :key="index" :content="content" :number="limit == 10 ? index + 1 : null"/>
        </div>
    </div>
</template>

<script>
import CardP from './CardP.vue'
import CardL from './CardL.vue'
export default {
    name: "Cards",
    components: {
        CardP,
        CardL
    },
    props: {
        contents: Array,
        limit: Number
    },
    methods: {
        next() {
            this.$refs.carousel.scrollLeft += this.$refs.carousel.scrollWidth / 5;
        },
        prev() {
            this.$refs.carousel.scrollLeft -= this.$refs.carousel.scrollWidth / 5;
        }
    },
}
</script>
<style lang="scss">
section>.wrapper {
    position: relative;
    // min-height: 200px;
    display: flex;
        .chevron {
            opacity: 0;
            transition: opacity .3s;
            display: flex;
            position: absolute;
            top: 50%;
            height: 120px;
            width: 50px;
            align-items: center;
            justify-content: center;
            z-index: 3;
            border-radius: 5px 0 0 5px;
            cursor: pointer;
            // background: linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(20,20,20,1) 90%);
            background-color: rgba(20,20,20,0.8);
            &.next {
                right: 0;
                transform: translateY(-50%);
            }
            &.prev {
                left: 0;
                transform: rotate(180deg) translateY(50%);
                // transform: translateY(-50%);
            }
            img {
                width: 30px;
                filter: invert(1);
                transition: .3s;
            }
            &:hover {
                img {
                    transform: scale(1.3);
                    -webkit-transform: scale(1.3);
                }
            }
        }
        &:hover {
            .chevron {
                opacity: 1;
            }
        }
}
.cards {
    &.portrait {
        padding-bottom: 30px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 250px);
        grid-gap: 30px;
        justify-content: center;
        .empty-card {
            width: 100%;
            aspect-ratio: 2 / 3;
            background-color: rgb(13,13,13);
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 35px;
                animation: loading 2s linear infinite;
                @keyframes loading {
                    0% {opacity: .7;}
                    50% {opacity: 0;}
                }
            }
        }
    }
    &.landscape {
        scroll-behavior: smooth;
        z-index: 1;
        align-items: center;
        justify-content: flex-start;
        overflow-y: hidden;
        overflow-x: scroll;
        display: flex;
        scrollbar-width: none;
        padding: 0 150px 0 50px;
        &::-webkit-scrollbar {
            display: none;
        }
        .wrapper {
            &:first-of-type {
                .card {
                    transform-origin: left;
                }
            }
            &:last-of-type {
                .card {
                    transform-origin: right;
                }
            }
        }
    }
}
</style>