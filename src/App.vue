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

            // 输出
            // playerId: '31864485', //筱儿
            // playerId: "26522940",  //浮烟七秀
            // playerId: "10105521",  //浮烟长歌
            // playerId: "33065480",  //和尚
            // playerId: "33065534",  //霸刀
            // playerId: "33146204",  //藏剑
            // playerId: "33154610",  //醉栩蓬莱
            // playerId: "17217706",  //醉栩凌雪
            // playerId: "2382163",  //yyz
            playerId: "10105523",  //浮烟藏剑

            // 坦克
            // playerId: "17806618",  //醉栩天策
            // playerId: "32287076",  //牧空和尚
            // playerId: "10537412",  //醉栩苍云
            // playerId: "5291324",  //醉栩明教 闪躲还有一点问题
            // server: '斗转星移',
            
            
            // 奶妈
            // playerId: "31864485",  // 子璇七秀
            // playerId: "13525363",  // 凉子七秀
            // playerId: "31346115",  //凉子奶毒
            // playerId: "26522945",  //浮烟奶花
            // playerId: "10105521",  //浮烟奶歌
            server: '蝶恋花',
            // server: '唯我独尊',
            

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
