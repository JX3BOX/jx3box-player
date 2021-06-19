<template>
  <div class="w-player-talent">
    <!-- 角色奇穴 -->
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
    this.list = this.data.qixueList
  },
  mounted: function() {
  
  },
}
</script>

<style scoped lang="less">
@import '../assets/css/talent.less';
</style>
