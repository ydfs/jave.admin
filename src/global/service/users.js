import request from "../request/axios";
import API from "../request/api.js";

const Users = {
  usersGet: ({ page, phone, nickname, gender }) => {
    return request.get(API.users, {
      page,
      phone,
      nickname,
      gender,
    });
  },
  usersIdGet: (id) => {
    return request.get(`${API.users}/${id}`);
  },
  usersIdPut: (id, { nickname, gender, introduction }) => {
    return request.put(`${API.users}/${id}`, {
      nickname,
      gender,
      // birthday,
      introduction,
    });
  },
  usersPost: ({ phone, nickname, gender, introduction }) => {
    return request.post(API.users, {
      phone,
      nickname,
      gender,
      // birthday,
      introduction,
    });
  },
  vipGet: () => {
    return request.get(API.vip);
  },
};
export default Users;
