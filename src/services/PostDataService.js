import http from "../axios-api";

class PostDataService {
    getAll() {
        return http.get("/posts");
    }

    get(id) {
        return http.get(`/posts/${id}`);
    }

    create(data) {
        return http.post("/posts", data);
    }

    update(id, data) {
        return http.post(`/posts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/posts/${id}`);
    }
}

export default new PostDataService();
