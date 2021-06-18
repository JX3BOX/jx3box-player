<template>
    <div class="w-player-overview">
        <h2 class="u-title">角色属性</h2>
        <div class="u-item" v-for="(item,i) in result" :key="i">
            <span class="u-key">{{ item.key | showAttrName }}</span>
            <span class="u-val">{{ item.val }}</span>
        </div>
    </div>
</template>
<script>
import attrMap from "@/assets/data/attr.json";
export default {
    name: "Overview",
    props: ["data"],
    data: function () {
        return {};
    },
    computed: {
        result: function () {
            // TODO:根据计算方案对data原始数据进行加工
            return [
                {
                    key: "atMagicCriticalStrike",
                    val: "16.11%",
                },
            ];
        },
    },
    methods: {},
    filters: {
        showAttrName: function (key) {
            if (attrMap[key]) {
                return attrMap[key];
            }
            return "";
        },
    },
    created: function () {},
};
</script>

<style scoped lang="less">
@import "../assets/css/overview.less";
</style>