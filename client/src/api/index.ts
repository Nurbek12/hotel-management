import axios from "axios"
import store from '../store'

export const uri = import.meta.env.VITE_PROXY_URL

const api = axios.create({ baseURL: uri })

api.interceptors.response.use(
  (response) => {
    checkToken();
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) store.commit("logout");
    return Promise.reject(error);
  }
);

export function checkToken(){
  const token = store.getters.token
  if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

checkToken()

export default api