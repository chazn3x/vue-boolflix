<template>
    <div class="card">
        <div class="number" :class="{'ten': number == 10}">
            {{number}}
        </div>
        <div class="content" @click="openInfo(content)" :title="content.title || content.name">
            <div class="boolflix-logo">
                <img src="../../assets/img/logo-b.png" alt="Boolflix small logo">
            </div>
            <div class="poster">
                <img :src="'https://image.tmdb.org/t/p/w780/' + content.poster_path" :alt="(content.title || content.name) + ' poster'">
            </div>
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
export default {
    name: 'Card10',
    props: {
        content: Object,
        number: Number
    },
    data() {
        return {
            data
        }
    },
    methods: {
        openInfo(content) {
            data.contentInfo.open = true;
            data.contentInfo.content = content;
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    width: 230px;
    height: calc(230px * 0.71);
    flex-shrink: 0;
    position: relative;
    padding: .3rem;
    .number {
        color: rgb(13,13,13);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: .4em;
        font-size: 210px;
        line-height: 210px;
        font-weight: 900;
        -webkit-text-stroke-width: 4px;
        -webkit-text-stroke-color: rgb(100,100,100);
        &.ten {
            letter-spacing: -25px;
            font-size: 180px;
            left: 0;
        }
    }
    .content {
        width: 50%;
        height: 100%;
        position: absolute;
        background-color: rgb(30,30,30);
        top: 0;
        right: 0;
        z-index: 2;
        border-radius: 2px;
        overflow: hidden;
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
        .number {
            font-size: 260px;
            line-height: 260px;
            &.ten {
                letter-spacing: -35px;
                font-size: 230px;
            }
        }
        .content {
            cursor: pointer;
        }
    }
}
</style>