<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                项目信息
            </p>        
            <form>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                        <div class="form-group row">
                            <label for="projectCode" class="col-sm-3 col-form-label">项目名称</label>
                            <div class="col-sm-9">
                                <Select id="projectCode" v-model="project.code" remote filterable :remote-method="queryProjects" :loading="showLoading">
                                    <Option v-for="item in projects" :value="item.projectCode" :key="item.projectCode">{{ item.projectCode + ' ' + item.projectName }}</Option>
                                </Select>                            
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

    import axios from 'axios';

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
                if(query !== '') {
                    this.showLoading = true;
                    if(canceller) {
                        clearTimeout(canceller);
                        canceller = null;
                    }
                    var __this = this;
                    canceller = setTimeout(() => {
                        axios.get('/project/user/' + query)
                            .then(function (response) {
                                __this.showLoading = false;
                                __this.projects = response.data.data;
                            });
                    }, 500);
                } else {
                    this.projects = [];
                }
            }
        }      
    }
</script>
