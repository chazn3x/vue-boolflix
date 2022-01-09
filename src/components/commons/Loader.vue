<template>
    <div class="loader">
        <div class="card-loader" ref="first"></div>
        <div class="card-loader" ref="second"></div>
        <div class="card-loader" ref="third"></div>
        <div class="card-loader" ref="fourth"></div>
        <div class="card-loader" ref="fifth"></div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    mounted() {
        const timeout = 200;
        setTimeout(() => {
            if (this.$refs.first) {
                this.$refs.first.style.display = "block";
            }
        });
        setTimeout(() => {
            if (this.$refs.second) {
                this.$refs.second.style.display = "block";
            }
        }, timeout);
        setTimeout(() => {
            if (this.$refs.third) {
                this.$refs.third.style.display = "block";
            }
        }, timeout * 2);
        setTimeout(() => {
            if (this.$refs.fourth) {
                this.$refs.fourth.style.display = "block";
            }
        }, timeout * 3);
        setTimeout(() => {
            if (this.$refs.fifth) {
                this.$refs.fifth.style.display = "block";
            }
        }, timeout * 4);
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
            display: none;
            width: 120px;
            height: calc(120px * 1.4);
            flex-shrink: 0;
            margin-right: 10px;
            margin-bottom: 10px;
            border-radius: 7px;
            background: rgb(40,40,40);
            animation: loading 2s linear infinite;
            @keyframes loading {
                0% {
                    opacity: .2;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    opacity: .2;
                }
            }
        }
        @media screen and (min-width: 768px) {
            .card-loader {
                width: 290px;
                height: calc(290px * 0.56);
            }
        }
    }
</style>