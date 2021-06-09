<template>
    <div class="m-user-intro">
        <div class="m-logo">
            <img :src="userxf.id | xficon" alt />
        </div>
        <div v-for="(item, key) in data.Attrib" :key="key" class="m-line">
            <span>{{ key | infoname }}</span>
            <span>{{ item }}</span>
        </div>
    </div>
</template>
<script>
import info from "@/assets/data/attr.json";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Intro",
    props: ["data"],
    data: function () {
        return {
            xfmap,
            userxf: [],
        };
    },
    infoname: function(id) {
      return info[id]
    },
    created: function () {
        if (this.data) {
            for (const i in this.xfmap) {
                if (this.data.KungfuID == this.xfmap[i].id) {
                    this.userxf = this.xfmap[i];
                }
            }
        }

        // console.log(this.data, "intro");
    },
};
</script>
<style scoped lang="less">
.m-user-intro {
    min-width: 300px;
    padding: 10px;
    .m-line {
        display: flex;
        justify-content: space-between;
        .mb(5px);
    }
}
</style>
