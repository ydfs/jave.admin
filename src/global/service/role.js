import request from "./../request/axios";
import API from "./../request/api.js";

const Role = {
  getList: () => {
    return request.get(API.roleList);
  },
  postRole: ({ name, display_name, description, permission_ids }) => {
    return request.post(API.roleList, {
      name,
      display_name,
      description,
      permission_ids,
    });
  },
  getAll: () => {
    return request.get(API.allPermissions);
  },
  getDetail: (id) => {
    return request.get(`${API.roleList}/${id}`);
  },
  putDetail: (id, { name, display_name, description, permission_ids }) => {
    return request.put(`${API.roleList}/${id}`, {
      name,
      display_name,
      description,
      permission_ids,
    });
  },
  deleteDetail: (id) => {
    return request.delete(`${API.roleList}/${id}`);
  },
  managerlist: () => {
    return request.get(API.manager);
  },
  managerDetail: (id) => {
    return request.get(`${API.manager}/${id}`);
  },
  managerPost: ({ user_id, role_ids }) => {
    return request.post(API.manager, {
      user_id,
      role_ids,
    });
  },
  mobilePhone: (phone) => {
    return request.get(API.phone + phone);
  },
  managerPut: (id, { user_id, role_ids }) => {
    return request.put(`${API.manager}/${id}`, {
      user_id,
      role_ids,
    });
  },
  managerDelete: (id) => {
    return request.delete(`${API.manager}/${id}`);
  },
};
export default Role;
