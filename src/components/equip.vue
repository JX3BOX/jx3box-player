<template>
  <div class="m-user-equip">
    <div class="m-box">
      <div class="m-item" v-for="item in data" :key="item.UcPos">
        <el-popover :placement="item.UcPos | placement" trigger="hover">
          <div class="m-item-box">
            <!-- 装备名|等级|门派 -->
            <div class="u-line u-name">
              <span class="name">{{ item.Name }}</span>
              <span>{{ item.Level }}级</span>
              <span>门派：{{ item.BelongSchool }}</span>
            </div>
            <!-- 装本基本属性 -->
            <div class=" u-line u-info">
              <span v-for="c in item.ModifyType" :key="c.Desc">{{ c.Attrib.GeneratedMagic }}</span>
            </div>
            <!-- 装备锻造附魔 -->
            <div class="u-line u-chant" v-if="item.WPermanentEnchant">
              <span>{{ item.WPermanentEnchant.Name }}</span>
              <span v-for="c in item.WPermanentEnchant.Attributes" :key="c.Desc">
                {{ c.Attrib.GeneratedMagic }}
              </span>
            </div>
            <!-- 装备大附魔 -->
            <div class="u-line" v-if="item.WTemporaryEnchant">
              <span>{{ item.WTemporaryEnchant.Name }}</span>
            </div>
            <!-- 石头镶嵌 -->
            <div class="u-line u-stone" v-if="item.FiveStone">
              <span v-for="c in item.FiveStone" :key="c.Desc"> <img class="u-img" v-if="c.Icon" :src="c.Icon.FileName" alt="" />{{ c.Attrib.GeneratedMagic }}</span>
            </div>
            <!-- 五彩石 -->
            <div class="u-color" v-if="item.ColorStone">
              <img :src="item.ColorStone.Icon.FileName" alt="" />
              <div class="u-line">
                <span class="name">{{item.ColorStone.Name}}</span>
                <span v-for="c in item.ColorStone.Attributes" :key="c.Desc">{{ c.Attrib.GeneratedMagic }}</span>
              </div>
            </div>
            <!-- 装备品级 -->
            <span>品级:{{ item.Quality }}</span>
          </div>
          <div slot="reference" :class="`equip${item.UcPos}`" class="m-img">
            <img class="u-img" :src="item.Icon.FileName" alt="" />
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Equip',
  props: ['data'],
  data: function() {
    return {}
  },
  computed: {},
  filters: {
    placement: function(val) {
      if (val == '0' || val == '1' || val == '2') {
        return 'top'
      } else if (val == '8' || val == '4' || val == '3') {
        return 'right'
      } else {
        return 'left'
      }
    },
  },
  methods: {},
  created: function() {
    console.log(this.data, 'equip')
  },
}
</script>
<style scoped lang="less">
@import '../assets/css/components/equip.less';
</style>
