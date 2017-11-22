const debug = require('debug')('cygnus:service:workorder');
const log = require('winston');
const Q = require('q');
const WORepo = require('../repository/repo.workorder');

module.exports = class WorkorderService {

    // Add a workorder instance.
    addOrder(order) {
        if (!order) {
            throw new Error('Null argument "order"');
        }
        order.createTime = new Date();

        let repo = new WORepo();
        return repo.addOrder(order);
    }
}