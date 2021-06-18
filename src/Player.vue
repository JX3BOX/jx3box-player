<template>
    <div class="w-player" v-loading="loading">
        <div class="w-player-box" v-if="data">
            <!-- 基本信息 -->
            <Basic :data="data" :role="role" />

            <!-- 装备信息 -->
            <div class="w-player-primary">
                <!-- 装备预览 -->
                <Equip :data="equip_data" :showEquipName="true" :showPosition="true"/>

                <!-- 面板数据 -->
                <Overview :data="data" />
            </div>

            <!-- 其它信息 -->
            <Talent :data="talent_data" />
        </div>
    </div>
</template>

<script>
import serverzones from "@jx3box/jx3box-data/data/server/server_zone.json";
import { $node } from "@jx3box/jx3box-common/js/https";
import Basic from "./components/basic.vue";
import Equip from "./components/equip.vue";
import Overview from "./components/overview.vue";
import Talent from "./components/talent.vue";
export default {
    name: "Player",
    props: ["playerId", "server", "role"],
    components: {},
    data: function () {
        return {
            data: "",
            loading: false,
        };
    },
    computed: {
        player_id: function () {
            return this.playerId;
        },
        player_server: function () {
            return this.server;
        },
        player_zone: function () {
            return serverzones[this.server] || "";
        },
        equip_data: function () {
            return (this.data && this.data["Equips"]) || "";
        },
        talent_data: function () {
            return this.data && this.data;
        },
    },
    methods: {
        loadData: function () {
            this.loading = true;
            $node()
                .get(`/team/role/${this.player_id}`, {
                    params: {
                        server: this.player_server,
                        zone: this.player_zone,
                    },
                })
                .then((res) => {
                    this.data = res.data && res.data.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    watch: {
        playerId: {
            immediate: true,
            handler: function (val) {
                if (val) {
                    this.loadData();
                }
            },
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
    components: {
        Basic,
        Equip,
        Overview,
        Talent,
    },
};
</script>

<style scoped lang="less">
@import "./assets/css/player.less";
</style>