<template>
    <section>
        <div class="section-title">
            <img src="../../assets/img/logo-b.png" alt="Boolflix single letter logo saved">
            <h2>La mia lista</h2>
        </div>
        <div class="cards">
            <Card v-for="(content, index) in data.saved" :key="index" :content="content"/>
        </div>
        <div class="no-content" v-if="data.saved.length == 0">Non ci sono contenuti salvati.</div>
    </section>
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
@import '../../assets/style/mixins/mixin.scss';
@include sectionTitle;
@include noContent;
</style>