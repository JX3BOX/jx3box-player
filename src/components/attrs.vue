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
// import enchants from '@/assets/data/enchants.json'
import RoleAttribute from '@/service/attr.js';
import { XF_FACTOR } from '@/assets/data/role_attr'
export default {
    name: "Attrs",
    props: ["data"],
    data: function () {
        return {
            results: [],
            displayNames: [
                // "atVitalityBase",
            ],
            roleAttr: null
        };
    },
    computed: {
    },
    methods: {
        init: function() {
            this.roleAttr = new RoleAttribute(this.data.Equips, this.data.Kungfu, this.data.Person, this.data.Set);
            const primaryAttr = XF_FACTOR[this.data.Kungfu.KungfuID]['primaryAttr'];

            this.results = [
                { key: XF_FACTOR[this.data.Kungfu.KungfuID]['primaryAttr'], val: this.roleAttr.getTotalAttr(primaryAttr) },
                { key: '攻击', val: `${this.roleAttr.getAttack()}(${ this.roleAttr.getBaseAttack()})` },
                { key: '会心', val: `${this.roleAttr.getCritRate()}(${this.roleAttr.getCrit()})` },
                { key: '会效', val: this.roleAttr.getCritEffectRate() },
                { key: 'atHasteBasePercentAdd', val: `${this.roleAttr.getHasteRate()}(${this.roleAttr.getHaste()})` },
                { key: '破防', val: `${this.roleAttr.getOvercomeRate()}(${this.roleAttr.getOvercome()})` },
                { key: '无双', val: `${this.roleAttr.getStrainRate()}(${this.roleAttr.getStrain()})` },
                { key: 'atSurplusValueBase', val: this.roleAttr.getSurplus() },
                { key: '气血', val: this.roleAttr.getHealth() },
                { key: '外功防御', val: this.roleAttr.getPhysicsShieldRate() },
                { key: '内功防御', val: this.roleAttr.getMagicShieldRate() },
                { key: '招架', val: this.roleAttr.getParryBaseRate() },
                { key: '拆招', val: this.roleAttr.getParryValue() },
                { key: '御劲', val: this.roleAttr.getToughnessRate() },
                { key: '化劲', val: this.roleAttr.getHuajingRate() },
                { key: '闪躲', val: `${this.roleAttr.getDodgeRate()}(${this.roleAttr.getDodge()})` },
                { key: '治疗量', val: this.roleAttr.getHeal() },
            ];
        },
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
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/attrs.less";
</style>