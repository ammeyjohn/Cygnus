<style lang="scss">
    @import "./index.scss";
</style>

<template>
    <div id="main" class="main">
        <div class="sidebar-menu-con">
            <div class="logo-con">
                <img src="../assets/images/logo.jpg">                
            </div>
            <sidebar-menu></sidebar-menu>
        </div>
        <div class="main-header-con">
            <div class="main-header">                
                <div class="navicon-con">
                    <Button type="text">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div @click="handleFullScreen" v-if="showFullScreenBtn" class="full-screen-btn-con">
                        <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                            <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
                        </Tooltip>
                    </div>
                    <div @click="lockScreen" class="lock-screen-btn-con">
                        <Tooltip content="锁屏" placement="bottom">
                            <Icon type="locked" :size="20"></Icon>
                        </Tooltip>
                    </div>
                    <div @click="showMessage" class="message-con">
                        <Tooltip :content="messageCount > 0 ? '有' + messageCount + '条未读消息' : '无未读消息'" placement="bottom">
                            <Badge :count="messageCount" dot>
                                <Icon type="ios-bell" :size="22"></Icon>
                            </Badge>
                        </Tooltip>
                    </div>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                
            </div>            
        </div>
        <div class="single-page-con" :style="{paddingLeft: hideMenuText?'60px':'200px'}">
            <div class="single-page">
                <router-view></router-view>
            </div>
        </div>        
    </div>    
</template>

<script>
    import sidebarMenu from './sidebarMenu.vue';
    import breadcrumbNav from './breadcrumbNav.vue';

    export default {
        components: {
            sidebarMenu,
            breadcrumbNav
        },
        data () {
            return {
                userName: 'cygnus_admin',
                isFullScreen: false,
                showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
                messageCount: 10,
                hideMenuText: false,
            };
        },
        computed: {
            currentPath () {
                return this.$store.state.currentPath;
            },
            avatorPath () {
                return './images/avators/default.jpg';
            }
        },
        methods: {
            handleFullScreen () {
                let main = document.getElementById('main');
                if (this.isFullScreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (main.requestFullscreen) {
                        main.requestFullscreen();
                    } else if (main.mozRequestFullScreen) {
                        main.mozRequestFullScreen();
                    } else if (main.webkitRequestFullScreen) {
                        main.webkitRequestFullScreen();
                    } else if (main.msRequestFullscreen) {
                        main.msRequestFullscreen();
                    }
                }
            },
            handleClickUserDropdown (name) {

            },            
            lockScreen () {

            },
            showMessage () {
                
            },            
        }               
    }
</script>