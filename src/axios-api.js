import axios from "axios";

export default axios.create({
    baseURL: "https://api.ba.test/api/v1",
    headers: {
        'Content-type': 'application/json'
    }
});
