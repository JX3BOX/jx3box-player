<template>
    <div class="w-player-attrs">
        <h2 class="u-title">
            <i class="el-icon-stopwatch"></i> 角色属性
        </h2>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,i) in result" :key="i">
                <div class="u-item">
                    <span class="u-key">{{ item.key | showAttrName }}</span>
                    <span class="u-val">{{ item.val }}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import attrMap from "@/assets/data/attr.json";
export default {
    name: "Attrs",
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
                {
                    key: "atMagicCriticalStrike",
                    val: "16.11%",
                },
                {
                    key: "atMagicCriticalStrike",
                    val: "16.11%",
                },
                {
                    key: "atMagicCriticalStrike",
                    val: "16.11%",
                },
                {
                    key: "atMagicCriticalStrike",
                    val: "16.11%",
                },
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
@import "../assets/css/attrs.less";
</style>