import React, { FC } from "react";
import { IFilm } from "../../types/films";
import { Flex, Image } from "antd";
import { Card, Meta, Text, Title } from "./styles";
import { useNavigate } from "react-router-dom";

interface ICardFilmProps {
   film: IFilm;
}

const CardFilm: FC<ICardFilmProps> = ({
   film: {
      id,
      name,
      poster,
      shortDescription,
      rating: { kp },
      year,
   },
}) => {
   const navigate = useNavigate();
   return (
      <Card
         hoverable
         cover={
            <Image
               onClick={(e) => e.stopPropagation()}
               src={poster.previewUrl}
               style={{
                  width: "100%",
                  objectFit: "cover",
               }}
               alt="poster"
            />
         }
      >
         <div onClick={() => navigate(`/films/${id}`)}>
            <Title level={2}>{kp}</Title>
            <Meta title={name} description={shortDescription} />
            <Text>{year}</Text>
         </div>
      </Card>
   );
};

export default CardFilm;
