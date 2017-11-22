import axios from 'axios';

export default class {

    // Create a new work order object.
    createOrder(order) {
        return axios.post('/workorder', {
            order: order
        });
    }

};