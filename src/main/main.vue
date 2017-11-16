<style lang="scss">
    @import "./main.scss";
</style>

<template>
    <div id="main">
        <div class="sidebar-menu">
            <div class="logo">
                <img src="../assets/images/logo/logo.jpg">
            </div>
            <sidebar-menu></sidebar-menu>
        </div>
        <div class="app-header-con">
            <div class="app-header">
                <div class="header-avatar-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown>
                                <a href="javascript:void(0)">
                                    <span class="app-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar src="../assets/images/avatars/avatar1.jpg" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con">
            <div class="single-page">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import sidebarMenu from './sidebarMenu.vue';
    import tagsPageOpened from './tagsPageOpened.vue';

    export default {
        components: {
            sidebarMenu,
            tagsPageOpened
        },
        data() {
            return {
                userName: 'cygnus_admin'
            }
        },
        computed: {
            pageTagsList() {
                return this.$store.state.pageOpenedList; // 打开的页面的页面对象
            },
        }
    }
</script>