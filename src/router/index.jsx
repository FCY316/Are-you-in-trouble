import React, { lazy, Suspense } from "react";
import LoadingPage from "./LoadingPage";
import { useRoutes } from "react-router-dom";
import Layout from "@/Layout";

const Home = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/home")
);
const My = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/my")
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
        path: "/my",
        element: <My />,
      },
    ],
  },
];

const AppRouter = () => {
  const element = useRoutes(routeConfig);
  return <Suspense fallback={<LoadingPage />}>{element}</Suspense>;
};
export default AppRouter;
