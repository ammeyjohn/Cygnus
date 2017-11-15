<template>
    <Menu theme="dark" active-name="1" width="200px">
        <MenuGroup title="敏捷产品">
            <MenuItem name="1">
                <Icon type="document-text"></Icon>
                <router-link to="/workorder">项目工单</router-link>
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="示例页面">
            <MenuItem name="1">
                <Icon type="document-text"></Icon>
                <router-link to="/demo">示例</router-link>
            </MenuItem>
        </MenuGroup>
    </Menu>
</template>

<script>
    export default {
        data () {
            return {
                
            }
        }
    }
</script>