import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

export const HeaderRow = styled.div`
  height: 90px;
`;

export const BodyRow = styled.div`
  padding: 10px;
  height: calc(100vh - 340px);
  margin-bottom: 20px;
  margin-top: 30px;
  border: 1px solid rgba(10, 10, 10, 0.3);
`;

export const LabelWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
  user-select: none;
`;
export const TileHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  user-select: none;
  justify-content: space-between;
`;
export const RightButtonWrapper = styled.div`
  float: right;
`;

export const PageHeader = styled.div`
  display: inline;
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
`;