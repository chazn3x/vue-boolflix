<template>
    <section>
        <SectionTitle v-if="data.selected == data.pages[3] && data.search == ''" :title="'I migliori titoli di oggi'"/>
        <Cards v-if="data.selected == data.pages[3] && data.search == ''" :contents="data.trending.allDay"/>
        <SectionTitle :title="title"/>
        <Cards :contents="data.trending.allDay" :limit="data.selected == data.pages[0] ? 10 : 0"/>
    </section>
</template>

<script>
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
    computed: {
        title() {
            let string;
            if (data.selected == data.pages[0] && data.search == '') {
                string = 'I 10 migliori titoli della settimana';
            } else string = 'I migliori titoli della settimana';
            return string;
        }
    },
    created() {
        // console.log(data.trending.contents);
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include cards;
@include noContent;
</style>