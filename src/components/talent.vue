<template>
  <div class="w-player-talent">
    <h2 class="u-title"><i class="el-icon-discount"></i> 角色奇穴</h2>
    <!-- TODO:奇穴模块写在这里 -->
    <div class="m-talent" v-if="list.length > 0">
      <div class="m-box" v-for="item in this.list" :key="item.skill_id">
        <el-popover placement="top" trigger="hover">
          <div class="u-txt">
            <span class="name">{{ item.name }}</span>
            <span>{{ item.desc }}</span>
          </div>
          <div class="u-box" slot="reference">
            <span class="u-img"> <img :src="item.icon.FileName" :alt="item.name"/></span>
            <span>{{ item.name }}</span>
          </div>
        </el-popover>
      </div>
    </div>
    <div v-else>暂无奇穴信息</div>
  </div>
</template>

<script>
export default {
  name: 'PlayerTalent',
  props: ['data'],
  components: {},
  data: function() {
    return {
      list: [],
    }
  },
  computed: {},
  methods: {},
  filters: {},
  created: function() {
    this.list = this.data.Person.qixueList
    this.list.sort(function(a, b) {
      return a.level - b.level
    })
  },
  mounted: function() {},
}
</script>

<style scoped lang="less">
@import '../assets/css/talent.less';
</style>
