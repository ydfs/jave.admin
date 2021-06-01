import User from "@/views/User/user.vue";
import userDetails from "@/views/User/userDetails.vue";
import Member from "@/views/memberVIP.vue";

export default [
  {
    path: "",
    // name: "User",
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
        permission: "users-list",
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
            path: "user/details/:id",
            name: "details",
            props: true, //路由要传一个id过去
            component: userDetails,
            meta: {
              breadcrumb: {
                title: "详情",
                replace: true,
              },
            },
          },
          {
            path: "user/newlyadd",
            name: "newlyadd",
            props: true,
            component: userDetails,
            meta: {
              breadcrumb: {
                title: "添加",
                replace: true,
              },
            },
          },
        ],
      },
    ],
  },
  {
    path: "",
    // name: "Member",
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
    children: [
      {
        path: "",
        // name: "Member",
        component: { render: (h) => h("router-view") },
        permission: "vip-list",
        meta: {
          breadcrumb: {
            title: "充值列表",
          },
        },
        children: [
          {
            path: "member",
            name: "Member",
            component: Member,
            meta: {
              nav: {
                title: "充值列表",
              },
            },
          },
        ],
      },
    ],
  },
];
