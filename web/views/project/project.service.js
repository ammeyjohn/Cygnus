'use strict';

import axios from 'axios';

export default class {

    // Get all acitved projects
    getAllProjects() {
        return axios.get('/project/all');
    }

    // Get project by id
    getProjectById(projectId) {
        return axios.get('/project/' + id);
    }

};