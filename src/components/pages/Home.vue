<template>
    <div class="home">
        <Hero :heroContents="data.trending.allDay"/>
        <!-- <div class="sections">
            <Section :title="'I 10 migliori titoli della settimana'" :contents="data.trending.allDay" :limit="10"/>
            <Section :title="'I migliori film del momento'" :contents="data.trending.moviesWeek"/>
            <Section :title="'Le migliori serie del momento'" :contents="data.trending.allDay" :limit="20"/>
        </div> -->
    </div>
</template>

<script>
import Hero from '../commons/Hero.vue'
// import Section from '../commons/Section.vue'
import data from '../../share/data.js'
export default {
    name: 'Home',
    components: {
        Hero,
        // Section
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
    position: relative;
    .sections {
        // position: absolute;
        width: 100%;
        padding-top: 70vh;
        z-index: 2;
    }
}
</style>