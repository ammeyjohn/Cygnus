import axios from 'axios';

export default class {

    getWordByCode(code) {
        return axios.get('/word/' + code)
            .then(ret => {
                return ret.data.data;
            });
    }

}