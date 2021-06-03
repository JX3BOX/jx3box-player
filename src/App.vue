<template>
    <div id="app">
        <Player :playerId="playerId" :server="server" />
    </div>
</template>

<script>
import Player from "./Player.vue";
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            playerId: "26522940",
            server: "蝶恋花",
        };
    },
    computed: {},
    methods: {},
    components: {
        Player,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
