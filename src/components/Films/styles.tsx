import { Switch as antdSwitch, Flex as antdFlex, Typography } from "antd";
import styled from "styled-components";

export const { Text } = Typography;
export const Flex = styled(antdFlex)`
   margin-bottom: 1em;
`;
export const Switch = styled(antdSwitch)`
   &.ant-switch {
      outline-offset: 1px;
      &:hover {
         background: #0f58be;
      }
   }
   &.ant-switch.ant-switch-checked {
      background: #1677ff;
      &:hover {
         background: #0f58be;
      }
   }
   &.ant-switch {
      background: #1677ff;
   }
`;
