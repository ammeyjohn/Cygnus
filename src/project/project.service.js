'use strict';

import axios from 'axios';

let projectService = {};

// Get all projects
projectService.getAllProjects = () => {
    return axios.get('/project');
}

// Get project by id
projectService.getProjectById = (id) => {
    return axios.get('/project/' + id);
}

// Get projects by condition 
projectService.queryProjects = (condition) => {
    return axios.post('/project', condition);
}

export default projectService;