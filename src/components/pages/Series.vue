<template>
    <div class="series">
        <Hero v-if="content" :content="content" :index="top"/>
        <div v-else class="loaders-wrapper hero-loader">
            <WordsLoader :width="300" :height="5"/>
            <WordsLoader :width="200" :height="2"/>
            <WordsLoader :height="2" :rows="3"/>
            <WordsLoader :width="120" :height="2"/>
        </div>
        <div v-if="data.apiCalls" class="sections">
            <Section :title="'Le serie TV del momento'" :contents="data.trending.seriesWeek"/>
            <Section :title="'Top 10 serie TV oggi'" :contents="data.trending.seriesDay" :limit="10"/>
        </div>
        <div v-else class="loaders-wrapper">
            <WordsLoader :width="200" :height="2"/>
            <Loader/>
        </div>
    </div>
</template>

<script>
import Hero from '../macro/Hero.vue'
import Section from '../commons/Section.vue'
import data from '../../share/data.js'
import WordsLoader from '../commons/WordsLoader.vue'
import Loader from '../commons/Loader.vue'
export default {
    name: 'Series',
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
                    if (data.trending.seriesDay[i].id == data.top10Series[index]) {
                        this.content = data.trending.seriesDay[i];
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
.series {
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