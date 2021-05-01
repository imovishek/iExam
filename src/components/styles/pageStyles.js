import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-gap: ${(props) => (props.gridGap ? props.gridGap : "20px")};
  grid-template-columns: ${(props) => props.columns || "auto"};
`;

export const HeaderRow = styled.div``;

export const BodyRow = styled.div`
  box-shadow: 0px 0px 5px #bbbbbb;
  border-radius: 8px;
  padding: 20px;
  border-radius: 8px;
`;

export const LabelWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
  user-select: none;
`;

export const TileHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "auto"};
  user-select: none;
`;
export const RightButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PageHeader = styled.h1`
  display: inline;
  user-select: none;
`;

export const SecondHeader = styled.h2`
  display: inline;
  user-select: none;
`;
