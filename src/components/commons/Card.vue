<template>
    <div class="card">
        <div class="poster">
            <img v-if="content.poster_path != null" :src="'https://image.tmdb.org/t/p/w342/' + content.poster_path" :alt="content.title != undefined ? content.title + ' poster' : content.name + ' poster'">
            <div v-else class="null-poster">
                <i class="fas fa-film"></i>
            </div>
        </div>
        <div class="title">
            <span><strong>Titolo: </strong></span>
            <h3 v-if="content.title != undefined">{{content.title}}</h3>
            <h3 v-else>{{content.name}}</h3>
        </div>
        <div class="title-orig">
            <span><strong>Titolo originale: </strong></span>
            <p v-if="content.original_title != undefined">{{content.original_title}}</p>
            <p v-else>{{content.original_name}}</p>
        </div>
        <div class="lang">
            <span><strong>Lingua originale: </strong></span>
            <img v-if="content.langImg != null" :src="content.langImg" :alt="content.title != undefined ? content.title + ' language icon' : content.name + ' language icon'">
            <p v-else class="null-lang">
                {{content.original_language}}
            </p>
        </div>
        <div class="vote">
            <span><strong>Voto: </strong></span>
            <span v-if="content.vote_average != 0" class="stars">
                <span class="star" v-for="(icon, index) in 5" :key="index">
                    <i v-if="index < content.vote" class="fas fa-star"></i>
                    <i v-else class="far fa-star"></i>
                </span>
            </span>
            <p v-else>-</p>
        </div>
    </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
export default {
    name: "Card",
    props: {
        content: Object
    }
}
</script>

<style lang="scss" scoped>
.card {
    color: white;
    .poster {
        width: 100%;
        aspect-ratio: 2 / 3;
        overflow: hidden;
        img {
            height: 100%;
            object-fit: contain;
        }
        .null-poster {
            width: 100%;
            height: 100%;
            background-color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            svg {
                font-size: 4rem;
            }
        }
    }
    h3, p {
        display: inline;
    }
    .lang {
        img, .null-lang {
            height: 1rem;
            display: inline-block !important;
        }
        .null-lang {
            width: 1rem;
            height: 1rem;
            background-color: #555;
            font-size: .6rem;
            line-height: 1rem;
            text-align: center;
            border-radius: 50%;
        }
    }
}
</style>