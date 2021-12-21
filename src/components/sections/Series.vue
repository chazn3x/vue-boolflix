<template>
    <section>
        <div class="section-title" @click="data.selected='Serie TV'">
            <img src="../../assets/img/logo-b.png" alt="Boolflix single letter logo tv shows">
            <h2>Serie TV</h2>
        </div>
        <div class="loader" v-if="data.loader">
            <div class="cards">
                <div class="empty-card" v-for="(card, index) in 20" :key="index">
                    <img src="../../assets/img/logo-b.png" alt="Boolflix single letter loading">
                </div>
            </div>
        </div>
        <div class="no-content" v-else-if="data.search != '' && data.series.length == 0">
            Non ci sono serie TV che soddisfano i criteri di ricerca.
        </div>
        <div class="cards" v-else-if="data.search != ''">
            <Card v-for="content in data.series" :key="content.id" :content="content"/>
        </div>
        <div class="cards" v-else>
            <Card v-for="content in data.trendingSeries" :key="content.id" :content="content"/>
        </div>
    </section>
</template>

<script>
import data from '../../share/data.js'
import Card from '../commons/Card.vue'
import axios from 'axios'
export default {
    name: "Series",
    components: {
        Card
    },
    data() {
        return {
            data,
        }
    },
    methods: {
        trending() {
            const apiParams = {
                params: {
                    api_key: '3390a8a14e621ee87b8e65a286d5c250',
                    language: 'it-IT'
                }
            }
            axios.get('https://api.themoviedb.org/3/trending/tv/week', apiParams)
            .then(response => {
                data.trendingSeries = response.data.results;
                data.myFunc.commons(data.trendingSeries, 'tv');
            });
        }
    },
    created() {
        this.trending();
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include sectionTitle;
@include noContent;
.cards {
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
</style>