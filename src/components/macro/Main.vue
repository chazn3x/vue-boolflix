<template>
    <main>
        <div class="pages">
            <Home v-if="data.selected == data.pages[0]" v-show="data.search == ''"/>
            <Series v-if="data.selected == data.pages[1]" v-show="data.search == ''"/>
            <Movies v-if="data.selected == data.pages[2]" v-show="data.search == ''"/>
            <SearchPage v-if="data.search != ''"/>
        </div>
        <!-- <Saved v-if="data.selected == data.pages[4]"/> -->
    </main>
</template>

<script>
import Home from '../pages/Home.vue'
import Series from '../pages/Series.vue'
import Movies from '../pages/Movies.vue'
import SearchPage from '../pages/SearchPage.vue'
// import Trending from '../pages/Trending.vue'
// import Saved from '../pages/Saved.vue'
import data from '../../share/data.js'
export default {
    name: "Main",
    components: {
        Home,
        Series,
        Movies,
        SearchPage
        // Trending,
        // Saved,
    },
    data() {
        return {
            data,
        }
    },
}
</script>