'use strict';

import axios from 'axios';

let productService = {};

// Get all products
productService.getAllproducts = () => {
    return axios.get('/product');
}

// Get product by id
productService.getproductById = (id) => {
    return axios.get('/product/' + id);
}

// Get products by id array
productService.getProductsByIdArray = (ids) => {
    return axios.get('/product/' + ids.join(','));
}

// Get products by condition 
productService.queryproducts = (condition) => {
    return axios.post('/product', condition);
}

export default productService;