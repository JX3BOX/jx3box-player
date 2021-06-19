<template>
    <div class="w-player-basic">
        <h1 class="w-player-title">
            <i class="w-player-mount">
                <img :src="mount_id | showMountIcon"/>
            </i>
            <span class="w-player-role">{{role || '匿名'}}</span>
            <span class="w-player-level">( {{level}}级 )</span>
        </h1>
        <div class="w-player-meta">
        </div>
        <div class="w-player-gs">
            <i class="u-icon"><img src="../assets/img/gs.png"></i>
            <!-- <span class="u-label">装备分数</span>  -->
            <b class="u-gs">{{gs || 0}}</b>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "PlayerBasic",
    props: ["data", "role","gs"],
    components: {},
    data: function () {
        return {};
    },
    computed: {
        mount_id: function () {
            return this.data && this.data.Kungfu.KungfuID;
        },
        level : function (){
            return this.data && this.data.Person.level
        }
    },
    methods: {},
    filters: {
        showMountIcon: function (val) {
            return __imgPath + "image/xf/" + val + ".png";
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
@import "../assets/css/basic.less";
</style>