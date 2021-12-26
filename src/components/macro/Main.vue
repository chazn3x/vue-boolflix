<template>
    <main>
        <Home v-if="data.selected == data.pages[0]"/>
        <Saved v-if="data.selected == data.pages[4]"/>
        <CardHovered v-if="data.show"/>
    </main>
</template>

<script>
import Home from '../pages/Home.vue'
// import Series from '../pages/Series.vue'
// import Movies from '../pages/Movies.vue'
// import Trending from '../pages/Trending.vue'
import Saved from '../pages/Saved.vue'
import CardHovered from '../commons/CardHovered.vue'
import data from '../../share/data.js'
export default {
    name: "Main",
    components: {
        Home,
        // Series,
        // Movies,
        // Trending,
        Saved,
        CardHovered
    },
    data() {
        return {
            data
        }
    },
}
</script>

<style lang="scss">
// main {
//     min-height: max-content;
// }
// @import '../../assets/style/mixins/mixin.scss';
// main {
//     // padding-top: 70px;
//     position: relative;
//     .sections {
//         padding: 70px 40px 40px;
//         z-index: 2;
//         &.home {
//             padding-top: 0;
//             position: absolute;
//             width: 100%;
//             top: 70vh;
//         }
//     }
//     @include noContent;
//     >.no-content {
//         margin-top: 200px;
//     }
// }
</style>