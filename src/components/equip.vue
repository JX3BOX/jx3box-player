<template>
    <div class="w-player-equip" :class="{ showPosition: showPosition }">
        <i class="w-player-body" v-if="showPosition">
            <img :src="showBodyPic(mount, body)" />
        </i>
        <a
            class="w-player-equip-item"
            :class="`equip${item.UcPos}`"
            v-for="item in equips"
            :key="item.UcPos"
            :href="getEquipLink(item)"
            target="_blank"
        >
            <el-popover trigger="hover" :placement="item.UcPos | placement(showPosition)">
                <div class="w-player-equip-item-detail">
                    <!-- 装备名|等级|门派 -->
                    <div class="u-line u-title">
                        <span
                            class="u-name"
                            :style="{ color: showFontColor(item.Color) }"
                        >{{ item.Name }}</span>
                        <span class="u-star">
                            <span v-for="i in ~~item.StrengthLevel" :key="i">★</span>
                        </span>
                        <span
                            class="u-strength"
                        >精炼：{{ item.StrengthLevel }}/{{ item.MaxStrengthLevel }}</span>
                    </div>
                    <!-- 装本基本属性外防内防 -->
                    <div class="u-line u-base">
                        <span
                            v-if="!item.UcPos"
                        >{{ item.Base1Type.Attrib.GeneratedBase }}~ {{ item.Base1Type.Base1Max | BaseMax(item.Base2Type.Base2Max) }}</span>
                        <span v-if="item.UcPos">{{ item.Base1Type.Attrib.GeneratedBase }}</span>
                        <span>{{ item.Base2Type.Attrib.GeneratedBase }}</span>
                        <span>{{ item.Base3Type.Attrib.GeneratedBase }}</span>
                    </div>
                    <!-- 主属性根骨等 -->
                    <div class="u-line u-info">
                        <span v-for="c in item.ModifyType" :key="c.Desc">
                            <span v-if="c.Attrib.GeneratedMagic">
                                {{ c.Attrib.GeneratedMagic }}
                                <b
                                    v-if="item.StrengthLevel > 0"
                                >(+{{ c.Param1Max | refine(item.StrengthLevel) }})</b>
                            </span>
                            <!-- <span class="desc" v-else>{{ c.Attrib.Desc }}</span> -->
                        </span>
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
                    <div class="u-line u-stone u-superstone" v-if="item.ColorStone">
                        <img class="u-img" :src="item.ColorStone.Icon.FileName" />
                        <!-- <span class="name">{{ item.ColorStone.Name }}</span> -->
                        <div class="u-list">
                            <div
                                v-for="c in item.ColorStone.Attributes"
                                :key="c.Desc"
                            >{{ c.Attrib.GeneratedMagic }}</div>
                        </div>
                    </div>
                    <!-- 等级+耐久度 -->
                    <div class="u-line u-misc">
                        <span>需要等级{{ item.Level }}</span>
                        <span
                            v-if="~~item.MaxDurability"
                        >耐久度：{{ item.WDurability }}/{{ item.MaxDurability }}</span>
                    </div>
                    <!-- 小附魔 -->
                    <div class="u-line u-chant" v-if="item.WPermanentEnchant">
                        <!-- <span>{{ item.WPermanentEnchant.Name }}</span> -->
                        <span v-for="c in item.WPermanentEnchant.Attributes" :key="c.Desc">
                            <img class="u-icon" :src="3012 | iconLink" />
                            {{ c.Attrib.GeneratedMagic }}
                        </span>
                    </div>
                    <!-- 大附魔 -->
                    <div class="u-line u-enchant" v-if="item.WTemporaryEnchant">
                        <!-- <span class="name">{{ item.WTemporaryEnchant.Name }}</span> -->
                        <span>
                            <img class="u-icon" :src="2991 | iconLink" />
                            {{ item.WTemporaryEnchant.ID | enchant }}
                        </span>
                    </div>
                    <!-- 套装效果 -->
                    <div class="u-line u-set" v-if="item.Set">
                        <span class="u-txt">已装备：</span>
                        <span
                            v-for="(c, i) in item.SetList"
                            :key="i"
                            class="u-setname"
                            :class="c | setwquip(setlist)"
                        >{{ c }}</span>

                        <span
                            v-for="c in item.Set"
                            :key="c.Desc"
                            :class="setnum(item.SetList, setlist, c.SetNum)"
                        >
                            <span>[{{ c.SetNum }}] {{ c.Attrib.Desc || c.Attrib.GeneratedMagic }}</span>
                        </span>
                    </div>

                    <!-- 使用效果 -->
                    <div
                        class="u-line u-desc"
                        v-if="item.Desc"
                        :class="{ useable: item.UcPos }"
                    >{{ item.Desc | filterText }}</div>

                    <!-- 其它 -->
                    <div class="u-line u-other">
                        <span class="u-quality">品质等级{{ item.Quality }}</span>
                        <span class="u-gs">装备分数{{ formula(item.Quality,item.Color,item.UcPos)}}</span>
                        <span>适用门派：{{ item.BelongForce }}</span>
                    </div>
                </div>
                <div class="w-player-equip-item-icon" slot="reference">
                    <i class="u-icon" :class="'quality' + item.Color">
                        <img class="u-img" :src="item.Icon.FileName" :alt="item.Name" />
                    </i>
                    <span
                        class="u-name"
                        v-if="showEquipName"
                        :style="{ color: showFontColor(item.Color) }"
                    >{{ item.Name }}</span>
                </div>
            </el-popover>
        </a>
    </div>
</template>
<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import colormap from "@/assets/data/color.json";
import enchant from "@jx3box/jx3box-data/data/bps/enchant.json";
import { iconLink,getLink } from "@jx3box/jx3box-common/js/utils";
import formula from '@/service/gs.js'
export default {
    name: "Equip",
    props: ["data", "showEquipName", "showPosition", "mount", "body"],
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
        iconLink,
        filterText: function (str) {
            if (str) {
                str = str.replace(/\\/g, "");
                str = str.replace(/n/g, "");
                return str;
            }
            return "";
        },
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
        placement: function (val, style) {
            if (style) {
                if (val == "0" || val == "1" || val == "2") {
                    return "top";
                } else if (val == "8" || val == "4" || val == "3") {
                    return "right";
                } else {
                    return "left";
                }
            } else {
                return "top";
            }
        },
    },
    methods: {
        showBodyPic: function (mount, body) {
            return __imgPath + "image/body/" + mount + "_" + body + ".png";
        },
        showFontColor: function (val) {
            return colormap[val];
        },
        getSetList: function () {
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
                return "setwquip2";
            }
            return "";
        },
        formula,
        getEquipLink : function (item){
            let item_id = item.TabType + '_' + item.ID
            return getLink('item',item_id)
        }
    },
    created: function () {
        this.getSetList();
    },
};
</script>
<style scoped lang="less">
@import "../assets/css/equip.less";
</style>
