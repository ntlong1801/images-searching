import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.unsplash.com/photos',
    headers: 'Authorization: Client-ID wRkEst0s11lqExCKj9mKjgLVDaKZLj39ERgKSwe6dHE',

})

export default instance;