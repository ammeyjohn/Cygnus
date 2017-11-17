<style lang="scss">
    @import './login.scss';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input v-model="form.password">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" :type="!login_success?'error':'primary'" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip" v-if="!login_success" style="color: red;">登录失败，请输入正确的用户名和密码</p>                    
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import AuthSrv from '../service/authorizeService';

export default {
    data () {
        return {
            login_success: true,
            form: {
                userName: 'yuanjie',
                password: '1234567890'
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let authsrv = new AuthSrv();
                    authsrv.login(this.form)
                        .then(credential => {
                            // Redirect to index page.
                            this.$router.push({
                                name: 'workorder'
                            });                            
                        }, (err) => {
                            this.login_success = false;
                        });
                }
            });            
        }
    }
};
</script>

<style>

</style>
