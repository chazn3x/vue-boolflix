<template>
    <section>
        <SectionTitle v-if="data.selected == data.pages[3] && data.search == ''" :title="'I migliori titoli di oggi'"/>
        <Cards v-if="data.selected == data.pages[3] && data.search == ''" :contents="data.trendingToday"/>
        <SectionTitle :title="title"/>
        <Cards :contents="data.trending" :limit="data.selected == data.pages[0] ? 10 : 0"/>
    </section>
</template>

<script>
import axios from 'axios'
import data from '../../share/data.js'
import Cards from '../commons/Cards.vue'
import SectionTitle from '../commons/SectionTitle.vue'
export default {
    name: "Trending",
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
            axios.get(data.apiUrl + '/trending/all/week', data.commonsApi)
            .then(response => {
                data.trending = response.data.results;
                data.myFunc.commons(data.trending, 'all');
            });
            axios.get(data.apiUrl + '/trending/all/day', data.commonsApi)
            .then(response => {
                data.trendingToday = response.data.results;
                data.myFunc.commons(data.trendingToday, 'all');
            });
        }
    },
    created() {
        this.trending();
    },
    computed: {
        title() {
            let string;
            if (data.selected == data.pages[0] && data.search == '') {
                string = 'I 10 migliori titoli del momento';
            } else string = 'I migliori titoli della settimana';
            return string;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include cards;
@include noContent;
</style>