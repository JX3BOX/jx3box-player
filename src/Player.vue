<template>
    <div class="w-player" v-loading="loading">
        <div class="w-player-box" v-if="data">
            <div class="w-player-attrs">
                <div class="u-attr">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import serverzones from "@jx3box/jx3box-data/data/server/server_zone.json";
import { $node } from "@jx3box/jx3box-common/js/https";
export default {
    name: "Player",
    props: ["playerId", "server"],
    components: {},
    data: function () {
        return {
            player_id: this.playerId,
            player_server: this.server,
            data: "",
            loading: false,
        };
    },
    computed: {
        player_zone: function () {
            return serverzones[this.server] || "";
        },
        attrs : function (){
            return this.data['Person']
        }
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
};
</script>