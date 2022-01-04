<template>
    <section>
        <!-- <SectionTitle :title="title"/> -->
        <div class="section-title">
            <h2>{{title}}</h2>
        </div>
        <Cards :contents="contents" :limit="limit ? limit : null"/>
    </section>
</template>

<script>
import data from '../../share/data.js'
import Cards from '../commons/Cards.vue'
// import SectionTitle from '../commons/SectionTitle.vue'
export default {
    name: 'Section',
    components: {
        Cards,
        // SectionTitle
    },
    data() {
        return {
            data
        }
    },
    props: {
        title: String,
        contents: Array,
        limit: Number
    }
}
</script>
<style lang="scss" scoped>
.section-title {
    margin: 30px 0 10px;
    padding-left: 1rem;
    @media screen and (min-width: 768px) {
        padding-left: 50px;
    }
}
</style>