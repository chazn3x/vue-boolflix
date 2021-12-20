<template>
    <div class="card">
        <div class="title">
            <span><strong>Titolo: </strong></span>
            <h3>{{content.title}}</h3>
        </div>
        <div class="title-orig">
            <span><strong>Titolo originale: </strong></span>
            <p>{{content.original_title}}</p>
        </div>
        <div class="lang">
            <span><strong>Lingua: </strong></span>
            <p>{{content.original_language}}</p>
        </div>
        <div v-if="content.vote_average != 0" class="vote">
            <span><strong>Voto: </strong></span>
            <p>{{content.vote_average}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        content: Object
    }
}
</script>

<style lang="scss" scoped>
.card {
    color: white;
    h3, p {
        display: inline;
    }
}
</style>