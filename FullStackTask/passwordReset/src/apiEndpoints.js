import Axios from "axios";

export const instance = Axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});
