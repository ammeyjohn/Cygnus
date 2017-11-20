const debug = require('debug')('cygnus:repo:product');
const Mongo = require('../mongo.js');

const COLLECTION = 'products';

module.exports = class ProductRepoistory {

    // Get project specified by project id.
    getByIds(productIds) {
        let mongo = new Mongo();
        return mongo.query(COLLECTION, {
            id: {
                $in: productIds
            },
            actived: true
        });
    }

}