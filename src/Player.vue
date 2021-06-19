<template>
  <div class="w-player" v-loading="loading">
    <div class="w-player-box" v-if="data">
      <!-- 基本信息 -->
      <Basic :data="data" />

      <!-- 装备信息 -->
      <div class="w-player-primary">
        <!-- 装备预览 -->
        <Equip :data="equip_data" :styleImg="true" />

        <!-- 面板数据 -->
        <Overview :data="overview_data" />
      </div>

      <!-- 其它信息 -->
      <Talent :data="talent_data" />
    </div>
  </div>
</template>

<script>
import serverzones from '@jx3box/jx3box-data/data/server/server_zone.json'
import { $node } from '@jx3box/jx3box-common/js/https'
import Basic from './components/basic.vue'
import Equip from './components/equip.vue'
import Overview from './components/overview.vue'
import Talent from './components/talent.vue'
import role from '@/assets/data/role.json'
export default {
  name: 'Player',
  props: ['playerId', 'server'],
  components: {},
  data: function() {
    return {
      data: '',
      loading: false,
    }
  },
  computed: {
    player_id: function() {
      return this.playerId
    },
    player_server: function() {
      return this.server
    },
    player_zone: function() {
      return serverzones[this.server] || ''
    },
    equip_data: function() {
      return (this.data && this.data['Equips']) || ''
    },
    overview_data: function() {
      let list = this.data['Kungfu']
      list = this.sortObj(list)
      for (const i in list) {
        delete list.Level
      }
      let data = { ...list, ...this.data['Person'] }
      return data
    },
    talent_data: function() {
      return this.data['Person'] || ''
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
    sortObj(obj) {
      var arr = []
      for (var i in obj) {
        arr.push([obj[i], i])
      }
      arr.reverse()
      var len = arr.length
      var obj = {}
      for (var i = 0; i < len; i++) {
        obj[arr[i][1]] = arr[i][0]
      }
      return obj
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
    Basic,
    Equip,
    Overview,
    Talent,
  },
}
</script>

<style scoped lang="less">
@import './assets/css/player.less';
</style>
