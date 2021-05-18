const API_PREFIX = "http://api" + process.env.VUE_APP_DOMAIN;
export default {
  my: `${API_PREFIX}/api/admin/permissions/my`,
  roleList: `${API_PREFIX}/api/admin/roles`,
  //editRole:(id) => `${API_PREFIX}/api/admin/roles/${id}`,
  allPermissions: `${API_PREFIX}/api/admin/permissions`,
  manager: `${API_PREFIX}/api/admin/administrators`,
  phone: `${API_PREFIX}/api/admin/users?phone=`,
};
