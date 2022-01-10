<template>
    <footer>
        <div class="wrapper">
            <div class="socials">
                <a href="https://github.com/chazn3x" target="_blank" class="icon">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://www.instagram.com/chaznex" target="_blank" class="icon">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCWeiaQCKJZ4iblijC-KL31A" target="_blank" class="icon">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>
            <div class="links">
                <div>
                    <h5>Tecnologie utilizzate:</h5>
                    <ul>
                        <li>
                            <span>HTML</span>
                        </li>
                        <li>
                            <span>SCSS</span>
                        </li>
                        <li>
                            <span>JavaScript</span>
                        </li>
                        <li>
                            <a href="https://vuejs.org" target="_blank">Vue CLI</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5>API e altro:</h5>
                    <ul>
                        <li>
                            <a href="https://www.themoviedb.org" target="_blank">The Movie Database API</a>
                        </li>
                        <li>
                            <a href="https://developers.google.com/youtube/iframe_api_reference?hl=it" target="_blank">YouTube IFrame Player API</a>
                        </li>
                        <li>
                            <a href="https://www.npmjs.com/package/vue-youtube" target="_blank">VueYoutube</a>
                        </li>
                        <li>
                            <a href="https://day.js.org" target="_blank">Day.js</a>
                        </li>
                        <li>
                            <a href="https://axios-http.com" target="_blank">Axios</a>
                        </li>
                        <li>
                            <a href="https://fontawesome.com" target="_blank">Font Awesome</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="credits">
                <span>WebApp sviluppata a puro scopo educativo da Giovanni Argentiero, ispirato da <a href="https://www.netflix.com" target="_blank">Netflix</a>: tutti i diritti sono riservati.</span>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style lang="scss" scoped>
footer {
    width: 100%;
    padding: 3rem 1rem 1rem;
    .wrapper {
        a {
            transition: opacity .2s;
            cursor: default;
        }
        a:hover {
            opacity: .8;
            text-decoration: underline;
        }
        .socials {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            .icon {
                margin: 1rem;
                font-size: 1.5rem;
                color: white;
            }
        }
        .links {
            display: grid;
            grid-template-columns: repeat(auto-fill, 170px);
            column-gap: 20px;
            row-gap: 20px;
            h5 {
                color: white;
                font-size: 1rem;
            }
            ul {
                li {
                    padding: .5rem 0 0;
                    span, a {
                        color: rgba(255,255,255,0.5);
                        font-size: .9rem;
                        font-weight: 300;
                    }
                }
            }
        }
        .credits {
            padding-top: 2rem;
            color: rgba(255,255,255,0.4);
            font-weight: 200;
            font-size: .8rem;
            a {
                color: red;
            }
        }
    }
    @media screen and (min-width: 768px) {
        .wrapper {
            width: 768px;
            margin: 0 auto;
            a {
                cursor: pointer;
            }
        }
    }
}
</style>