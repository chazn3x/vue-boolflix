<template>
    <main>
        <div class="pages">
            <Home v-show="data.selected == data.pages[0] && data.search == ''"/>
            <Series v-show="data.selected == data.pages[1] && data.search == ''"/>
            <Movies v-show="data.selected == data.pages[2] && data.search == ''"/>
            <SearchPage v-show="data.search != ''"/>
            <Saved v-show="data.selected == data.pages[4] && data.search == ''"/>
        </div>
    </main>
</template>

<script>
import Home from '../pages/Home.vue'
import Series from '../pages/Series.vue'
import Movies from '../pages/Movies.vue'
import SearchPage from '../pages/SearchPage.vue'
// import Trending from '../pages/Trending.vue'
import Saved from '../pages/Saved.vue'
import data from '../../share/data.js'
export default {
    name: "Main",
    components: {
        Home,
        Series,
        Movies,
        SearchPage,
        // Trending,
        Saved
    },
    data() {
        return {
            data,
        }
    },
}
</script>