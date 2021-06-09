<template>
  <div class="m-user-panel">
    <div class="m-line" v-for="(item, key) in datas" :key="key">
      <span>{{ key | infoname }}</span>
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
import info from '@/components/json/info.json'
export default {
  name: 'Panel',
  props: ['data'],
  data: function() {
    return {
      qixue: [],
    }
  },
  computed: {},
  methods: {},
  filters: {
    infoname: function(id) {
      if (info[id]) {
        return info[id]
      }
      return id
    },
  },
  created: function() {
    this.qixue = this.data.qiXueId
    this.datas = this.data
    for (const i in this.datas) {
      delete this.data.qixueList
      delete this.data.qiXueId
    }
    console.log(this.datas)
    // console.log(this.data,'panel')
  },
}
</script>

<style scoped lang="less">
.m-user-panel {
  padding: 10px;
  .m-line {
    display: flex;
    justify-content: space-between;
    .mb(10px);
  }
}
</style>
