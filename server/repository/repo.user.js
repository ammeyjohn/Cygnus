const User = require('../model/user');

module.exports = class UserRepo {

    getUserById(id) {
        return User.findOne({ id: id }).lean();
    }

    getUserByCondition(condition) {
        return User.findOne(condition).lean();
    }

    queryUsersByCondition(condition, fuzzy = true) {
        let or = [];
        if (condition.userName)
            or.push(new RegExp(condition.userName));
        if (condition.name)
            or.push(new RegExp(condition.name));
        if (condition.email)
            or.push(new RegExp(condition.email));

        return User.find({
            '$or': or
        }).then(docs => {

        }, err => {});
    }

    addUser(data) {
        return User(data).save()
    }
}



// Generate a condition object from given parameters.
// const getCondition = function(params, fuzzy, or) {
//     let cond = {};
//     if (params.name) cond['name'] = fuzzy ? new RegExp(params.name) : params.name;
//     if (params.userName) cond['userName'] = fuzzy ? new RegExp(params.userName) : params.userName;
//     if (params.email) cond['email'] = fuzzy ? new RegExp(params.email) : params.email;
//     if (or) {
//         let orCond = [];
//         for (let name in cond)
//             orCond.push(_.pick(cond, name));
//         return { '$or': orCond };
//     }
//     return cond;
// }

// module.exports = class UserRepo {

//     // Get a specified user by given condition.
//     // Null argument will be ignored.
//     get(condition, fuzzy = false) {
//         let cond = getCondition(condition, fuzzy, false);
//         let mongo = new Mongo();
//         return mongo.query(COLLECTION, cond)
//             .then(ret => {
//                 if (ret && ret.length >= 1) {
//                     return ret[0];
//                 }
//                 return null;
//             });
//     }

//     // Query users by given condition.
//     query(condition, fuzzy = true) {
//         let cond = getCondition(condition, fuzzy, true);
//         let mongo = new Mongo();
//         return mongo.query(COLLECTION, cond);
//     }

// }