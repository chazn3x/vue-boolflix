<template>
    <div class="loader">
        <div class="word-loader" ref="first"></div>
        <div class="word-loader" ref="second" v-if="rows > 1"></div>
        <div class="word-loader" ref="third" v-if="rows > 2"></div>
        <div class="word-loader" ref="fourth" v-if="rows > 3"></div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: {
        rows: Number,
        width: Number,
        height: Number
    },
    mounted() {
            if (this.$refs.first) {
                this.$refs.first.style.display = "block";
                this.$refs.first.style.width = this.width + 'px';
                this.$refs.first.style.height = this.height + 'rem';
            }
        if (this.rows > 1) {
                if (this.$refs.second) {
                    this.$refs.second.style.display = "block";
                    this.$refs.second.style.width = this.width + 'px';
                    this.$refs.second.style.height = this.height + 'rem';
                }
        }
        if (this.rows > 2) {
                if (this.$refs.third) {
                    this.$refs.third.style.display = "block";
                    this.$refs.third.style.width = this.width + 'px';
                    this.$refs.third.style.height = this.height + 'rem';
                }
        }
        if (this.rows > 3) {
                if (this.$refs.fourth) {
                    this.$refs.fourth.style.display = "block";
                    this.$refs.fourth.style.width = this.width + 'px';
                    this.$refs.fourth.style.height = this.height + 'rem';
                }
        }
    }
}
</script>

<style lang="scss" scoped>
    .loader {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .word-loader {
            display: none;
            transition: opacity .3s;
            flex-shrink: 0;
            margin-right: 10px;
            margin-bottom: 1rem;
            border-radius: 7px;
            height: 2rem;
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
    }
</style>