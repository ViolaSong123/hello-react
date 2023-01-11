import Login from "@/views/Login";
import Home from "@/views/Home";
import NotFound from "@/components/404.jsx";

export const routerConfig = [
  {
    path: "/",
    component: Home,
    auth: true,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/404",
    component: NotFound,
    auth: true,
  },
];
