import TwoOne from "@/views/TwoOne";

export default [
  {
    path: "/user",
    name: "User",
    component: TwoOne,
    meta: {
      nav: {
        icon: "el-icon-user",
        title: "用户管理",
      },
      breadcrumb: {
        title: "用户管理",
      },
    },
  },
];
