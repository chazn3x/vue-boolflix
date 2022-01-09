<template>
    <section>
        <div class="section-title">
            <h2>{{title}}</h2>
        </div>
        <Cards :contents="contents" :limit="limit ? limit : null"/>
    </section>
</template>

<script>
import data from '../../share/data.js'
import Cards from '../commons/Cards.vue'
export default {
    name: 'Section',
    components: {
        Cards
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
section {
    .section-title {
        margin: 30px 0 10px;
        padding-left: 1rem;
    }
    @media screen and (min-width: 768px) {
        margin-bottom: 50px;
        .section-title {
            margin: 30px 0 10px;
            padding-left: 50px;
        }
    }
}
</style>