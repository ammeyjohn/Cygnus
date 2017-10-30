<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                项目信息
                {{ project }}
            </p>        
            <form>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group row">
                            <label for="projectCode" class="col-sm-3 col-form-label">项目编号</label>
                            <div class="col-sm-9">
                                <Select v-model="project.code" remote filterable id="projectCode" :remote-method="queryProjects"
                :loading="showLoading">
                                    <Option v-for="item in projects" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>                            
                            </div>
                        </div>                    
                    </div>
                    <div class="col-md-4">
                        <div class="form-group row">
                            <label for="projectName" class="col-sm-3 col-form-label">项目名称</label>
                            <div class="col-sm-9">
                                <input type="text" readonly class="form-control-plaintext" id="projectName" :value="project.name">
                            </div>
                        </div>
                    </div>             
                    <div class="col-md-4">
                        <div class="form-group row">
                            <label for="principal" class="col-sm-3 col-form-label">负责人</label>
                            <div class="col-sm-9">
                                <input type="text" readonly class="form-control-plaintext" id="principal" :value="project.principal">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Card>         
    </div>
</template>

<script>

    var canceller = null;

    export default {
        data () {
            return {
                projects: [],
                project: {
                    code: '',
                    name: '',
                    principal: ''
                },
                showLoading: false
            }
        },
        methods: {
            queryProjects (query) {
                this.showLoading = true;
                if(canceller) {
                    clearTimeout(canceller);
                    canceller = null;
                }
                canceller = setTimeout(() => {
                    console.log(query);

                    setTimeout(() => {
                    this.showLoading = false;
                    this.projects = [{
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }];
                    }, 5000);
                }, 500);

            }
        }      
    }
</script>
