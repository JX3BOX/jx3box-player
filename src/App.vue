<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="云端宏"
            slug="macro"
            root="/macro"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/logo.svg" />
        </Breadcrumb>
        <LeftSidebar>left side</LeftSidebar>
        <Main :withoutRight="false">
            <div class="m-main">
                <router-view />
            </div>
            <RightSidebar>right side</RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {},
    components: {},
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
