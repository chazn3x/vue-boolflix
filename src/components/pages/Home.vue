<template>
    <div class="home">
        <Hero :heroContents="data.trending.allDay"/>
        <div class="sections">
            <Section :title="'I titoli del momento'" :contents="data.trending.allWeek"/>
            <Section :title="'Top 10 oggi'" :contents="data.trending.allDay" :limit="10"/>
            <Section :title="'Serie TV'" :contents="data.trending.seriesWeek"/>
            <Section :title="'Film'" :contents="data.trending.moviesWeek"/>
        </div>
    </div>
</template>

<script>
import Hero from '../macro/Hero.vue'
import Section from '../commons/Section.vue'
import data from '../../share/data.js'
export default {
    name: 'Home',
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