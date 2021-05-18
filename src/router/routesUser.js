import User from "@/views/User/user.vue";
import userDetails from "@/views/User/userDetails.vue";
import Member from "@/views/member.vue";

export default [
  {
    path: "",
    name: "User",
    component: { render: (h) => h("router-view") },
    meta: {
      nav: {
        icon: "el-icon-user",
        title: "用户管理",
      },
      breadcrumb: {
        title: "用户管理",
      },
    },
    children: [
      {
        path: "",
        name: "User",
        component: { render: (h) => h("router-view") },
        //permission:"roles-list",
        meta: {
          breadcrumb: {
            title: "用户",
          },
        },
        children: [
          {
            path: "user",
            name: "Users",
            component: User,
            meta: {
              nav: {
                title: "用户",
              },
            },
          },
          {
            path: "user/details",
            name: "details",
            component: userDetails,
            meta: {
              breadcrumb: {
                title: "详情",
                replace: true,
              },
            },
          },
        ],
      },
    ],
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
