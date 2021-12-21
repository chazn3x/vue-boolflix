<template>
    <header>
        <div class="left">
            <div class="logo">
                <img src="../../assets/img/logo.png" alt="Boolflix logo">
            </div>
            <nav>
                <ul>
                    <li v-for="(link, index) in data.pages" :key="index">
                        <a href="#" :class="{'selected': link == data.selected}" @click.prevent="checkLink(link)">{{link}}</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="search">
            <div class="search-bar">
                <i class="fas fa-search"></i>
                <Search/>
            </div>
        </div>
    </header>
</template>

<script>
import Search from '../commons/Search.vue'
import data from '../../share/data.js'
export default {
    name: "Header",
    components: {
        Search
    },
    data() {
        return {
            data
        }
    },
    methods: {
        checkLink(link) {
            data.selected = link;
            if (link == 'Nuovi e popolari' || link == 'Home' || link == 'La mia lista') {
                data.search = '';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
header {
    position: fixed;
    z-index: 2;
    width: 100%;
    background-color: rgb(13,13,13);
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 40px;
    .left, .logo, .logo img {
        height: 100%;
    }
    .left {
        display: flex;
        align-items: center;
        .logo {
            margin-right: 30px;
        }
        nav ul {
            display: flex;
            li {
                margin: 0 10px;
                a {
                    color: rgba(255,255,255,0.5);
                    &.selected {
                        color: white;
                        cursor: default;
                    }
                    &:not(.selected):hover {
                        color: rgba(255,255,255,0.45);
                    }
                }
            }
        }
    }
    .search {
        @include searchBar;
        .search-bar {
            background-color: rgb(20,20,20);
        }
    }
}
</style>