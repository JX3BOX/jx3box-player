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
            playerId: "26522940",       //浮烟七秀
            server: "蝶恋花",
            
            // playerId: "21041450",
            // playerId: "33146204",
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
#app{
    padding:200px;
}
</style>
