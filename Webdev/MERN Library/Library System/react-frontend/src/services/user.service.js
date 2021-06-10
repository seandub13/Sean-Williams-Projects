import { httpAuth } from "../http-common"
const http = httpAuth ()

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  findByEmail(email) {
    return http.get(`/users?email=${email}`);
  }
}

export default new UserDataService();