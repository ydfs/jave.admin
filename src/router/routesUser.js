import User from "@/views/user.vue";
import Member from "@/views/member.vue";

export default [
  {
    path: "/user",
    name: "User",
    component: User,
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
  {
    path: "/member",
    name: "Member",
    component: Member,
    meta: {
      nav: {
        icon: "el-icon-star-on",
        title: "会员管理",
      },
      breadcrumb: {
        title: "会员管理",
      },
    },
  },
];
