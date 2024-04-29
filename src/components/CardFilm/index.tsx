import React, { FC } from "react";
import { IFilm } from "../../types/films";
import { Flex, Image } from "antd";
import { Card, Meta, Text, Title } from "./styles";

interface ICardFilmProps {
   film: IFilm;
   testid: string;
}

const CardFilm: FC<ICardFilmProps> = ({
   film: {
      name,
      poster,
      shortDescription,
      rating: { kp },
      year,
   },
   testid,
}) => {
   return (
      <Card
         hoverable
         cover={
            <Image
               src={poster.previewUrl}
               style={{
                  width: "100%",
                  objectFit: "cover",
               }}
               alt="poster"
            />
         }
      >
         <Title level={2}>{kp}</Title>
         <Meta title={name} description={shortDescription} />
         <Text>{year}</Text>
      </Card>
   );
};

export default CardFilm;
