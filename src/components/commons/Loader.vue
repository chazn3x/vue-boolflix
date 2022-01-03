<template>
    <div class="loader">
        <div class="card-loader" ref="first"></div>
        <div class="card-loader" ref="second"></div>
        <div class="card-loader" ref="third"></div>
        <div class="card-loader" ref="fourth"></div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    mounted() {
        setTimeout(() => {
            if (this.$refs.first) {
                this.$refs.first.style.opacity = "1";
            }
        });
        setTimeout(() => {
            if (this.$refs.second) {
                this.$refs.second.style.opacity = "1";
            }
        }, 400);
        setTimeout(() => {
            if (this.$refs.third) {
                this.$refs.third.style.opacity = "1";
            }
        }, 800);
        setTimeout(() => {
            if (this.$refs.fourth) {
                this.$refs.fourth.style.opacity = "1";
            }
        }, 1200);
    }
}
</script>

<style lang="scss" scoped>
    .loader {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        overflow-x: hidden;
        .card-loader {
            opacity: 0;
            transition: opacity .3s;
            width: 200px;
            aspect-ratio: 16 / 9;
            flex-shrink: 0;
            margin-right: 10px;
            border-radius: 7px;
            background: linear-gradient(270deg, rgb(40,40,40), rgb(30,30,30));
            background-size: 400% 400%;
            animation: loading 2s linear infinite;
            @keyframes loading {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }
        }
    }
</style>