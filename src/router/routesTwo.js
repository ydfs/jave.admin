import TwoOne from "@/views/TwoOne";
// import ThreeTwoOne from "@/views/ThreeTwoOne";

export default [
  {
    path: "two",
    name: "Two",
    component: { render: (h) => h("router-view") },
    meta: {
      nav: {
        svg: {
          class: "nav-svg",
          name: "homework",
        },
        title: "剧本管理",
      },
      breadcrumb: {
        title: "剧本管理",
      },
    },
    children: [
      {
        path: "sort",
        name: "TwoOne",
        redirect: { name: "TwoOneSelf" },
        component: { render: (h) => h("router-view") },
        meta: {
          breadcrumb: {
            title: "剧本分类",
            replace: true,
          },
        },
        children: [
          {
            path: "",
            name: "TwoOneSelf",
            component: TwoOne,
            // permission: "",
            meta: {
              title: "剧本管理-剧本分类",
              nav: {
                title: "剧本分类",
              },
            },
          },
        ],
      },
      {
        path: "list",
        name: "TwoOne",
        redirect: { name: "TwoOneSelf" },
        component: { render: (h) => h("router-view") },
        meta: {
          breadcrumb: {
            title: "剧本列表",
            replace: false,
          },
        },
        children: [
          {
            path: "",
            name: "TwoOneSelf",
            component: TwoOne,
            meta: {
              title: "剧本管理-剧本列表",
              nav: {
                title: "剧本列表",
              },
            },
          },
        ],
      },
    ],
  },
];
