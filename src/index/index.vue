<style lang="scss">
    @import "./index.scss";
</style>

<template>
    <div>
        <sidebar-menu></sidebar-menu>
        <div class="main-header-con">
            <div class="main-header">
                <div class="navicon-con">
                    <Button type="text">
                        <ElIcon type="navicon" size="32"></ElIcon>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sidebarMenu from './sidebarMenu.vue';

    export default {
        components: {
            sidebarMenu
        }
    }
</script>