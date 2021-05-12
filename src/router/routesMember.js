import TwoOne from "@/views/TwoOne";

export default [
  {
    path: "/member",
    name: "Member",
    component: TwoOne,
    meta: {
      nav: {
        icon: "el-icon-star-on",
        title: "会员管理",
      },
      breadcrumb: {
        //显示标签页
        title: "会员管理",
      },
    },
  },
];
