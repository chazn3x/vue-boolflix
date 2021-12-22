<template>
    <div class="cards" v-if="limit != 10">
        <Card v-for="content in contents" :key="content.id" :content="content"/>
    </div>
    <div class="cards ten" v-else ref="carousel">
        <div class="chevron prev" @click="prev()">
            <img src="../../assets/img/chevron.png" alt="">
        </div>
        <Card10 v-for="(content, index) in contents.slice(0, 10)" :key="index" :content="content" :number="index + 1"/>
        <div class="chevron next" @click="next()">
            <img src="../../assets/img/chevron.png" alt="">
        </div>
    </div>
</template>

<script>
import Card from './Card.vue'
import Card10 from './Card10.vue'
export default {
    name: "Cards",
    components: {
        Card,
        Card10
    },
    props: {
        contents: Array,
        limit: Number
    },
    methods: {
        next() {
            this.$refs.carousel.scrollLeft += 280;
        },
        prev() {
            this.$refs.carousel.scrollLeft -= 280;
        }
    },
}
</script>
<style lang="scss" scoped>
.ten {
    .chevron {
        opacity: 0;
        transition: opacity .3s;
        display: flex;
        position: absolute;
        height: 135px;
        width: 50px;
        align-items: center;
        justify-content: center;
        z-index: 3;
        border-radius: 4px;
        cursor: pointer;background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(20,20,20,1) 90%);
        &.next {
            right: 0;
        }
        &.prev {
            left: 0;
            transform: rotate(180deg);
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
</style>