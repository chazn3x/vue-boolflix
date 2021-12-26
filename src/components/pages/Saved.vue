<template>
    <div class="saved">
        <Section :title="data.pages[4]" :contents="data.saved"/>
        <div class="no-content" v-if="data.saved.length == 0">Non ci sono contenuti salvati.</div>
    </div>
</template>

<script>
import data from '../../share/data.js'
import Section from '../commons/Section.vue'
export default {
    name: "Saved",
    components: {
        Section
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
.saved {
    padding-top: 70px
}
@include noContent;
</style>