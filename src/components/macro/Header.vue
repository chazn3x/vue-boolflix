<template>
    <header>
        <div class="logo">
            <img src="../../assets/img/logo.png" alt="Boolflix logo">
        </div>
        <Search/>
    </header>
</template>

<script>
import Search from '../commons/Search.vue'
export default {
    name: "Header",
    components: {
        Search
    },
}
</script>

<style lang="scss" scoped>
header {
    background-color: rgb(13,13,13);
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 40px;
    .logo, .logo img {
        height: 100%;
    }
}
</style>