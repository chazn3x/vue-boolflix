<template>
    <div class="section-title" @click="changePage()">
        <img src="../../assets/img/logo-b.png" alt="Boolflix single letter logo title">
        <h2>{{title}}</h2>
        <div class="next" v-if="data.selected == data.pages[0]">
            <span>Sfoglia</span>
            <img src="../../assets/img/chevron.png" alt="next">
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
export default {
    name: "SectionTitle",
    data() {
        return {
            data
        }
    },
    props: {
        title: String
    },
    methods: {
        changePage() {
            if (data.selected == data.pages[0]) {
                window.scrollTo(0,0);
                if (this.title.toLowerCase().includes('serie')) {
                    data.selected = data.pages[1];
                    document.title = data.pages[1] + ' - Boolflix';
                }
                if (this.title.toLowerCase().includes('film')) {
                    data.selected = data.pages[2];
                    document.title = data.pages[2] + ' - Boolflix';
                }
                if (this.title.toLowerCase().includes('titoli')) {
                    data.selected = data.pages[3];
                    document.title = data.pages[3] + ' - Boolflix';
                }
                if (this.title.toLowerCase().includes('mia')) {
                    data.selected = data.pages[4];
                    document.title = data.pages[4] + ' - Boolflix';
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
@include sectionTitle;
</style>