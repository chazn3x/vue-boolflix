<template>
    <main>
        <Movies/>
        <Series/>
    </main>
</template>

<script>
import Movies from '../sections/Movies.vue'
import Series from '../sections/Series.vue'
export default {
    name: "Main",
    components: {
        Movies,
        Series
    }
}
</script>

<style lang="scss" scoped>

</style>