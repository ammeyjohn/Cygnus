'use strict';

import axios from 'axios';

let woService = {};

woService.create = function (workorder) {
    return axios.post('/wo', {
        item: workorder
    });
}

export default {

};