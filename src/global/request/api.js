const API_PREFIX = "http://api" + process.env.VUE_APP_DOMAIN;
export default {
  my: `${API_PREFIX}/api/admin/permissions/my`,
  roleList: `${API_PREFIX}/api/admin/roles`,
  //editRole:(id) => `${API_PREFIX}/api/admin/roles/${id}`,
  allPermissions: `${API_PREFIX}/api/admin/permissions`,
  manager: `${API_PREFIX}/api/admin/administrators`,
  phone: `${API_PREFIX}/api/admin/users?phone=`,
  users: `${API_PREFIX}/api/admin/users`,
  vip: `${API_PREFIX}/api/admin/vip/histories`,
  viptype: `${API_PREFIX}/api/admin/vip/skus`,
  viprecharge: `${API_PREFIX}/api/admin/vip/user`,
  drama: `${API_PREFIX}/api/admin/books`,
  dramaClassify: `${API_PREFIX}/api/admin/book-category`,
  qiniuToken: `${API_PREFIX}/api/file/qiniu-token`,
  qiniuStore: `${API_PREFIX}/api/file/qiniu-store`,
};
