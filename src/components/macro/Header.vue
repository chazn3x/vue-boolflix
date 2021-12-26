<template>
    <header>
        <div class="wrapper" ref="header">
            <div class="header-left" :class="{'search-open' : screen < 768 && data.searchBar}">
                <div v-if="screen >= 768" class="logo logo-big" @click="checkLink(data.pages[0])">
                    <img src="../../assets/img/logo.png" alt="Boolflix header big logo">
                </div>
                <div class="menu">
                    <div v-if="screen < 768" class="menu-button" :class="{'opened' : data.menuIsOpen}" @click.stop="openMenu()">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav v-if="screen >= 768 || data.menuIsOpen" class="links">
                        <ul>
                            <li v-for="(link, index) in data.pages" :key="index">
                                <a href="#" :class="{'selected': link == data.selected}" @click.prevent="checkLink(link)">{{link}}</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div v-if="screen < 768" class="header-center" :class="{'search-open' : screen < 768 && data.searchBar}">
                <div class="logo logo-small">
                    <img src="../../assets/img/logo-b.png" alt="Boolflix header small logo" @click="checkLink(data.pages[0])">
                </div>
            </div>
            <div class="header-right">
                <div class="search">
                    <div class="search-bar" @click.stop :class="{'opened' : data.searchBar}">
                        <div class="search-icon" @click="openSearch()" :class="{'opened' : data.search}">
                            <span></span>
                            <span></span>
                        </div>
                        <div class="search-input">
                            <Search ref="searchInput"/>
                        </div>
                    </div>
                </div>
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
        Search,
    },
    data() {
        return {
            data,
            screen: null
        }
    },
    methods: {
        checkLink(link) {
            window.scrollTo(0,0);
            document.title = link + ' - Boolflix';
            data.selected = link;
            if (link == data.pages[0] || link == data.pages[3] || link == data.pages[4]) {
                data.search = '';
            }
        },
        openSearch() {
            if (!data.searchBar) {
                data.searchBar = true;
            } else if (data.searchBar && !data.search) {
                data.searchBar = false;
            } else data.search = '';
            if (data.menuIsOpen) {
                data.menuIsOpen = false;
            }
            this.$refs.searchInput.$el.focus();
        },
        deleteSearch() {
            data.search = '';
            this.$refs.searchInput.$el.focus();
        },
        openMenu() {
            data.menuIsOpen = !data.menuIsOpen;
            if (data.searchBar) {
                data.searchBar = false;
            }
            if (data.menuIsOpen) {
                document.body.style.overflow = 'hidden';
            } else document.body.style.overflow = 'auto';
        }
    },
    created() {
        window.addEventListener('scroll', () => {
            if (window.scrollY) {
                this.$refs.header.style.background = 'linear-gradient(rgb(6,6,6), rgb(20,20,20))';
            } else this.$refs.header.style.background = 'linear-gradient(rgb(6,6,6), transparent)';
        });
        this.screen = screen.width;
        window.addEventListener('resize', () => {
            this.screen = screen.width;
        });
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/mixin.scss';
header {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 60px;
    @media screen and (min-width: 768px) {
        height: 70px;
    }
    .wrapper {
        background: linear-gradient(rgb(6,6,6), transparent);
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: .5s;
        padding: 1rem;
        @media screen and (min-width: 768px) {
            padding: 1rem 2.5rem;
        }
        &>* {
            height: inherit;
            display: flex;
            align-items: center;
            // border: 1px solid red;
            @media screen and (max-width: 767px) {
                flex: 1;
            }
        }
        .header-left {
            justify-content: flex-start;
            transition: opacity .2s;
            .menu {
                height: 100%;
                display: flex;
                align-items: center;
                .menu-button {
                    height: 1.1rem;
                    width: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    span {
                        display: block;
                        width: 100%;
                        height: 1px;
                        background-color: rgba(255,255,255,0.9);
                        border-radius: .5px;
                        transition: .1s;
                    }
                    &.opened {
                        span {
                            position: absolute;
                            left: 0;
                            top: 50%;
                        }
                        span:nth-of-type(1) {
                            transform: rotate(45deg) translateY(-50%);
                        }
                        span:nth-of-type(2) {
                            transform: translateY(-50%);
                            width: 0;
                        }
                        span:nth-of-type(3) {
                            transform: rotate(-45deg) translateY(-50%);
                        }
                    }
                }
                .links {
                    height: 100%;
                    ul {
                        display: flex;
                        height: 100%;
                        align-items: center;
                        a {
                            margin: 0 .7rem;
                            color: rgba(255,255,255,0.5);
                            user-select: none;
                            -webkit-user-select: none;
                            &.selected {
                                color: white;
                                cursor: default;
                            }
                            &:not(.selected):hover {
                                color: rgba(255,255,255,0.4);
                            }
                        }
                    }
                    @media screen and (max-width: 767px) {
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: rgb(20,20,20);
                        height: 100vh;
                        width: 100%;
                        padding: 70px 1rem 0;
                        z-index: -1;
                        animation: openMenu .1s linear;
                        @keyframes openMenu {
                            0% {opacity: 0%;}
                            100% {opacity: 100%;}
                        }
                        nav, ul, li, a {
                            width: inherit;
                        }
                        ul {
                            flex-direction: column;
                            align-items: flex-start;
                            a {
                                display: block;
                                margin: 0;
                                padding: 1rem;
                                font-size: 1.1rem;
                                border-bottom: .5px solid rgba(255,255,255,0.3);
                                cursor: default;
                            }
                            li:last-of-type {
                                a {
                                    border-bottom: none;
                                }
                            }
                        }
                    }
                }
            }
            &.search-open {
                opacity: 0;
            }
        }
        .header-center {
            justify-content: center;
            transition: opacity .2s;
            &.search-open {
                opacity: 0;
            }
        }
        .header-right {
            justify-content: flex-end;
            .search {
                .search-bar {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    transition: .3s;
                    &>* {
                        transition: .3s;
                    }
                    .search-icon {
                        height: 1.1rem;
                        width: 1.5rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        position: relative;
                        @media screen and (min-width: 768px) {
                            cursor: pointer;
                            &:hover {
                                opacity: .6;
                            }
                        }
                        span {
                            display: block;
                            transition: .2s;
                        }
                        span:first-of-type {
                            width: .9rem;
                            height: .9rem;
                            position: absolute;
                            top: 0;
                            left: 0;
                            border: 1px solid rgba(255,255,255,0.9);
                            border-radius: 50%;
                            transform-origin: right;
                        }
                        span:last-of-type {
                            background-color: rgba(255,255,255,0.9);
                            width: .5rem;
                            height: 1px;
                            border-radius: 0 .5px .5px 0;
                            position: absolute;
                            bottom: 0;
                            right: 6px;
                            transform-origin: right;
                            transform: rotate(45deg);
                        }
                        &.opened {
                            span {
                                top: 50%;
                                left: 0;
                                width: 100%;
                                height: 1px;
                                background-color: rgba(255,255,255,0.9);
                                border: none;
                                border-radius: .5px;
                                transform-origin: center;
                                }
                            span:nth-of-type(1) {
                                transform: rotate(45deg) translateY(-50%);
                            }
                            span:nth-of-type(2) {
                                transform: rotate(-45deg) translateY(-50%);
                            }
                        }
                    }
                    .search-input {
                        width: 0px;
                        height: 100%;
                        transition: width .2s;
                        transform-origin: right;
                        input {
                            width: inherit;
                            height: 100%;
                            background-color: transparent;
                            border: none;
                            outline: none;
                            color: white;
                        }
                    }
                    &.opened {
                        position: absolute;
                        top: 0;
                        right: 0;
                        height: 100%;
                        width: 100%;
                        padding-left: 1rem;
                        .search-input {
                            width: 100%;
                            input {
                                width: 100%;
                                padding-left: 1rem;
                                font-weight: 100;
                                font-size: 1.1rem;
                                &::placeholder {
                                    font-size: 1rem;
                                }
                            }
                        }
                        @media screen and (min-width: 768px) {
                            position: unset;
                        }
                    }
                }
            }
        }
        .logo {
            height: 100%;
            &.logo-big {
                cursor: pointer;
                margin-right: 2.5rem;
            }
            img {
                height: 100%;
            }
        }
    }
}
</style>