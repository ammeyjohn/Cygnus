const debug = require('debug')('cygnus:api:product');
const _ = require('lodash');
const Q = require('q');
const mongo = require('../mongo.js');

const COLLECTION = 'products';

// Select products by condition.
// If condition is null or undefined, returns all products.
exports.getProducts = function(condition) {
    return mongo.query(COLLECTION, condition);
}