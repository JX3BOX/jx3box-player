<template>
    <div class="w-player-talent">
        <h2 class="u-title">
            <img class="u-icon" svg-inline src="../assets/img/talent.svg" /> 角色奇穴
            <a href="/app/talent/" class="u-link" target="_blank">
                奇穴模拟器
                <i class="el-icon-arrow-right"></i>
            </a>
        </h2>
        <div class="u-talent" v-if="list.length > 0">
            <a
                class="u-talent-item"
                v-for="item in this.list"
                :key="item.skill_id"
                :href="getTalentLink(item)"
                target="_blank"
            >
                <el-popover placement="top" trigger="hover" popper-class="w-player-talent-pop">
                    <div class="u-talent-pop">
                        <span class="u-talent-title">{{ item.name }}</span>
                        <span class="u-talent-desc">{{ item.desc }}</span>
                    </div>
                    <div class="u-talent-content" slot="reference">
                        <span class="u-talent-icon">
                            <img :src="item.icon.FileName" :alt="item.name" />
                        </span>
                        <span class="u-talent-name">{{ item.name }}</span>
                    </div>
                </el-popover>
            </a>
        </div>
        <div class="u-null" v-else>暂无奇穴信息</div>
    </div>
</template>

<script>
import { getLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "PlayerTalent",
    props: ["data"],
    components: {},
    data: function () {
        return {
            list: [],
        };
    },
    computed: {},
    methods: {
        getTalentLink: function (item) {
            return getLink("skill", item.skill_id, item.level);
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.list = this.data.Person.qixueList;
        this.list.sort(function (a, b) {
            return a.level - b.level;
        });
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/talent.less";
</style>
