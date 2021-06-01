import dramaClassify from "@/views/Drama/dramaClassify.vue";
import dramaFound from "@/views/Drama/dramaFound.vue";
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
        permission: "book-category-list",
        children: [
          {
            path: "classify",
            name: "Classify",
            component: dramaClassify,
            meta: {
              breadcrumb: {
                title: "剧本分类",
                replace: true,
              },
              nav: {
                title: "剧本分类",
              },
            },
          },
        ],
      },
      {
        path: "",
        component: { render: (h) => h("router-view") },
        permission: "books-list",
        meta: {
          breadcrumb: {
            title: "剧本列表",
          },
        },
        children: [
          {
            path: "list",
            name: "List",
            component: dramaList,
            meta: {
              nav: {
                title: "剧本列表",
              },
            },
          },
          {
            path: "list/found",
            name: "found",
            component: dramaFound,
            meta: {
              breadcrumb: {
                title: "创建剧本",
                replace: true,
              },
            },
          },
          {
            path: "list/details/:id",
            name: "dramaDetails",
            props: true,
            component: dramaFound,
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
];
