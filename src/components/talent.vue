<template>
    <div class="w-player-talent">
        <!-- 角色奇穴 -->

        <!-- 添加心法被动 -->
        
        <slot></slot>
    </div>
</template>

<script>
export default {
   name : 'PlayerTalent',
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
    @import '../assets/css/talent.less';
</style>