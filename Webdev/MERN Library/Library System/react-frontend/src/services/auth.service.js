import {httpCommon} from "../http-common"

const http = httpCommon()

class AuthDataService {
 
  login(username, password) {
    return http.get(`/login?username=${username}&password=${password}`)
  }
}

export default new AuthDataService();