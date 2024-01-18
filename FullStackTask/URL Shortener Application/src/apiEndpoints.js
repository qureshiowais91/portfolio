import Axios from "axios";

export const instance = Axios.create({
    baseURL: 'https://resetpasswordurl.onrender.com',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});
