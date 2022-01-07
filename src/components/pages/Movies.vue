<template>
    <div class="series">
        <Hero :heroContents="data.trending.moviesDay"/>
        <div class="sections">
            <Section :title="'I film del momento'" :contents="data.trending.moviesWeek"/>
            <Section :title="'Top 10 film oggi'" :contents="data.trending.moviesDay" :limit="10"/>
        </div>
    </div>
</template>

<script>
import Hero from '../macro/Hero.vue'
import Section from '../commons/Section.vue'
import data from '../../share/data.js'
export default {
    name: 'Movies',
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