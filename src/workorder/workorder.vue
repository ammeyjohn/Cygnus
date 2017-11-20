<style>
/* .container-fluid .control-label {
    text-align: left;
} */
</style>


<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <Card>
                    <p slot="title">工单内容</p>
                    <form class="form-horizontal">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="project" class="col-md-3 control-label">项目名称</label>
                                    <div class="col-md-9">
                                        <Select id="project" size="large" v-model="order.projectId" filterable @on-change="onProjectSelectChange">
                                            <Option v-for="item in projects" :value="item.id" :key="item.code">{{ item.code + ' ' + item.name }}</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="product" class="col-md-3 control-label">产品名称</label>
                                    <div class="col-md-9">
                                        <Select id="product" v-model="order.productId" placeholder="请选择项目对应的产品" filterable>
                                            <Option v-for="item in products" :value="item.id" :key="item.code">{{ item.code + ' ' + item.name }}</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="type" class="col-md-3 control-label">工单类型</label>
                                    <div class="col-md-9">
                                        <Select id="type" size="large" v-model="order.type" placeholder="请选择工单类型">
                                            <Option v-for="item in orderTypes" :value="item.id" :key="item.code">{{ item.code + ' ' + item.name }}</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="date" class="col-md-3 control-label">事件日期</label>
                                    <div class="col-md-9">
                                        <DatePicker type="date" size="large" placeholder="请选择事件发生日期" style="display: block"></DatePicker>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="title" class="col-md-2 control-label">工单标题</label>
                                    <div class="col-md-7">
                                        <input id="title" class="form-control" v-model="order.title" placeholder="请对问题进行简短的描述"></input>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="glyphicon glyphicon-time"></i>
                                            </div>
                                            <input id="title" class="form-control" v-model="order.title" placeholder="请输入工时"></input>
                                            <div class="input-group-btn">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">分钟 <span class="caret"></span></button>
                                                <ul class="dropdown-menu dropdown-menu-right">
                                                    <li><a href="#">分钟</a></li>
                                                    <li><a href="#">小时</a></li>
                                                    <li><a href="#">天</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="content" class="col-lg-2 control-label">工单内容</label>
                                    <div class="col-lg-10">
                                        <textarea id="content" class="form-control" v-model="order.content" rows="20" placeholder="请详细描述问题的表现、重现步骤和现场环境等"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="tags" class="col-md-2 control-label">工单标签</label>
                                    <div class="col-md-10">
                                        <Input id="tags" type="text" placeholder="请添加工单标签"></Input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 10px">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-primary" style="float:right;" v-on:click="save">保存</button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-12">
                        <Card>
                            <p slot="title">
                                <Icon type="document-text"></Icon>
                                工单信息
                            </p>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <label for="state" class="col-sm-3 control-label" style="margin-left: -15px;">工单状态</label>
                                    <div class="col-sm-9">
                                        <i-switch id="state" size="large" :value="order.state">
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <label for="promoter">发起人</label>
                                    <Input id="promoter" type="text" placeholder="请输入工单发起人" :value="order.promoter"></Input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <label for="handler">处理人</label>
                                    <Input id="handler" type="text" placeholder="请输入工单处理人" :value="order.handler"></Input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <label for="notifiers">通知列表</label>
                                    <Input id="notifiers" type="text" placeholder="请输入需要接收通知的人员"></Input>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import prjSrv from '../project/project.service';
    import prodSrv from '../product/product.service';
    import woSrv from './workorder.service';

    export default {
        data() {
            return {
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
                    state: 1,
                    notifiers: [],
                    tags: [],
                    createUser: 1,
                    createTime: null
                }
            }
        },
        mounted: function () {
            var __this = this;
            prjSrv.getAllProjects()
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