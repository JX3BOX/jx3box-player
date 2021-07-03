<template>
    <div class="w-player" v-loading="loading" :class="{'darkMode':darkMode}">
        <div class="w-player-box" v-if="data">
            <!-- 基本信息 -->
            <Basic :data="data" :role="role" :gs="gs" />

            <!-- 装备信息 -->
            <div class="w-player-primary" :class="{isFlex : showPosition}">
                <!-- 面板数据 -->
                <Attrs :data="data" />

                <!-- 装备预览 -->
                <Equip
                    :data="equip_data"
                    :showEquipName="showEquipName"
                    :showPosition="showPosition"
                    :mount="mount_pinyin"
                    :body="body_id"
                />
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
import Attrs from "./components/attrs.vue";
import Talent from "./components/talent.vue";
import rolename from "@/assets/data/role.json";
import { getGS } from "@/service/gs.js";
export default {
    name: "Player",
    props: [
        "playerId",
        "server",
        "role",
        "darkMode",
        "showPosition",
        "showEquipName",
    ],
    data: function () {
        return {
            data: "",
            loading: false,
            rolename,
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
        gs: function () {
            return getGS(this.equip_data, this.mount_id);
        },
        mount_id : function (){
            return ~~this.data?.Kungfu?.KungfuID
        },
        mount_pinyin: function () {
            const name = this.roleName(this.roleName(this.data.Kungfu.Name));
            return this.data && this.data.Kungfu && name;
        },
        body_id: function () {
            return this.data && this.data.Person && this.data.Person.body;
        },
    },
    methods: {
        roleName: function (val) {
            for (const key in this.rolename) {
                if (key == val) {
                    return this.rolename[key];
                }
            }
        },
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
        Attrs,
        Talent,
    },
};
</script>

<style scoped lang="less">
@import "./assets/css/player.less";
</style>
