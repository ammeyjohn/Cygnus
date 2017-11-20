<template>
    <Row :gutter="10">
        <Col :xs="24" :sm="24" :md="18">
            <Card>
                <p slot="title">工单内容</p>
                <Form :label-width="100" :rules="ruleValidate">
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
                                    <Option v-for="item in orderTypes" :value="item.id" :key="item.code">{{ item.code + ' ' + item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="事件日期" prop="eventDate">
                                <DatePicker type="date" placeholder="请选择事件发生日期" style="display: block"></DatePicker>
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
                                    <Input>
                                        <span slot="prepend">
                                            <Icon type="clock" style="font-size: 16px;"></Icon>
                                        </span>
                                        <Select slot="append" style="width: 70px">
                                            <Option value="minute">分钟</Option>
                                            <Option value="hour">小时</Option>
                                            <Option value="day">天</Option>
                                        </Select>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="工单内容" prop="content">
                        <Input type="textarea" :rows="10"></Input>
                    </FormItem>
                    <FormItem label="工单标签" prop="tags">
                        <Tag v-for="item in 5" :key="item" :name="item" closable>标签{{ item + 1 }}</Tag>
                        <Button icon="ios-plus-empty" type="dashed" size="small">添加标签</Button>                        
                    </FormItem>
                    <FormItem style="text-align:right;">
                        <Button type="primary">提交</Button>
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
                        <i-switch id="state" size="large" :value="order.state">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="发起人">
                        <Input id="promoter" type="text" placeholder="请输入工单发起人" :value="order.promoter"></Input>
                    </FormItem>
                    <FormItem label="处理人">
                        <Input id="handler" type="text" placeholder="请输入工单处理人" :value="order.handler"></Input>
                    </FormItem>  
                    <FormItem label="通知列表">
                        <Input id="notifiers" type="text" placeholder="请输入需要接收通知的人员"></Input>
                    </FormItem>
                </Form>
            </Card>        
        </Col>
    </Row>
</template>

<script>
    import _ from 'lodash';
    import ProjectService from '../project/project.service';
    import prodSrv from '../product/product.service';
    import woSrv from './workorder.service';

    export default {
        data() {
            return {
                ruleValidate: {
                    project: [ { required: true, message: '请选择项目', trigger: 'change' } ],
                    product: [ { required: true, message: '请选择项目对应的产品', trigger: 'change' } ],
                    orderType: [ { required: true, message: '请选择工单类型', trigger: 'change' } ],
                    eventDate: [ { required: true, message: '请填写事件发生日期', trigger: 'change' } ],
                    title: [ { required: true, message: '请填写工单标题', trigger: 'blur' } ],
                    content: [ { required: true, message: '请填写工单内容', trigger: 'blur' } ]
                },                
                projects: [],
                products: [],
                orderTypes: [],
                order: {
                    projectId: 0,
                    productId: 0,
                    title: null,
                    content: null,
                    type: '',
                    date: '',
                    promoter: 1,
                    handler: 1,
                    state: '开启',
                    notifiers: [],
                    tags: [],
                    createUser: 1,
                    createTime: null
                }
            }
        },
        mounted: function () {
            let __this = this;            
            let prjsrv = new ProjectService();
            prjsrv.getAllProjects()
                .then(function (response) {
                    __this.projects = response.data.data;
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
                        });
                }
            },
            save: function () {
                woSrv.create(this.order)
                    .then(function (ret) {
                        console.log(ret);
                    });
            }
        }
    }
</script>