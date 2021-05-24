import request from "../request/axios";
import API from "../request/api.js";

const Users = {
  usersGet: ({ page, page_size, phone, nickname, gender }) => {
    if (page || page_size || phone || nickname || gender) {
      return request.get(API.users, {
        page,
        page_size,
        phone,
        nickname,
        gender,
      });
    } else {
      return request.get(API.users);
    }
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
  vipGet: ({ page, nickname }) => {
    return request.get(API.vip, { page, nickname });
  },
  vipType: () => {
    return request.get(API.viptype);
  },
  vipRecharge: ({ user_id, vip_sku_id, number, remark }) => {
    return request.post(API.viprecharge, {
      user_id,
      vip_sku_id,
      number,
      remark,
    });
  },
  mobilePhone: (phone) => {
    return request.get(API.phone + phone);
  },
};
export default Users;
