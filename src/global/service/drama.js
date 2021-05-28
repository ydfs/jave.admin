import request from "../request/axios";
import API from "../request/api.js";

const Drama = {
  dramaPost: (params) => {
    return request.post(API.drama, params);
  },
  dramaGet: ({ page }) => {
    return request.get(API.drama, { page });
  },
  dramaDetails: (id) => {
    return request.get(`${API.drama}/${id}`);
  },
  dramaEdit: (id, params) => {
    return request.put(`${API.drama}/${id}`, params);
  },
  dramaDelete: (id) => {
    return request.delete(`${API.drama}/${id}`);
  },
  categoryPost: ({ name }) => {
    return request.post(API.dramaClassify, { name });
  },
  categoryGet: () => {
    return request.get(API.dramaClassify);
  },
  categoryDetail: (id) => {
    return request.get(`${API.dramaClassify}/${id}`);
  },
  categoryPut: (id) => {
    return request.put(`${API.dramaClassify}/${id}`);
  },
  categoryDelete: (id) => {
    return request.delete(`${API.dramaClassify}/${id}`);
  },
};
export default Drama;
