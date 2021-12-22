<template>
    <div>
        <section>
            <SectionTitle v-if="data.selected == data.pages[2] && data.search == ''" :title="'I 10 film più visti oggi'"/>
            <Cards v-if="data.selected == data.pages[2] && data.search == ''" :contents="data.trendingMoviesToday" :limit="10"/>
        </section>
        <section>
            <SectionTitle :title="title"/>
            <div class="loader" v-if="data.loader">
                <div class="cards">
                    <div class="empty-card" v-for="(card, index) in 20" :key="index">
                        <img src="../../assets/img/logo-b.png" alt="Boolflix single letter loading">
                    </div>
                </div>
            </div>
            <div class="no-content" v-else-if="data.search != '' && data.movies.length == 0">
                Non ci sono film che soddisfano i criteri di ricerca.
            </div>
            <Cards :contents="contents"/>
        </section>
    </div>
</template>

<script>
import data from '../../share/data.js'
import Cards from '../commons/Cards.vue'
import SectionTitle from '../commons/SectionTitle.vue'
import axios from 'axios'
export default {
    name: "Movies",
    components: {
        Cards,
        SectionTitle
    },
    data() {
        return {
            data
        }
    },
    methods: {
        trending() {
            axios.get(data.apiUrl + '/trending/movie/week', data.commonsApi)
            .then(response => {
                data.trendingMovies = response.data.results;
                data.myFunc.commons(data.trendingMovies, 'movie');
            });
            axios.get(data.apiUrl + '/trending/movie/day', data.commonsApi)
            .then(response => {
                data.trendingMoviesToday = response.data.results;
                data.myFunc.commons(data.trendingMoviesToday, 'movie');
            });
        }
    },
    created() {
        this.trending();
    },
    computed: {
        contents() {
            let array;
            if (data.search != '') {
                array = data.movies;
            } else array = data.trendingMovies;
            return array;
        },
        title() {
            let string;
            if (data.selected == data.pages[0] && data.search == '') {
                string = 'I film del momento';
            } else if (data.search != '') {
                string = 'Risultati di ricerca | Film'
            } else string = 'I migliori film della settimana';
            return string;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include noContent;
@include cards;
</style>