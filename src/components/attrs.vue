<template>
    <div class="w-player-attrs">
        <h2 class="u-title">
            <i class="el-icon-stopwatch"></i> 角色属性
        </h2>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,i) in result" :key="i">
                <div class="u-item">
                    <span class="u-key">{{ item.key | showAttrName }}</span>
                    <span class="u-val">{{ item.val }}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import attrMap from "@/assets/data/attr.json";
import { __dataPath } from '@jx3box/jx3box-common/data/jx3box.json'
import axios from 'axios';
import enchants from '@/assets/data/enchants.json'
import RoleAttribute from '@/service/attr.js';
export default {
    name: "Attrs",
    props: ["data"],
    data: function () {
        return {
            results: [],
            displayNames: [
                "atVitalityBase",
                "atSpiritBase",
                "atStrengthBase",
                "atAgilityBase",
                "atSpunkBase"
            ],
            enchants,
            roleAttr: null
        };
    },
    computed: {
    },
    methods: {
        init: function() {
            this.roleAttr = new RoleAttribute(this.data.Equips, this.data.Kungfu, this.data.Person);
            const { results, displayNames } = this

            displayNames.forEach(key => {
                results.push({ key, val: this.roleAttr.getTotalAttr(key) })
            })
            
            // const physicsAttack = getAttack([this.data.Equips, this.data.Kungfu])
            const physicsAttack = this.roleAttr.getAttack()

            results.push({ key: 'atPhysicsAttackPowerBase', val: physicsAttack });

            // const critRate = getCritRate(this.data.Equips, this.data.Kungfu);
            const critRate = this.roleAttr.getCritRate();

            results.push({ key: '会心', val: critRate });

            const critEffect = this.roleAttr.getCritEffectRate();

            results.push({ key: '会效', val: critEffect });

            const haste = this.roleAttr.getHaste();

            results.push({ key: 'atHasteBase', val: haste });

            const hasteRate = this.roleAttr.getHasteRate();

            results.push({ key: 'atHasteBasePercentAdd', val: hasteRate });

            const overcome = this.roleAttr.getOvercome();

            results.push({ key: '破防等级', val: overcome });

            const overcomeRate = this.roleAttr.getOvercomeRate();

            results.push({ key: '破防', val: overcomeRate })

            const strain = this.roleAttr.getStrain();

            results.push({ key: '无双等级', val: strain })
            
            const strainRate = this.roleAttr.getStrainRate();

            results.push({ key: 'atStrainBase', val: strainRate })
            
            const surplus = this.roleAttr.getSurplus();

            results.push({ key: 'atSurplusValueBase', val: surplus });
            
            const health = this.roleAttr.getHealth();

            results.push({ key: '气血', val: health });
            
            const physicsShield = this.roleAttr.getPhysicsShield();

            results.push({ key: '外防等级', val: physicsShield });
            
            const physicsShieldRate = this.roleAttr.getPhysicsShieldRate();

            results.push({ key: '外功防御', val: physicsShieldRate });
            
            const magicShield = this.roleAttr.getMagicShield();

            results.push({ key: '内防等级', val: magicShield });
            
            const magicShieldRate = this.roleAttr.getMagicShieldRate();

            results.push({ key: '内功防御', val: magicShieldRate });

            const parryBaseRate = this.roleAttr.getParryBaseRate();

            results.push({ key: '招架', val: parryBaseRate });

            const parryValue = this.roleAttr.getParryValue();

            results.push({ key: '拆招', val: parryValue });

            const toughnessRate = this.roleAttr.getToughnessRate();

            results.push({ key: '御劲', val: toughnessRate });

            const huajing = this.roleAttr.getHuajingRate();

            results.push({ key: '化劲', val: huajing });
        },
    },
    methods: {},
    filters: {
        showAttrName: function (key) {
            if (attrMap[key]) {
                return attrMap[key];
            }
            return "";
        },
    },
    created: function () {},
};
</script>

<style scoped lang="less">
@import "../assets/css/attrs.less";
</style>