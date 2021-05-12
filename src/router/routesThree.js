import ThreeTwoOne from "@/views/ThreeTwoOne";

export default [
  {
    path: "three",
    name: "Three",
    component: { render: (h) => h("router-view") },
    meta: {
      nav: {
        icon: "el-icon-s-platform",
        title: "权限管理",
      },
      breadcrumb: {
        title: "权限管理",
      },
    },
    children: [
      {
        path: "manager",
        name: "ThreeTwoOne",
        // redirect: { name: "ThreeTwoOneSelf" },
        component: ThreeTwoOne,
        meta: {
          breadcrumb: {
            title: "管理员",
            replace: true,
          },
          // title: "权限管理-管理员",
          // nav: {    又产生一级
          //   title: "管理员",
          // },
        },
        children: [
          {
            path: "",
            name: "ThreeTwoOne",
            component: ThreeTwoOne,
            meta: {
              title: "权限管理-管理员",
              nav: {
                title: "管理员",
              },
            },
          },
        ],
      },
    ],
  },
];
