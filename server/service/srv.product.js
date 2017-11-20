const debug = require('debug')('cygnus:service:product');
const log = require('winston');
const _ = require('lodash');
const ProductRepoistory = require('../repository/repo.product');

module.exports = class ProductService {

    // Get projects specified by project id array.
    getProductByIds(idstr) {
        let ids = _.map(_.split(idstr, ','), Number);
        var repo = new ProductRepoistory();
        return repo.getByIds(ids);
    }

}