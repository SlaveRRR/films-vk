import styled from "styled-components";
import { Card as antdCard, Typography } from "antd";

const { Title: antdTitle, Text: antdText } = Typography;

export const { Meta } = antdCard;

export const Card = styled(antdCard)`
   & {
      width: 180px;
      border: 1px solid black;
   }
`;

export const Title = styled(antdTitle)`
   & {
      align-self: flex-start;
      color: black !important;
   }
`;
export const Text = styled(antdText)`
   & {
      display: flex;
      justify-content: flex-end;
      color: black;
   }
`;
