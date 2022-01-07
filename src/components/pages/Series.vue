<template>
    <div class="series">
        <Hero :heroContents="data.trending.seriesDay"/>
        <div class="sections">
            <Section :title="'Le serie TV del momento'" :contents="data.trending.seriesWeek"/>
            <Section :title="'Top 10 serie TV oggi'" :contents="data.trending.seriesDay" :limit="10"/>
        </div>
    </div>
</template>

<script>
import Hero from '../macro/Hero.vue'
import Section from '../commons/Section.vue'
import data from '../../share/data.js'
export default {
    name: 'Series',
    components: {
        Hero,
        Section
    },
    data() {
        return {
            data
        }
    }
}
</script>

<style lang="scss">
.home {
    .sections {
        position: relative;
        z-index: 1;
    }
}
</style>