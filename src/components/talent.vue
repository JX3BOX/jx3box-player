<template>
    <div class="w-player-talent">
        <h2 class="u-title">
            <i class="el-icon-discount"></i> 角色奇穴
        </h2>
        <div class="u-talent" v-if="list.length > 0">
            <div class="u-talent-item" v-for="item in this.list" :key="item.skill_id">
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
            </div>
        </div>
        <div class="u-null" v-else>暂无奇穴信息</div>
    </div>
</template>

<script>
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
    methods: {},
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
