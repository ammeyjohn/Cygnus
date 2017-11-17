import axios from 'axios';
import Cookies from 'js-cookie';

export default class AuthroizeService {

    // User login
    login(loginInfo) {
        return axios.post('/auth/login', {
                'loginInfo': loginInfo
            })
            .then((ret) => {
                // Save credential to cookie
                let credential = ret.data.data;
                Cookies.set('credential', credential);
                return credential;
            });
    }


}