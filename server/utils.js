const _ = require('lodash');

module.exports = {

    // Parse the querystring, include:
    // limit=10
    // offset=10
    // mode=fuzzy
    // asc=name,age
    // desc=name,age
    // whitelist=id,name
    queryParse(query) {
        let params = {
            fuzzy: false,
            limit: Number.POSITIVE_INFINITY,
            offset: 0,
            asc: [],
            desc: [],
            whitelist: []
        }

        if (query.mode)
            params.fuzzy = (query.mode === 'fuzzy');

        if (query.limit) {
            let limit = parseInt(query.limit);
            if (!Number.isNaN(limit))
                params.limit = limit;
        }

        if (query.offset) {
            let offset = parseInt(query.offset);
            if (!Number.isNaN(offset))
                params.offset = offset;
        }

        if (query.asc)
            params.asc = _.split(query.asc, ',');

        if (query.desc)
            params.desc = _.split(query.desc, ',');

        if (query.whitelist)
            params.whitelist = _.split(query.whitelist, ',');

        return params;
    }

}