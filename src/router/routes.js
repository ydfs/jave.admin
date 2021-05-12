import routesHome from "./routesHome";
import routesTwo from "./routesTwo";
import routesThree from "./routesThree";
import TheLayout from "@/components/TheLayout.vue";
import routesUser from "./routesUser";
import routesMember from "./routesMember";

export default [
  {
    path: "/",
    component: TheLayout,
    redirect: {
      name: "Home",
    },
    children: [
      ...routesHome,
      ...routesTwo,
      ...routesUser,
      ...routesMember,
      ...routesThree,
    ],
  },
];
