<template>
    <section>
        <SectionTitle :title="title"/>
        <Cards :contents="contents" :limit="limit ? limit : ''"/>
    </section>
</template>

<script>
import data from '../../share/data.js'
import Cards from '../commons/Cards.vue'
import SectionTitle from '../commons/SectionTitle.vue'
export default {
    name: 'Section',
    components: {
        Cards,
        SectionTitle
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