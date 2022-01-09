<template>
    <div class="cards">
        <div v-if="data.bigScreen && data.device != 'touch'" class="chevron next" @click="next()">
            <img src="../../assets/img/chevron.png" alt="">
        </div>
        <div v-if="data.bigScreen && data.device != 'touch'" class="chevron prev" @click="prev()">
            <img src="../../assets/img/chevron.png" alt="">
        </div>
        <div class="top10" v-if="limit && contents.length == 20" ref="cards" :style="{overflowX: data.device == 'touch' ? 'scroll' : 'hidden'}">
            <Card10 v-for="(content, index) in contents.slice(0, limit)" :key="content.id" :content="content" :number="index + 1"/>
        </div>
        <div class="all" v-else-if="contents.length == 20" ref="cards" :style="{overflowX: data.device == 'touch' ? 'scroll' : 'hidden'}">
            <Card v-for="content in contents" :key="content.id" :content="content"/>
        </div>
    </div>
</template>

<script>
import Card10 from './Card10.vue'
import Card from './Card.vue'
import data from '../../share/data.js'
export default {
    name: "Cards",
    components: {
        Card10,
        Card
    },
    props: {
        contents: Array,
        limit: Number
    },
    data() {
        return {
            data
        }
    },
    methods: {
        next() {
            this.$refs.cards.scrollLeft += 300;
        },
        prev() {
            this.$refs.cards.scrollLeft -= 300;
        }
    },
    watch: {
        '$data.data.selected'() {
            this.$refs.cards.scrollLeft = 0;
        }
    }
}
</script>

<style lang="scss" scoped>
.cards {
    position: relative;
    .top10, .all {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow-y: hidden;
        scroll-behavior: smooth;
        padding: 0 .5rem;
    }
    .chevron {
        display: flex;
        position: absolute;
        top: 50%;
        height: 100%;
        width: 40px;
        align-items: center;
        justify-content: center;
        z-index: 3;
        border-radius: 5px 0 0 5px;
        background-color: rgba(20,20,20,0.8);
        &.next {
            right: 0;
            transform: translateY(-50%);
        }
        &.prev {
            left: 0;
            transform: rotate(180deg) translateY(50%);
        }
        img {
            width: 20px;
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
    @media screen and (min-width: 768px) {
        .chevron {
            cursor: pointer;
            opacity: 0;
            transition: opacity .3s;

        }
        &:hover {
            .chevron {
                opacity: 1;
            }
        }
        .top10, .all {
            padding: 0 40px;
        }
    }
}
</style>