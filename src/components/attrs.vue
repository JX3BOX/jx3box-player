<template>
    <div class="w-player-attrs">
        <h2 class="u-title">
            <i class="el-icon-stopwatch"></i> 角色属性
        </h2>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,i) in results" :key="i">
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
import {
    getAttack,
    getPrimaryAttribute, 
    getCritRate, 
    getCritEffectRate, 
    getHaste, 
    getHasteRate, 
    getOvercome,
    getOvercomeRate,
    getStrain,
    getStrainRate,
    getSurplus,
    getHealth,
    getPhysicsSheild,
    getPhysicsSheildRate,
    getMagicSheild,
    getMagicSheildRate,
    getParryBaseRate,
    getParryValue,
    getToughnessRate,
    getHuajingRate
} from "@/service/attr.js";
export default {
    name: "Attrs",
    props: ["data"],
    data: function () {
        return {
            results: [],
            displayNames: [
                "atVitality",
                "atSpiritBase",
                "atStrengthBase",
                "atAgilityBase",
                "atSpunkBase"
            ],
            enchants
        };
    },
    computed: {
    },
    methods: {
        init: function() {
            const { results, displayNames } = this

            displayNames.forEach(key => {
                let val
                if (key === 'atVitality') {
                    val = getPrimaryAttribute(this.data.Equips, 'atVitalityBase');
                } else {
                    val = getPrimaryAttribute(this.data.Equips, key);
                }
                results.push({ key, val })
            })
            
            const physicsAttack = getAttack([this.data.Equips, this.data.Kungfu])

            results.push({ key: 'atPhysicsAttackPowerBase', val: physicsAttack });

            const critRate = getCritRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: 'crit', val: critRate });

            const critEffect = getCritEffectRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: 'critEffect', val: critEffect });

            const haste = getHaste(this.data.Equips, this.data.Kungfu);

            results.push({ key: 'atHasteBase', val: haste });

            const hasteRate = getHasteRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: 'atHasteBasePercentAdd', val: hasteRate });

            const overcome = getOvercome(this.data.Equips, this.data.Kungfu);

            results.push({ key: 'overcome', val: overcome });

            const overcomeRate = getOvercomeRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: '破防', val: overcomeRate })

            const strain = getStrain(this.data.Equips, this.data.Kungfu);

            results.push({ key: 'atStrainBase', val: strain })
            
            const strainRate = getStrainRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: '无双', val: strainRate })
            
            const surplus = getSurplus(this.data.Equips, this.data.Kungfu);

            results.push({ key: 'atSurplusValueBase', val: surplus });
            
            const health = getHealth(this.data.Equips, this.data.Kungfu);

            results.push({ key: '气血', val: health });
            
            const physicsShield = getPhysicsSheild(this.data.Equips, this.data.Kungfu);

            results.push({ key: '外防等级', val: physicsShield });
            
            const physicsShieldRate = getPhysicsSheildRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: '外功防御', val: physicsShieldRate });
            
            const magicSheild = getMagicSheild(this.data.Equips, this.data.Kungfu);

            results.push({ key: '内防等级', val: magicSheild });
            
            const magicShieldRate = getMagicSheildRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: '内功防御', val: magicShieldRate });

            const parryBaseRate = getParryBaseRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: '招架', val: parryBaseRate });

            const parryValue = getParryValue(this.data.Equips, this.data.Kungfu);

            results.push({ key: '拆招', val: parryValue });

            const toughnessRate = getToughnessRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: '御劲', val: toughnessRate });

            const huajing = getHuajingRate(this.data.Equips, this.data.Kungfu);

            results.push({ key: '化劲', val: huajing });
        },
        getEnchants: function() {
            axios.get(__dataPath + 'data/bps/_enchant.json').then(res => {
                this.enchants = res.data
            })
        }
    },
    filters: {
        showAttrName: function (key) {
            if (attrMap[key]) {
                return attrMap[key];
            }
            return key;
        },
    },
    created: function () {
        this.init()
        // this.getEnchants()
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/attrs.less";
</style>