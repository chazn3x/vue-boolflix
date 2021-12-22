<template>
    <section>
        <SectionTitle :title="data.pages[4]"/>
        <Cards :contents="data.saved"/>
        <div class="no-content" v-if="data.saved.length == 0">Non ci sono contenuti salvati.</div>
    </section>
</template>

<script>
import data from '../../share/data.js'
import Cards from '../commons/Cards.vue'
import SectionTitle from '../commons/SectionTitle.vue'
export default {
    name: "Saved",
    components: {
        Cards,
        SectionTitle
    },
    data() {
        return {
            data
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include cards;
@include noContent;
</style>