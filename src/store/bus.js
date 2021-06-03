import Vue from "vue";
const Bus = new Vue();
export default Bus

// Use like
// Bus.$emit(事件名,数据);
// Bus.$on(事件名,data => {});