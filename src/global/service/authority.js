import request from "./../request/axios";
import API from "./../request/api.js";

const Authority = {
  getMy: () => {
    return request.get(API.my);
  },
};
export default Authority;
