import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "./pageStyles";

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: none;
  margin-top: 5px;
`;

export const TableHeaderChild = styled.h2`
  flex: 1;
  padding: 10px;
  height: 30px;
  line-height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
`;

export const TableRowChild = styled.div`
  flex: 1;
  font-weight: 400;
  padding: 10px;
  height: 60px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  color: ${props => props.color || 'inherit'};
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

export const TableRowFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  background: none;
  border-bottom: 1px solid #d0d0d0;
  ${props => props.onClick ?
    `cursor: pointer;
    :hover {
      font-size: 18px;
    }` : ''}
  transition-duration: 100ms;
`
export const TableRowStyled = styled(Row)`
  background: none;
  border-bottom: 1px solid #d0d0d0;
  ${props => props.onClick ?
    `cursor: pointer;
     :hover {
       font-size: 18px;
     }` : ''} 
  transition-duration: 100ms;
  ${props => props.gridGap ?
    `grid-gap: ${props.gridGap}` : ''}
  ${props => props.isSelected ?
    `font-size: 18px;` : ''}
`;

export const TableWrapper = styled.div`
  padding: 20px;
`;