<template>
    <div class="w-player-equip" :class="showPosition">
        <div class="w-player-equip-item-container" v-for="item in equips" :key="item.UcPos">
            <el-popover :placement="item.UcPos | placement(equipUserImg)" trigger="hover">
                <div class="w-player-equip-item-detail">
                    <!-- 装备名|等级|门派 -->
                    <div class="u-line u-name">
                        <span class="name">{{ item.Name }}</span>
                        <span>精炼：{{ item.StrengthLevel }}/{{ item.MaxStrengthLevel }}</span>
                    </div>
                    <!-- 装本基本属性 -->
                    <div class="u-line">
                        <span
                            v-if="item.UcPos == '0'"
                        >{{ item.Base1Type.Attrib.GeneratedBase }}~ {{ item.Base1Type.Base1Max | BaseMax(item.Base2Type.Base2Max) }}</span>
                        <span v-if="item.UcPos !== '0'">{{ item.Base1Type.Attrib.GeneratedBase }}</span>
                        <span>{{ item.Base2Type.Attrib.GeneratedBase }}</span>
                        <span>{{ item.Base3Type.Attrib.GeneratedBase }}</span>
                    </div>
                    <div class="u-line u-info">
                        <span v-for="c in item.ModifyType" :key="c.Desc">
                            <span v-if="c.Attrib.GeneratedMagic">
                                {{ c.Attrib.GeneratedMagic }}
                                <b
                                    v-if="item.StrengthLevel > 0"
                                >( + {{ c.Param1Max | refine(item.StrengthLevel) }})</b>
                            </span>
                            <span class="desc" v-else>{{ c.Attrib.Desc }}</span>
                        </span>
                    </div>
                    <div class="u-line" v-if="item.Desc !== '' && item.UcPos == '9'">{{ item.Desc }}</div>
                    <!-- 装备锻造附魔 -->
                    <div class="u-line u-chant" v-if="item.WPermanentEnchant">
                        <!-- <span>{{ item.WPermanentEnchant.Name }}</span> -->
                        <span
                            v-for="c in item.WPermanentEnchant.Attributes"
                            :key="c.Desc"
                        >{{ c.Attrib.GeneratedMagic }}</span>
                    </div>
                    <!-- 装备大附魔 -->
                    <div class="u-line u-enchant" v-if="item.WTemporaryEnchant">
                        <span class="name">{{ item.WTemporaryEnchant.Name }}</span>
                        <span>{{ item.WTemporaryEnchant.ID | enchant }}</span>
                    </div>
                    <!-- 石头镶嵌 -->
                    <div class="u-line u-stone" v-if="item.FiveStone">
                        <span v-for="c in item.FiveStone" :key="c.Desc">
                            <span v-if="c.Level !== '0'">
                                <img class="u-img" v-if="c.Icon" :src="c.Icon.FileName" alt />
                                {{ c.Attrib.GeneratedMagic }}
                            </span>
                        </span>
                    </div>
                    <!-- 五彩石 -->
                    <div class="u-color" v-if="item.ColorStone">
                        <img :src="item.ColorStone.Icon.FileName" alt />
                        <div class="u-line">
                            <!-- <span class="name">{{ item.ColorStone.Name }}</span> -->
                            <span
                                v-for="c in item.ColorStone.Attributes"
                                :key="c.Desc"
                            >{{ c.Attrib.GeneratedMagic }}</span>
                        </div>
                    </div>
                    <!-- 套装介绍 -->
                    <div class="u-line u-set" v-if="item.Set">
                        <span
                            v-for="c in item.Set"
                            :key="c.Desc"
                            :class="setnum(item.SetList, setlist, c.SetNum)"
                        >
                            <span>[{{ c.SetNum }}] {{ c.Attrib.Desc || c.Attrib.GeneratedMagic }}</span>
                        </span>

                        <span class="u-txt">已装备：</span>
                        <span
                            v-for="(c, i) in item.SetList"
                            :key="i"
                            :class="c | setwquip(setlist)"
                        >{{ c }}</span>
                    </div>
                    <div class="u-line" v-if="item.Desc !== ''">{{ item.Desc }}</div>
                    <!-- 装备品级 -->
                    <div class="u-line u-level">
                        <span class="name">品级:{{ item.Quality }}</span>
                        <span>需要等级{{ item.Level }}级</span>
                        <span>适用门派：{{ item.BelongForce }}</span>
                    </div>
                </div>
                <div
                    class="w-player-equip-item-icon"
                    slot="reference"
                    :class="`equip${item.UcPos}`"
                >
                    <i>
                        <img class="u-img" :src="item.Icon.FileName" :alt="item.Name" />
                    </i>
                    <span class="u-name" v-if="showEquipName">{{ item.Name }}</span>
                </div>
            </el-popover>
        </div>
    </div>
</template>
<script>
import enchant from "@jx3box/jx3box-data/data/bps/enchant.json";
export default {
    name: "Equip",
    props: ["data", "showEquipName","showPosition"],
    data: function () {
        return {
            setlist: [],
        };
    },
    computed: {
        equips: function () {
            return this.data;
        },
    },
    filters: {
        setwquip: function (id, setlist) {
            for (let i = 0; i < setlist.length; i++) {
                if (id == setlist[i]) {
                    return "setwquip";
                }
            }
            return "";
        },
        enchant: function (id) {
            return enchant[id];
        },
        placement: function (val, style) {
            if (style !== "") {
                if (val == "0" || val == "1" || val == "2") {
                    return "top";
                } else if (val == "8" || val == "4" || val == "3") {
                    return "right";
                } else {
                    return "left";
                }
            } else {
                return "top-start";
            }
        },
        BaseMax: function (val1, val2) {
            return ~~val1 + ~~val2;
        },
        refine: function (val, level) {
            switch (level) {
                case "1":
                    return parseInt(val * 0.005);
                case "2":
                    return parseInt(val * 0.013);
                case "3":
                    return parseInt(val * 0.024);
                case "4":
                    return parseInt(val * 0.038);
                case "5":
                    return parseInt(val * 0.055);
                case "6":
                    return parseInt(val * 0.075);
                case "7":
                    return parseInt(val * 0.098);
                case "8":
                    return parseInt(val * 0.124);
            }
        },
        setstone: function (val, level) {
            switch (level) {
                case "1":
                    return val * 0.15;
                case "2":
                    return val * 0.3;
                case "3":
                    return val * 0.45;
                case "4":
                    return val * 0.6;
                case "5":
                    return val * 0.75;
                case "6":
                    return val * 0.9;
                case "7":
                    return val * 1.2;
                case "8":
                    return val * 1.55;
            }
        },

        quality: function (val) {
            if (val > "5000") {
                return "eq";
            } else {
                return "";
            }
        },
    },
    methods: {
        getsetlist: function () {
            let list = [];
            for (let i = 0; i < this.data.length; i++) {
                list.push(this.data[i].Name);
            }
            this.setlist = list.filter((item, index) => {
                return list.indexOf(item) === index;
            });
        },
        setnum: function (list, setlist, nums) {
            nums = ~~nums;
            let num = 0;
            for (let i = 0; i < setlist.length; i++) {
                if (list.indexOf(setlist[i]) !== -1) {
                    num += 1;
                }
            }
            if (num >= nums) {
                return "setwquip";
            }
            return "";
        },
    },
    created: function () {
        if (this.styleImg) {
            this.equipUserImg = "equipUserImg";
        }
        this.getsetlist();
    },
};
</script>
<style scoped lang="less">
@import "../assets/css/equip.less";
</style>
