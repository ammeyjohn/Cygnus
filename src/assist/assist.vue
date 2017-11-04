<template>
    <form>
        <div class="row">
            <div class="col-md-8">
                <Card>
                    <p slot="title">工单发布</p>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group row">
                                <label for="title" class="col-md-1 col-form-label">工单标题</label>
                                <div class="col-md-11">
                                    <input id="title" class="form-control" v-model="order.title" placeholder=""></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="content">工单内容</label>
                            <textarea id="content" class="form-control" v-model="order.content" rows="10"></textarea>
                        </div>
                    </div>
                </Card>
            </div>
            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-12">
                        <Card>
                            <p slot="title">
                                <Icon type="paper-airplane"></Icon>
                                工单信息
                            </p>
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="project">项目名称</label>
                                    <Select id="project" size="large" v-model="order.projectId" filterable @on-change="onProjectSelectChange">
                                        <Option v-for="item in projects" :value="item.code" :key="item.code">{{ item.code + ' ' + item.name }}</Option>
                                    </Select>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 10px;">
                                <div class="col-md-12">
                                    <label for="product">产品名称</label>
                                    <Select id="product" size="large" v-model="order.productId" filterable>
                                        <Option v-for="item in products" :value="item.code" :key="item.code">{{ item.code + ' ' + item.name }}</Option>
                                    </Select>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    import _ from 'lodash';
    import prjSrv from '../project/project.service';
    import prodSrv from '../product/product.service';

    export default {
        data() {
            return {
                projects: [],
                products: [],
                order: {
                    projectId: 0,
                    productId: 0,
                    title: null,
                    content: null
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
            onProjectSelectChange: function(selected) {
                if (selected !== '') {
                    let prj = _.find(this.projects, {
                        'code': selected
                    });
                    var __this = this;
                    prodSrv.getProductsByIdArray(prj.products)
                        .then(function (response) {
                            __this.products = response.data.data;
                        });
                }
            }
        }
    }
</script>