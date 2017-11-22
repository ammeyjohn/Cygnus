<template>
    <Row :gutter="10">
        <Col :xs="24" :sm="24" :md="18">
            <Card>
                <p slot="title">工单内容</p>
                <Form ref="orderForm" :label-width="100" :rules="ruleValidate">
                    <Row>
                        <Col span="12">
                        <FormItem label="项目名称" prop="project">
                            <Select id="project" v-model="order.projectId" filterable @on-change="onProjectSelectChange">
                                <Option v-for="item in projects" :value="item.id" :key="item.code">{{ item.code + ' ' + item.name }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="产品名称" prop="product">
                            <Select id="product" v-model="order.productId" placeholder="请选择项目对应的产品" filterable>
                                <Option v-for="item in products" :value="item.id" :key="item.code">{{ item.code + ' ' + item.name }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        <FormItem label="工单类型" prop="orderType">
                            <Select id="orderType" v-model="order.type" placeholder="请选择工单类型">
                                <Option v-for="item in orderTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="事件日期" prop="eventDate">
                            <DatePicker type="date" v-model="order.orderDate" placeholder="请选择事件发生日期" style="display: block"></DatePicker>
                        </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="工单标题" prop="title">
                        <Row>
                            <Col span="18">
                            <FormItem prop="title">
                                <Input id="title" v-model="order.title" placeholder="请对问题进行简短的描述"></Input>
                            </FormItem>
                            </Col>
                            <Col span="6">
                            <FormItem prop="duration">
                                <Input v-model="order.duration" placeholder="请输入工单处理时长">
                                    <span slot="prepend">
                                        <Icon type="clock" style="font-size: 16px;"></Icon>
                                    </span>
                                    <span slot="append">分钟</span>
                                </Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="工单内容" prop="content">
                        <Input type="textarea" :rows="10"></Input>
                    </FormItem>
                    <FormItem style="text-align:right;">
                        <Button type="primary" @click="save()">提交</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </Card>
        </Col>
        <Col :xs="24" :sm="24" :md="6">
            <Card>
                <p slot="title">
                    <Icon type="document-text"></Icon>
                    工单信息
                </p>
                <Form>
                    <FormItem label="工单状态">
                        <i-switch id="state" size="large" v-model="order.state">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="发起人">
                        <Select
                            v-model="order.promoter"
                            filterable
                            remote
                            :remote-method="handleUserSearch"
                            :loading="loading">
                            <Option v-for="(option, index) in users" :value="option.userName" :key="option.userName">{{option.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="处理人">
                        <Select
                            v-model="order.handler"
                            filterable
                            remote
                            :remote-method="handleUserSearch"
                            :loading="loading">
                            <Option v-for="(option, index) in users" :value="option.userName" :key="option.userName">{{option.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="通知列表">
                        <Select
                            v-model="order.notifiers"
                            filterable
                            multiple
                            remote
                            :remote-method="handleUserSearch"
                            :loading="loading">
                            <Option v-for="(option, index) in users" :value="option.userName" :key="option.userName">{{option.name}}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </Card>
            <Card>
                <p slot="title">
                    <Icon type="document-text"></Icon>
                    调试信息                    
                </p>
                <div>
                    {{order}}
                </div>
            </Card>            
        </Col>
    </Row>
</template>

<script>
    import _ from 'lodash';
    import ProjectService from '../project/project.service';
    import prodSrv from '../product/product.service';
    import UserService from '../user/user.service';
    import WordService from '../service/word.service';
    import woSrv from './workorder.service';

    let cancelHandle = null;

    export default {
        data() {
            return {
                ruleValidate: {
                    // project: [{required: true, message: '请选择项目', trigger: 'blur'}],
                    // product: [{required: true, message: '请选择项目对应的产品'}],
                    // orderType: [{required: true, message: '请选择工单类型'}],
                    // eventDate: [{required: true, message: '请填写事件发生日期'}],
                    // title: [{required: true, message: '请填写工单标题'}],
                    // content: [{required: true, message: '请填写工单内容'}]
                },
                loading: false,
                projects: [],
                products: [],
                users: [],
                orderTypes: [],
                order: {
                    projectId: 0,
                    productId: 0,
                    title: null,
                    content: null,
                    type: '',
                    orderDate: new Date(),
                    duration: 0,
                    promoter: null,
                    handler: null,
                    notifiers: [],
                    state: true,                    
                    tags: [],
                    createUser: 1,
                    createTime: null
                }
            }
        },
        mounted: function () {
            let __this = this;

            // Load projects
            let prjsrv = new ProjectService();
            prjsrv.getAllProjects()
                .then(function (response) {
                    __this.projects = response.data.data;
                });

            // Load words
            let wordsrv = new WordService();
            wordsrv.getWordByCode('ORDER_TYPE')
                .then(function(word){
                    __this.orderTypes = word.items;
                    __this.order.type = word.items[0].code;
                });                        
        },
        methods: {
            onProjectSelectChange(selected) {
                if (selected !== '') {
                    let prj = _.find(this.projects, {
                        'id': selected
                    });
                    var __this = this;
                    prodSrv.getProductsByIdArray(prj.products)
                        .then(function (response) {
                            __this.products = response.data.data;
                            __this.order.productId = __this.projects[0].id;
                        });
                }
            },
            handleUserSearch: function (value) {

                this.users = [];

                if(value === '') {                    
                    return;
                }

                if(cancelHandle) {
                    clearTimeout(cancelHandle);
                    cancelHandle = null;
                }

                let __this = this;
                cancelHandle = setTimeout(() => {
                    this.loading = true;
                    let userSrv = new UserService();
                    userSrv.queryUsers({
                        'userName': value,
                        'email': value,
                        'name': value
                    })
                    .then(ret => {
                        if(ret) {
                            __this.users = ret.data;
                            __this.loading = false;
                        }
                    });
                }, 500);
            },
            save() {
                this.$refs.orderForm.validate((valid) => {
                    
                });
                // woSrv.create(this.order)
                //     .then(function (ret) {
                //         console.log(ret);
                //     });
            }
        }
    }
</script>