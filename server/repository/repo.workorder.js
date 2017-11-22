const debug = require('debug')('cygnus:repo:workorder');
const Mongo = require('../mongo.js');

const COLLECTION = 'work_orders';

module.exports = class WorkorderRepo {

    // Add a workorder object to db.
    addOrder(order) {
        let mongo = new Mongo();
        return mongo.getNextSeq('workorder_id')
            .then(ret => {
                order.id = ret.seq;
                return mongo.insert(COLLECTION, order);
            });
    }

}