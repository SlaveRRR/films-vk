import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, Image, Spin, Tag, Typography } from "antd";
import axios from "axios";
import { IFilm } from "../../types/films";
import { useParams } from "react-router-dom";
import CardSimilar from "../CardSimilar";

interface IFilmOne extends IFilm {
   description: string;
   movieLength: number;
   premiere: {
      country: string;
      world: string;
      russia: string;
      digital: string;
      cinema: string;
      bluray: string;
      dvd: string;
   };
   similarMovies: IFilm[] | null;
   sequelsAndPrequels: IFilm[] | null;
}

const { Text, Title } = Typography;

const obj: Record<string, string> = {
   драма: "#800020",
   комедия: "#000080",
   мелодрама: "#FFC0CB",
   ужасы: "#FF0000",
   боевик: "#0000FF",
   криминал: " #800080",
};

const apiUrl = " https://api.kinopoisk.dev/v1.4/";

const Film: FC = () => {
   const { id } = useParams();
   const getData = async (id: number) => {
      try {
         const response = await axios.get<IFilmOne>(`${apiUrl}movie/${id}`, {
            headers: {
               "X-API-KEY": "Q1KQG8F-X2K4TP2-N3Y4TEM-G0TY6S7",
               "Content-Type": "application/json",
            },
         });

         return response.data;
      } catch (error) {
         alert(error);
      }
   };
   const { data, isLoading } = useQuery({
      queryKey: ["film", id],
      queryFn: () => getData(Number(id)),
   });
   return (
      <div className="container">
         {isLoading ? (
            <Spin fullscreen spinning={isLoading} />
         ) : (
            <>
               <Flex gap={15}>
                  <Image
                     src={data?.poster.previewUrl}
                     style={{
                        objectFit: "cover",
                        width: "400px",
                        height: "100%",
                     }}
                  />
                  <Flex vertical gap={20}>
                     <Flex align="center" gap={15}>
                        <Title>{data?.name}</Title>
                        <Title level={3}>{data?.rating.kp}</Title>
                     </Flex>
                     <Text>{data?.description}</Text>
                     <Text strong>Продолжительность: {data?.movieLength} мин.</Text>
                     <Text strong>
                        Дата выхода: {"неизвестно" || new Date(data?.premiere.world as string).toDateString()}
                     </Text>
                     <Flex gap={10}>
                        <Text>Жанры:</Text>
                        <Flex gap={5} wrap="wrap">
                           {data?.genres.map((el) => <Tag color={obj[el.name] || "#808080"}>{el.name}</Tag>)}
                        </Flex>
                     </Flex>
                  </Flex>
               </Flex>
               {(data?.similarMovies || data?.sequelsAndPrequels) && (
                  <Flex vertical>
                     <Title level={3}>Похожие фильмы</Title>
                     <Flex justify="center" wrap="wrap" gap={10}>
                        {data?.similarMovies && data?.similarMovies.map((el) => <CardSimilar key={el.id} film={el} />)}
                        {data?.sequelsAndPrequels &&
                           data?.sequelsAndPrequels.map((el) => <CardSimilar key={el.id} film={el} />)}
                     </Flex>
                  </Flex>
               )}
            </>
         )}
      </div>
   );
};
export default Film;
