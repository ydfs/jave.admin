import request from "../request/axios";
import API from "../request/api.js";

const Drama = {
  dramaPost: (params) => {
    return request.post(API.drama, params);
  },
};
export default Drama;
