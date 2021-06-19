<template>
  <div class="m-user-panel">
    <div v-for="(item, key) in datas" :key="key">
      <div v-if="key == 'Attrib'">
        <span class="m-line" v-for="(c, i) in item" :key="i">
          <span>{{ i | infoname }}</span> <span>{{ c }}</span>
        </span>
      </div>
      <div class="m-line" v-else>
        <span>{{ key | infoname }}</span>
        <span v-if="key == 'KungfuID' || key == 'Name'">{{ item | rolename }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import info from '@/assets/data/attr.json'
import role from '@/assets/data/role.json'

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
      if (id == 'Name') {
        return '门派'
      }
      if (info[id]) {
        return info[id]
      }
      return id
    },
    rolename: function(id) {
      if (role[id]) {
        return role[id]
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
    // console.log(this.datas)
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
