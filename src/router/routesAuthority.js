import Admin from "@/views/Authority/Admins/Admin.vue";
import Role from "@/views/Authority/Roles/Role.vue";
import AddOrUpdate from "@/views/Authority/Roles/AddOrUpdate.vue";
export default [
  {
    path: "",
    name: "Authority",
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
        path: "authority",
        redirect: { name: "admin" },
        component: { render: (h) => h("router-view") },
        meta: {
          breadcrumb: {
            title: "管理员",
            replace: true,
          },
        },
        children: [
          {
            path: "admin",
            name: "admin",
            component: Admin,
            meta: {
              nav: {
                title: "管理员",
              },
            },
          },
        ],
      },
      {
        path: "authority",
        redirect: { name: "Roles" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "",
            name: "Role",
            component: { render: (h) => h("router-view") },
            //permission:"roles-list",
            meta: {
              breadcrumb: {
                title: "角色",
              },
            },
            children: [
              {
                path: "roles",
                name: "Roles",
                component: Role,
                meta: {
                  nav: {
                    title: "角色",
                  },
                },
              },
              {
                path: "roles/add",
                name: "add",
                component: AddOrUpdate,
                meta: {
                  breadcrumb: {
                    title: "添加",
                    replace: true,
                  },
                },
              },
              {
                path: "roles/edit/:id",
                name: "edit",
                props: true,
                component: AddOrUpdate,
                meta: {
                  breadcrumb: {
                    title: "修改",
                    replace: true,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
