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
            // playerId: "31864485",
            playerId: "26522940",
            // playerId: "21041450",
            
            // playerId: "33146204",
            server: "蝶恋花",
            // server: "唯我独尊",
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
