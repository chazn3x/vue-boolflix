<template>
    <div class="wrapper">
        <div class="number">
            {{number}}
        </div>
        <div class="card" :class="{'landscape' : number == ''}" @mouseover="getPosition()" :ref="content.id">
            <div class="poster">
                <img class="poster-img" v-if="content.backdrop_path != null" :src="'https://image.tmdb.org/t/p/w780/' + content.backdrop_path" :alt="content.title != undefined ? content.title + ' poster' : content.name + ' poster'">
                <div v-else class="null-poster">
                    <div class="logo">
                        <img src="../../assets/img/logo.png" alt="logo poster">
                    </div>
                </div>
            </div>
            <div class="info">
                <div v-if="(data.savedIds.includes(content.id))" class="save" @click="remove">
                    <div class="circle">
                        <span>-</span>
                    </div>
                    <div class="text remove">Rimuovi dalla tua lista</div>
                </div>
                <div v-else class="save" @click="add">
                    <div class="circle">
                        <span>+</span>
                    </div>
                    <div class="text add">Aggiungi alla tua lista</div>
                </div>
                <h3>{{content.title || content.name}}</h3>
                <p class="overview">{{content.overview || 'Non è ancora presente una descrizione.'}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import data from '../../share/data.js'
export default {
    name: "CardL",
    data() {
        return {
            data
        }
    },
    props: {
        content: Object,
        number: Number
    },
    methods: {
        add() {
            data.saved.unshift(this.content);
            data.savedIds.unshift(this.content.id);
        },
        remove() {
            for (let i = 0; i < data.saved.length; i++) {
                if (data.saved[i].id == this.content.id) {
                    data.saved.splice(i, 1);
                    data.savedIds.splice(i, 1);
                }
            }
        },
        getPosition() {
            if (!data.show) {
                const position = this.$refs[this.content.id].getBoundingClientRect();
                console.log(position);
                data.top = ((position.top + (position.height / 2)) - 150) + 'px';
                console.log(data.top);
                data.left = ((position.left + (position.width / 2)) - 125) + 'px';
                data.show = true;
                console.log(data.top);
            }
        }
    }
}
</script>

<style lang="scss">
.cards>.wrapper {
    display: flex;
    align-items: center;
    min-width: 250px;
    // min-height: max-content;
    position: relative;
    .number {
        color: rgb(13,13,13);
        position: absolute;
        z-index: -1;
        font-size: 300px;
        font-weight: 900;
        -webkit-text-stroke-width: 4px;
        -webkit-text-stroke-color: rgb(100,100,100);
    }
    // &:first-child {
    //     .card {
    //         transform-origin: left;
    //     }
    // }
    // &:last-child {
    //     .card {
    //         transform-origin: right;
    //     }
    // }
    .card {
        overflow-y: hidden;
        color: white;
        margin-left: auto;
        width: 200px;
        height: 120px;
        background-color: rgb(24,24,24);
        border-radius: 4px;
        transition: .4s;
        // transition: aspect-ratio .4s;
        z-index: 1;
        // &.landscape {
        //     width: 100px;
        // }
        // &:hover {
        //     overflow-y: auto;
        //     transform: scale(2);
        //     -webkit-transform: scale(2);
        //     // transition-delay: .5s;
        //     z-index: 2;
        //     width: 180px;
        //     height: 150px;
        //     .poster {
        //         // transition-delay: .5s;
        //         width: 100%;
        //         height: 80%;
        //     }
        //     .info {
        //         display: block;
        //     }
        // }
        .poster {
            width: 100%;
            height: 100%;
            transition: .2s;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top;
                border-radius: 4px;
            }
            .null-poster {
                width: 60%;
                height: 100%;
                display: flex;
                align-items: center;
                margin: auto;
            }
        }
        .info {
            display: none;
            padding: 10px;
            h3 {
                font-size: .9rem;
                cursor: pointer;
            }
            .save {
                margin-bottom: 5px;
                display: flex;
                align-items: center;
                width: max-content;
                color: rgb(130,130,130);
                .circle {
                    width: 15px;
                    height: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    border: 1px solid rgb(130,130,130);
                    font-size: .8rem;
                    margin-bottom: 5px;
                    margin-right: 5px;
                    cursor: pointer;
                }
                .text {
                    height: 15px;
                    font-size: .6rem;
                    font-weight: 300;
                    cursor: pointer;
                    transition: .3s;
                }
                &:hover {
                    .circle {
                        transition: .3s;
                        transform: scale(1.1);
                        -webkit-transform: scale(1.1);
                        border-color: white;
                        color: white;
                    }
                    .remove {
                        color: red;
                    }
                    .add {
                        color: rgb(70,211,105);
                    }
                }
            }
            .overview {
                margin-top: 10px;
                font-size: .7rem;
                font-weight: 300;
                color: rgb(130,130,130);
            }
        }
    }
}
</style>