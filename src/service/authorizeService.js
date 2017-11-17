import axios from 'axios';
import Cookies from 'js-cookie';

export default {

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
    },

    // Get logined user instance from credential
    getCredential() {
        return Cookies.getJSON('credential');
    }


}