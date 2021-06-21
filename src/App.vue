<template>
    <div id="app">
        <Player :playerId="playerId" :server="server" :role="role" :darkMode="false" :showEquipName="true" :showPosition="false"/>
    </div>
</template>

<script>
import Player from "./Player.vue";
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            role : "浮烟@长安城",

            // playerId: '31864485', //筱儿
            // playerId: "26522940",  //浮烟七秀
            // playerId: "33065480",  //和尚
            // playerId: "33065534",  //霸刀
            // playerId: "33146204",  //藏剑
            playerId: "33154610",  //醉栩蓬莱
            // playerId: "10537412",  //醉栩苍云
            server: '蝶恋花',

            // playerId: "21041450",
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
#app {
    padding: 200px;
}
</style>
