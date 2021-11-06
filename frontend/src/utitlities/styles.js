import styled from "styled-components";
import { Button } from "antd";
import { faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIconWrapper } from "../components/styles/tableStyles";

export const BodyWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
  align-items: space-around;
`;

export const Container = styled.div`
  display: grid;
  grid-template-rows: ${(props) => (props.rows ? props.rows : "none")};
  grid-template-columns: ${(props) => (props.columns ? props.columns : "none")};
  grid-gap: ${(props) => (props.gridGap ? props.gridGap : "none")};
  padding: 30px 20px;
  height: 100%;
  overflow: auto;
  flex-grow: 100;
`;

export const Text = styled.div`
  font-weight: 800;
  font-family: arial;
  color: #505250;
`;

export const StickyElement = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1000;
`;

export const Box = styled.div`
  background: ${(props) => props.bgColor || "none"};
  width: ${(props) => props.width || "200px"};
  height: ${(props) => props.height || "70px"};
  display: block;
`;

export const Row = styled.div`
  display: grid;
  grid-gap: ${(props) => (props.gridGap ? props.gridGap : "20px")};
  grid-template-columns: ${(props) => props.columns || "auto"};
`;

export const Col = styled.div`
  display: grid;
  grid-gap: ${(props) => (props.gridGap ? props.gridGap : "20px")};
  grid-template-rows: ${(props) => props.rows || "none"};
`;
export const ButtonStyled = styled(Button)`
  height: 32px;
  margin-left: 10px;
  transition-duration: 500ms;
`;

export const CenterText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const iconMapper = {
  delete: faTrash,
  accept: faCheckCircle,
};

const colorMapper = {
  delete: "#a02f2f",
  accept: "green",
};
export const AwesomeIcon = (props) => (
  <FontAwesomeIconWrapper
    icon={props.type ? iconMapper[props.type] : faCheckCircle}
    color={props.type ? colorMapper[props.type] : "green"}
    onClick={props.onClick ? props.onClick : () => {}}
  />
);
export const FlexWrapAround = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const LinkStyled = styled.a``;