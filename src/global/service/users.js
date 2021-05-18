import request from "../request/axios";
import API from "../request/api.js";

const Users = {
  usersGet: () => {
    return request.get(API.users);
  },
};
export default Users;
