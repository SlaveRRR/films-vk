import React, { FC } from "react";
import { IFilm } from "../../types/films";
import { Image } from "antd";
import { Card, Meta, Text, Title } from "./styles";

interface ICardFilmProps {
   film: IFilm;
}

const CardSimilar: FC<ICardFilmProps> = ({ film: { name, poster } }) => {
   if (!poster?.url || !name) {
      return;
   }
   return (
      <Card
         hoverable
         cover={
            <Image
               onClick={(e) => e.stopPropagation()}
               src={poster.previewUrl}
               style={{
                  width: "240px",
                  height: "100%",
                  objectFit: "cover",
               }}
               alt="poster"
            />
         }
      >
         <Meta title={name} />
      </Card>
   );
};

export default CardSimilar;
