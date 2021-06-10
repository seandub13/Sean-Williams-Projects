import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function httpAuth () {
  const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-type": "application/json"
    }
  });

    http.interceptors.request.use(config => {
      console.log("Config httpCommon: ",config)
      config.params = {
        password: cookies.get("password"),
        id: cookies.get("id"),
        ...config.params
      };
      return config;
    });
  return http
}

export function httpCommon () {
  const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-type": "application/json"
    }
  });
  return http
}
