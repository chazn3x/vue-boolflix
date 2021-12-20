<template>
    <section>
        <h2>Movies</h2>
        <div class="cards">
            <Card v-for="(content, index) in data.movies" :key="index" :content="content"/>
        </div>
    </section>
</template>

<script>
import data from '../../share/data.js'
import Card from '../commons/Card.vue'
export default {
    name: "Movies",
    components: {
        Card
    },
    data() {
        return {
            data
        }
    }
}
</script>

<style lang="scss" scoped>
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-gap: 30px;
}
</style>