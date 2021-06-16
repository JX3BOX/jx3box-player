<template>
    <div class="w-player-basic">
        <!-- 角色基本情况：心法、装分、等级等 -->

        <!-- 添加心法被动 -->
        <slot></slot>
    </div>
</template>

<script>
export default {
   name : 'PlayerBasic',
   props:[],
   components : {},
   data : function(){
       return {
           
       }
   },
   computed:{},
   methods:{},
   filters:{},
   created:function(){},
   mounted:function(){},
}
</script>

<style scoped lang="less">
    @import '../assets/css/basic.less';
</style>