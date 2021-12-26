<template>
    <section>
        <SectionTitle v-if="data.selected == data.pages[1] && data.search == ''" :title="'Le 10 serie TV più viste oggi'"/>
        <Cards v-if="data.selected == data.pages[1] && data.search == ''" :contents="data.trending.seriesDay" :limit="10"/>
        <SectionTitle :title="title"/>
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
        <Cards :contents="contents"/>
    </section>
</template>

<script>
import data from '../../share/data.js'
import Cards from '../commons/Cards.vue'
import SectionTitle from '../commons/SectionTitle.vue'
export default {
    name: "Series",
    components: {
        Cards,
        SectionTitle
    },
    data() {
        return {
            data,
        }
    },
    computed: {
        contents() {
            let array;
            if (data.search != '') {
                array = data.series;
            } else array = data.trending.seriesWeek;
            return array;
        },
        title() {
            let string;
            if (data.selected == data.pages[0] && data.search == '') {
                string = 'Le serie del momento';
            } else if (data.search != '') {
                string = 'Risultati di ricerca | Serie TV'
            } else string = 'Le migliori serie TV della settimana';
            return string;
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include noContent;
@include cards;
</style>