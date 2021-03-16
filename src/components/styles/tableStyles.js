import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  background: none;
  margin-top: 5px;
`;

export const TableHeaderChild = styled.div`
  flex: 1;
  font-weight: 600;
  color: grey;
  padding: 10px;
  text-align: center;
  height: 30px;
  line-height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  margin-top: 5px;
`;

export const TableRowChild = styled.div`
  flex: 1;
  font-weight: 400;
  padding: 10px;
  text-align: center;
  height: 60px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;

export const SpinWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
  height: 100%;
  width: 100%;
  z-index: 1000;
`;

export const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: auto;
  margin-left: 15px;
  margin-right: 15px;
`;

export const OperationWrapper = styled.div`
  float: right;
`;

export const CenterNoData = styled.div`
  text-align: center;
  font-size: 20px;
  color: grey;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TableRowHoverStyled = styled(TableRow)`
  cursor: pointer;
  background: none;
  :hover {
    background: #96c1c1;
    color: black;
  }
`