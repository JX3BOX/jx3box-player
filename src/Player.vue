<template>
  <div class="w-player" v-loading="loading">
    <div class="w-player-box" v-if="data">
      <!-- 角色装备 -->
      <div class="m-player-equip">
        <!-- <m-equip :data="equip" /> -->
        <m-equip :data="equip" :styleImg="true" />
      </div>
      <div class="m-player-info">
        <div class="m-intro">
          <!-- 角色简介 -->
          <m-intro :data="intro" />
        </div>
        <div class="m-panel">
          <!-- 角色面板 -->
          <m-panel :data="panel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serverzones from '@jx3box/jx3box-data/data/server/server_zone.json'
import { $node } from '@jx3box/jx3box-common/js/https'
import Intro from './components/intro.vue'
import Panel from './components/panel.vue'
import Equip from './components/equip.vue'
export default {
  name: 'Player',
  props: ['playerId', 'server'],
  components: {},
  data: function() {
    return {
      player_id: this.playerId,
      player_server: this.server,
      data: '',
      loading: false,
    }
  },
  computed: {
    player_zone: function() {
      return serverzones[this.server] || ''
    },
    panel: function() {
      return this.data['Person']
    },
    equip: function() {
      return this.data['Equips']
    },
    intro: function() {
      return this.data['Kungfu']
    },
  },
  methods: {
    loadData: function() {
      this.loading = true
      $node()
        .get(`/team/role/${this.player_id}`, {
          params: {
            server: this.player_server,
            zone: this.player_zone,
          },
        })
        .then((res) => {
          this.data = res.data && res.data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  watch: {
    playerId: {
      immediate: true,
      handler: function(val) {
        if (val) {
          this.loadData()
        }
      },
    },
  },
  filters: {},
  created: function() {},
  mounted: function() {},
  components: {
    'm-intro': Intro,
    'm-panel': Panel,
    'm-equip': Equip,
  },
}
</script>

<style scoped lang="less">
.w-player-box {
  max-width: 1080px;
  display: flex;
  margin: 0 auto;
  border: 1px solid #ddd;
  .m-player-equip {
    padding: 10px;
  }
  .m-player-info {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .m-intro {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
