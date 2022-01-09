<template>
    <div class="home">
        <Hero v-if="content" :content="content" :index="top"/>
        <div v-else class="loaders-wrapper hero-loader">
            <WordsLoader :width="300" :height="5"/>
            <WordsLoader :width="200" :height="2"/>
            <WordsLoader :height="2" :rows="3"/>
            <WordsLoader :width="120" :height="2"/>
        </div>
        <div v-if="data.apiCalls" class="sections">
            <Section :title="'I titoli del momento'" :contents="data.trending.allWeek"/>
            <Section :title="'Top 10 oggi'" :contents="data.trending.allDay" :limit="10"/>
            <Section :title="'Serie TV'" :contents="data.trending.seriesWeek"/>
            <Section :title="'Film'" :contents="data.trending.moviesWeek"/>
        </div>
        <div v-else class="loaders-wrapper">
            <WordsLoader :width="200" :height="2"/>
            <Loader/>
        </div>
    </div>
</template>

<script>
import Hero from '../macro/Hero.vue'
import data from '../../share/data.js'
import WordsLoader from '../commons/WordsLoader.vue'
import Loader from '../commons/Loader.vue'
import Section from '../commons/Section.vue'
export default {
    name: 'Home',
    components: {
        Hero,
        Section,
        WordsLoader,
        Loader
    },
    data() {
        return {
            data,
            top: null,
            content: null
        }
    },
    watch: {
        '$data.data.apiCalls'(fullfilled) {
            if (fullfilled) {
                let index = Math.floor(Math.random() * 10);
                let i = 0;
                while (!this.content) {
                    if (data.trending.allDay[i].id == data.top10[index]) {
                        this.content = data.trending.allDay[i];
                        this.top = i + 1;
                    }
                    i++;
                }
            }
        }
    }
}
</script>

<style lang="scss">
.home {
    min-height: 100vh;
    .sections {
        position: relative;
        z-index: 1;
    }
    .loaders-wrapper {
        margin-left: 1rem;
        margin-bottom: 3rem;
        &.hero-loader {
            padding-top: 70px;
            max-width: 768px;
        }
        @media screen and (min-width: 768px) {
            margin-left: 50px;
        }
    }
}
</style>