<template>
    <main>
        <div class="pages">
            <Home v-if="data.selected == data.pages[0]"/>
            <Series v-if="data.selected == data.pages[1]"/>
            <Movies v-if="data.selected == data.pages[2]"/>
        </div>
        <!-- <Saved v-if="data.selected == data.pages[4]"/> -->
        <!-- <CardHovered v-if="data.show"/> -->
    </main>
</template>

<script>
import Home from '../pages/Home.vue'
import Series from '../pages/Series.vue'
import Movies from '../pages/Movies.vue'
// import Trending from '../pages/Trending.vue'
// import Saved from '../pages/Saved.vue'
// import CardHovered from '../commons/CardHovered.vue'
import data from '../../share/data.js'
export default {
    name: "Main",
    components: {
        Home,
        Series,
        Movies,
        // Trending,
        // Saved,
        // CardHovered,
    },
    data() {
        return {
            data,
        }
    },
}
</script>