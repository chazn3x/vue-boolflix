<template>
    <div class="search-page">
        <h2>Risultati di ricerca:</h2>
        <div v-if="data.searchLoader" class="loader"></div>
        <div class="results" v-else>
            <div class="no-results-wrapper" v-if="data.noResults">
                <div class="no-results">
                    <p>Nessun risultato per la tua ricerca di "{{data.search}}".</p>
                    <span>Suggerimenti:</span>
                    <ul>
                        <li>Cerchi un film o un programma TV?</li>
                        <li>Prova a usare il titolo di un film o programma TV</li>
                    </ul>
                </div>
            </div>
            <div class="search-results" v-else>
                <Card v-for="content in data.searchResults" :key="content.id" :content="content" :searched="true"/>
            </div>
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
import Card from '../commons/Card.vue'
export default {
    name: 'SearchPage',
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
.search-page {
    padding: 70px 1rem 0;
    min-height: 100vh;
    .loader {
        margin: 20vh auto;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border-top: 3px solid rgb(230,30,20);
        border-right: 3px solid rgb(20,20,20);
        animation: loading 1s linear infinite;
        @keyframes loading {
            100% {
                transform: rotate(360deg);
            }
        }
    }
    .results {
        margin-top: 2rem;
        .search-results {
            display: grid;
            justify-content: center;
            grid-template-columns: repeat(auto-fill, 120px);
            padding-bottom: 3rem;
        }
        .no-results-wrapper {
            margin-top: 20vh;
            width: 100%;
            text-align: center;
            .no-results {
                color: rgba(255,255,255,0.9);
                font-weight: 300;
                display: inline-block;
                text-align: left;
                span {
                    display: inline-block;
                    margin-top: 1rem;
                }
                ul {
                    padding: 1rem 2rem;
                    li {
                        list-style: disc;
                        padding-left: .4rem;
                    }
                }
            }
        }
    }
    @media screen and (min-width: 768px) {
        padding: 5rem 2.5rem 0;
        .results {
            .search-results {
                grid-template-columns: repeat(auto-fill, 290px);
                row-gap: 4rem;
            }
        }
    }
}
</style>