const log = require('winston');
const User = require('../model/user');

module.exports = class UserRepo {

    selectById(id) {
        return User.findOne({
                id: id
            })
            .lean()
            .fail(err => {
                log.error(err);
                return {
                    code: -10,
                    message: 'Execute query error',
                    error: err,
                    param: arguments
                }
            })
            .catch(ex => {
                log.exception(ex);
                throw ex;
            });
    }

    select(conds, params) {
        let condition = {};
        if (conds) {
            if (conds.id && conds.id.length > 0) {
                condition['id'] = {
                    '$in': conds.id
                };
            }
            if (params.fuzzy) {
                let or = [];
                if (conds.userName)
                    or.push(new RegExp(conds.userName));
                if (conds.name)
                    or.push(new RegExp(conds.name));
                if (conds.email)
                    or.push(new RegExp(conds.email));
                condition['$or'] = or;
            } else {
                condition = conds;
            }
        }

        let sort = {};
        params.asc.forEach(f => {
            sort[f] = 1
        });
        params.desc.forEach(f => {
            sort[f] = -1
        });

        let query = User.find(condition);
        if (params.offset > 0)
            query = query.skip(params.offset);
        if (Number.isFinite(params.limit))
            query = query.limit(params.limit)
        return query
            .sort(sort)
            .lean()
            .then(docs => {
                if (params.limit === 1) {
                    if (docs && docs.length > 0)
                        return docs[0];
                }
                return docs;
            }, err => {
                log.error(err);
                return {
                    code: -10,
                    message: 'Execute query error',
                    error: err,
                    param: arguments
                }
            })
            .catch(ex => {
                log.exception(ex);
                throw ex;
            })
    }

    insert(user) {
        return User(user)
            .save()
            .fail(err => {
                log.error(err);
                return {
                    code: -10,
                    message: 'Execute insert error',
                    error: err,
                    param: arguments
                }
            })
            .catch(ex => {
                log.exception(ex);
                throw ex;
            });
    }
}