<template>
    <div>
        <sidebar-menu></sidebar-menu>
        <div class="main-header-con">
            <div class="main-header">asdfasdfasd</div>
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

<style>
    .main-header-con {
        box-sizing: border-box;
        position: fixed;
        display: block;
        padding-left: 200px;
        width: 100%;
        height: 100px;
        z-index: 1000;
        box-shadow: 0 2px 1px 1px rgba(100,100,100,.1);
    }

    .main-header {
        height: 60px;
        background: #fff;
        box-shadow: 0 2px 1px 1px rgba(100,100,100,.1);
        position: relative;
        z-index: 10;
    }
</style>