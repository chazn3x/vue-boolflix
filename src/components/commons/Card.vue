<template>
    <div class="card">
        <div class="content" @click="openInfo(content)" :title="content.title || content.name">
            <div class="boolflix-logo">
                <img src="../../assets/img/logo-b.png" alt="Boolflix small logo">
            </div>
            <div class="poster">
                <img :src="'https://image.tmdb.org/t/p/w780/' + content.backdrop_path" :alt="(content.title || content.name) + ' backdrop'">
            </div>
            <div class="content-logo">
                <img :src="'https://image.tmdb.org/t/p/original/' + content.logo" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
export default {
    name: 'Card',
    props: {
        content: Object
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
    aspect-ratio: 16 / 9;
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
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .content-logo {
            position: absolute;
            // top: 50%;
            left: 50%;
            transform: translateX(-50%);
            bottom: .5rem;
            max-width: 90%;
            height: 100px;
            display: flex;
            align-items: flex-end;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
}
@media screen and (min-width: 768px) {
    .card {
        width: 290px;
        cursor: pointer;
        // .content {
        // }
    }
}
</style>