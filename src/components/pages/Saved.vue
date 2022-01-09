<template>
    <div class="saved-page">
        <h2>La mia lista</h2>
        <div class="no-content" v-if="data.saved.length == 0">Non ci sono contenuti salvati.</div>
        <div class="saved" v-else>
            <Card v-for="content in data.saved" :key="content.id" :content="content" :searched="true"/>
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
import Card from '../commons/Card.vue'
export default {
    name: "Saved",
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
.saved-page {
    padding: 70px 1rem 0;
    min-height: 100vh;
    h2 {
        margin-bottom: 2rem;
    }
    .saved {
        display: grid;
        grid-template-columns: repeat(auto-fill, 120px);
        padding-bottom: 3rem;
    }
    .no-content {
        color: rgba(255,255,255,0.5);
        font-weight: 300;
        text-align: center;
    }
    @media screen and (min-width: 768px) {
        padding: 5rem 2.5rem 0;
        .saved {
            grid-template-columns: repeat(auto-fill, 290px);
            row-gap: 4rem;
        }
    }
}
</style>