import React, { lazy, Suspense } from "react";
import LoadingPage from "./LoadingPage";
import { useRoutes } from "react-router-dom";
import Layout from "@/Layout";

const Home = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/home")
);
const Creation = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/creation")
);
const Heres = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/heres")
);
const Establish =lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/establish")
);
const routeConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/creation",
        element: <Creation />,
      },{
        path: "/heres",
        element: <Heres />,
      },{
        path: "/establish",
        element: <Establish />,
      },
    ],
  },
];

const AppRouter = () => {
  const element = useRoutes(routeConfig);
  return <Suspense fallback={<LoadingPage />}>{element}</Suspense>;
};
export default AppRouter;
