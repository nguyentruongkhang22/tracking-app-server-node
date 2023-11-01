import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import DeviceList from "@/pages/DeviceList.vue";
import Map from "@/pages/Map.vue";
import Notifications from "@/pages/Notifications.vue";
import AuthService from "@/services/auth.service";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    beforeEnter: AuthService.guard,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "device-list",
        name: "Device List",
        component: DeviceList,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
    ],
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Register.vue"),
  },
];

export default routes;
