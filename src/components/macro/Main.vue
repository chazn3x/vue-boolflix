<template>
    <main>
        <div class="no-content" v-if="data.search != '' && data.series.length == 0 && data.movies.length == 0">
            Non ci sono contenuti che soddisfano i criteri di ricerca.
        </div>
        <div class="sections" v-else>
            <Series v-if="data.selected == 'Home' || data.selected == 'Serie TV'"/>
            <Movies v-if="data.selected == 'Home' || data.selected == 'Film'"/>
            <Trending v-if="(data.selected == 'Home' || data.selected == 'Nuovi e popolari') && data.search == ''"/>
            <Saved v-if="(data.selected == 'Home' || data.selected == 'La mia lista') && data.search == ''"/>
        </div>
    </main>
</template>

<script>
import Movies from '../sections/Movies.vue'
import Series from '../sections/Series.vue'
import Trending from '../sections/Trending.vue'
import Saved from '../sections/Saved.vue'
import data from '../../share/data.js'
export default {
    name: "Main",
    components: {
        Movies,
        Series,
        Trending,
        Saved
    },
    data() {
        return {
            data
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/style/mixins/mixin.scss';
@import '../../assets/style/mixins/mixin.scss';
main {
    padding: 90px 40px 15px;
    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, 250px);
        grid-gap: 30px;
        justify-content: center;
    }
    @include noContent;
    >.no-content {
        margin-top: 200px;
    }
}
</style>