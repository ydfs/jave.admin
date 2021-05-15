import routesHome from "./routesHome";
import routesDrama from "./routesDrama";
import routesAuthority from "./routesAuthority";
import TheLayout from "@/components/TheLayout.vue";
import routesUser from "./routesUser";

export default [
  {
    path: "/",
    component: TheLayout,
    redirect: {
      name: "Home",
    },
    children: [
      ...routesHome,
      ...routesDrama,
      ...routesUser,
      ...routesAuthority,
    ],
  },
];
