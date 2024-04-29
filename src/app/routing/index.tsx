import React, { FC } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import { FILMS, HOME,FILM } from "./config";
import { FilmsPage, HomePage,FilmPage } from "../../pages";



const MainRouter: FC = () => {
   const resultPaths: RouteObject[] = [
      { path: HOME, element: <HomePage /> },
      { path: FILMS, element: <FilmsPage /> },
      { path: FILM, element: <FilmPage /> },
      { path: "*", element: <Navigate to={"/"} replace /> },
   ];

   return useRoutes(resultPaths);
};

export default MainRouter;
