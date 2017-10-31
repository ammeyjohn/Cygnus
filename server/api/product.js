const debug = require('debug')('cygnus:api:project');
const _ = require('lodash');
const Q = require('q');
const mongo = require('../mongo.js');

const PRODUCT = 'products';

// Select products by condition.
// If condition is null or undefined, returns all products.
exports.getProducts = function (condition) {
    return mongo.query(PRODUCT, condition);
}