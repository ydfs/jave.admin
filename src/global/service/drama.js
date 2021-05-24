import request from "../request/axios";
import API from "../request/api.js";

const Drama = {
  dramaPost: (params) => {
    return request.post(API.drama, params);
  },
  dramaGet: () => {
    return request.get(API.drama);
  },
  dramaDetails: (id) => {
    return request.get(`${API.drama}/${id}`);
  },
  dramaEdit: (id) => {
    return request.put(`${API.drama}/${id}`);
  },
  dramaDelete: (id) => {
    return request.get.apply(`${API.drama}/${id}`);
  },
};
export default Drama;
