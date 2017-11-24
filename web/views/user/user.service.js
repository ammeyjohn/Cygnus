import axios from 'axios';

export default class {

    // Get a user object by given condition.
    getUser(name, userName, mail, fuzzy = false) {
        let params = {
            'name': name,
            'userName': userName,
            'mail': mail
        };
        if (fuzzy) {
            params['mode'] = 'fuzzy';
        }
        return axios.get('/user', {
            params: params
        }).then(ret => {
            return ret.data;
        });
    }

    // Query users by given params
    queryUsers(params) {
        return axios.get('/user/query', {
            params: params
        }).then(ret => {
            return ret.data;
        });
    }
};