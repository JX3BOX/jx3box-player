<template>
    <div class="w-player-attrs">
        <h2 class="u-title">
            <i class="el-icon-stopwatch"></i> 角色属性
            <div class="u-filter">
                <el-popover :width="450">
                    <div class="u-filter-content">
                        <el-checkbox-group v-model="showAttrs">
                            <el-row>
                                <el-col :span="6" v-for="(key, val) in attrMaps" :key="key">
                                    <el-checkbox :label="val">{{ key }}</el-checkbox>
                                </el-col>
                            </el-row>
                        </el-checkbox-group>
                    </div>
                    <span slot="reference">过滤属性</span>
                </el-popover>
            </div>
        </h2>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,i) in results" :key="i">
                <div class="u-item" v-if="showAttrs.includes(item.key)">
                    <span class="u-key">{{ item.key | showAttrName }}</span>
                    <span class="u-val">{{ item.val }}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { attrMaps, xfAttr } from "@/assets/data/mount_attrs";
import { __dataPath } from '@jx3box/jx3box-common/data/jx3box.json'
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
            roleAttr: null,
            xfAttr,
            attrMaps,
            showAttrs: []
        };
    },
    computed: {
        xfId() {
            return this.data.Kungfu.KungfuID
        }
    },
    methods: {
        init: function() {
            this.roleAttr = new RoleAttribute(this.data.Equips, this.data.Kungfu, this.data.Person, this.data.Set);
            const primaryAttr = XF_FACTOR[this.xfId]['primaryAttr'];

            this.results = [
                { key: 'baseAttack', val: this.roleAttr.getBaseAttack() },
                { key: 'attack', val: this.roleAttr.getAttack() },
                { key: 'heal', val: this.roleAttr.getHeal() },
                { key: 'weaponDamage', val: this.roleAttr.getWeaponDamage() },
                { key: 'surplus', val: this.roleAttr.getSurplus() },
                { key: 'haste', val: `${this.roleAttr.getHasteRate()}(${this.roleAttr.getHaste()})` },
                { key: XF_FACTOR[this.data.Kungfu.KungfuID]['primaryAttr'], val: this.roleAttr.getTotalAttr(primaryAttr) },
                { key: 'crit', val: `${this.roleAttr.getCritRate()}(${this.roleAttr.getCrit()})` },
                { key: 'critEffect', val: this.roleAttr.getCritEffectRate() },
                { key: 'overcome', val: `${this.roleAttr.getOvercomeRate()}(${this.roleAttr.getOvercome()})` },
                { key: 'strain', val: `${this.roleAttr.getStrainRate()}(${this.roleAttr.getStrain()})` },
                { key: 'health', val: this.roleAttr.getHealth() },
                { key: 'physicsShield', val: this.roleAttr.getPhysicsShieldRate() },
                { key: 'magicShield', val: this.roleAttr.getMagicShieldRate() },
                { key: 'dodge', val: `${this.roleAttr.getDodgeRate()}(${this.roleAttr.getDodge()})` },
                { key: 'toughness', val: this.roleAttr.getToughnessRate() },
                { key: 'huajing', val: this.roleAttr.getHuajingRate() },
                { key: 'parryBase', val: this.roleAttr.getParryBaseRate() },
                { key: 'parryValue', val: this.roleAttr.getParryValue() },
            ];

            this.showAttrs = this.xfAttr[this.xfId];
        },
    },
    filters: {
        showAttrName: function (key) {
            if (attrMaps[key]) {
                return attrMaps[key];
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