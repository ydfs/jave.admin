import dramaSort from "@/views/Drama/dramaSort.vue";
import dramaList from "@/views/Drama/dramaList.vue";

export default [
  {
    path: "script",
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
        path: "",
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "sort",
            name: "Self",
            component: dramaSort,
            // permission: "",
            meta: {
              // title: "剧本分类",
              breadcrumb: {
                title: "剧本创建",
                replace: true,
              },
              nav: {
                title: "剧本创建",
              },
            },
          },
        ],
      },
      {
        path: "",
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "list",
            name: "List",
            component: dramaList,
            meta: {
              breadcrumb: {
                title: "剧本列表",
                replace: false,
              },
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
