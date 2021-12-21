<template>
    <section>
        <div class="section-title" @click="data.selected='Nuovi e popolari'">
            <img src="../../assets/img/logo-b.png" alt="Boolflix single letter logo new and popular">
            <h2>Nuovi e popolari</h2>
        </div>
        <div class="cards">
            <Card v-for="content in data.trending" :key="content.id" :content="content"/>
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
                data.myFunc.commons(data.trending, 'all');
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