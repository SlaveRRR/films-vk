import React, { FC, useEffect, useState } from "react";
import { Button, Flex, Image, Table, Text, Title } from "./styles";
import { IFilm, ResponseFilms } from "../../types/films";

import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { Link } from "react-router-dom";

const LIMIT = 10;
const apiUrl = " https://api.kinopoisk.dev/v1.4/";

const maxPage = 100;

const columns: ColumnsType<IFilm> = [
   {
      title: "Id",
      dataIndex: "id",
      key: "id",
   },
   {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { name }) => <Title level={4}>{name}</Title>,
   },
   {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, { shortDescription }) => <Text>{shortDescription}</Text>,
   },
   {
      title: "Poster",
      key: "poster",
      dataIndex: "poster",
      render: (_, { poster }) => (
         <Image
            src={poster.previewUrl}
            height={150}
            style={{
               width: "100%",
               objectFit: "cover",
            }}
            alt="poster"
         />
      ),
   },
   {
      title: "Year",
      dataIndex: "year",
      key: "year",
   },
   {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (_, { rating }) => rating.kp,
   },
   {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (_, { id }) => <Link to={`/films/${id}`}>К фильму</Link>,
   },
];

const FilmsTable: FC = () => {
   const [page, setPage] = useState<number>(1);
   const [dataSource, setDataSource] = useState<IFilm[]>();
   const [isLoading, setLoading] = useState<boolean>(false);

   const getData = async (page: number, limit: number) => {
      setLoading(true);

      const response = await axios.get<ResponseFilms>(
         `${apiUrl}movie?page=${page}&limit=${limit}&selectFields=id&selectFields=name&selectFields=year&selectFields=shortDescription&selectFields=movieLength&selectFields=poster&selectFields=rating&selectFields=genres&selectFields=releaseYears&type=movie&sortField=votes.kp&sortType=-1`,
         {
            headers: {
               "X-API-KEY": "Q1KQG8F-X2K4TP2-N3Y4TEM-G0TY6S7",
               "Content-Type": "application/json",
            },
         },
      );
      const {
         data: { docs: films },
      } = response;

      setDataSource(films);

      setLoading(false);
   };

   useEffect(() => {
      getData(page, LIMIT);
   }, [page]);

   return (
      <div className="container">
         <Table dataSource={dataSource} columns={columns} loading={isLoading} pagination={false} />
         <Flex gap="middle" justify="center">
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
               Назад
            </Button>
            <Text>{page}</Text>
            <Button disabled={page === maxPage} onClick={() => setPage(page + 1)}>
               Вперёд
            </Button>
         </Flex>
      </div>
   );
};
export default FilmsTable;
