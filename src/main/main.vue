<style lang="scss">
    @import "./main.scss";
</style>

<template>
    <div id="main" class="main">
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
                            <Avatar src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
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
    import AuthSrv from '../service/authorizeService';

    export default {
        components: {
            sidebarMenu,
        },
        data() {
            return {
                userName: null
            }
        },
        mounted() {
           let credential = AuthSrv.getCredential();

           this.userName = credential.user.name;
        },
        computed: {
        }
    }
</script>