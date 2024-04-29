import React, { FC, useEffect } from "react";
import { IFilm, ResponseFilms } from "../../types/films";
import CardFilm from "../CardFilm";
import { Row, Col, Spin, Empty } from "antd";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { BlockObserver } from "./styles";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 12;
const apiUrl = " https://api.kinopoisk.dev/v1.4/";

const DymanicPagination: FC = () => {
   const { ref, inView } = useInView({
      threshold: 0.5,
   });

   const getData = async (page: number, limit: number) => {
      try {
         const response = await axios.get<ResponseFilms>(
            `${apiUrl}movie?page=${page}&limit=${limit}&selectFields=id&selectFields=name&selectFields=year&selectFields=shortDescription&selectFields=movieLength&selectFields=poster&selectFields=rating&selectFields=genres&selectFields=releaseYears&type=movie&sortField=votes.kp&sortType=-1`,
            {
               headers: {
                  "X-API-KEY": "Q1KQG8F-X2K4TP2-N3Y4TEM-G0TY6S7",
                  "Content-Type": "application/json",
               },
            },
         );

         return { films: response.data.docs, page: response.data.page };
      } catch (error) {
         alert(error);
      }
   };

   const { data, isFetching, fetchNextPage } = useInfiniteQuery({
      queryKey: ["films"],
      queryFn: async ({ pageParam }) => {
         const resp = await getData(pageParam, LIMIT);
         return resp;
      },
      getNextPageParam: (lastPage, allPages) => lastPage && lastPage.page + 1,
      initialPageParam: 1,
   });

   useEffect(() => {
      if (inView) {
         fetchNextPage();
      }
   }, [inView]);

   return (
      <div className="container">
         <h1>Films</h1>
         <Spin spinning={isFetching} fullscreen />
         {data ? (
            <Row align="top" gutter={[{ xs: 8, sm: 12, md: 24, lg: 32 }, 24]}>
               {data.pages.map((el) =>
                  el?.films.map((film, i) => (
                     <Col key={i} sm={12} md={4}>
                        <CardFilm testid={"movies"} film={film} />
                     </Col>
                  )),
               )}
            </Row>
         ) : (
            <Empty />
         )}
         {!isFetching && <BlockObserver data-testid="observer" ref={ref}></BlockObserver>}
      </div>
   );
};

export default DymanicPagination;
