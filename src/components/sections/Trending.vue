<template>
    <section>
        <div class="section-title">
            <img src="../../assets/img/logo-b.png" alt="Boolflix single letter logo new and popular">
            <h2>Nuovi e popolari</h2>
        </div>
        <div class="cards">
            <Card v-for="(content, index) in data.trending" :key="index" :content="content"/>
        </div>
        <div class="no-content" v-if="data.trending.length == 0">Non ci sono contenuti che soddisfano i criteri di ricerca.</div>
    </section>
</template>

<script>
import axios from 'axios'
import data from '../../share/data.js'
import Card from '../commons/Card.vue'
export default {
    name: "Trending",
    components: {
        Card
    },
    data() {
        return {
            data
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
            axios.get('https://api.themoviedb.org/3/trending/all/week', apiParams)
            .then(response => {
                data.trending = response.data.results;
                this.commons(data.trending);
            });
        },
        commons(contents) {
            contents.forEach(content => {
                try {
                    content.langImg = require('../../assets/img/flags/' + content.original_language + '.png');
                }
                catch(err) {
                    content.langImg = null;
                }
                content.vote = Math.floor(content.vote_average / 2);
                content.saved = false;
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
</style>