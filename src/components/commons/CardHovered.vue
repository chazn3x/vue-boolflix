<template>
    <div class="card-hovered" :style="{top : data.top, left : data.left}" @mouseleave="data.show = false">

    </div>
</template>

<script>
import data from '../../share/data.js'
export default {
    name: 'CardHovered',
    data() {
        return {
            data
        }
    }
}
</script>

<style lang="scss" scoped>
.card-hovered {
    position: fixed;
    z-index: 5;
    width: 250px;
    height: 300px;
    background-color: #fff;
}
</style>