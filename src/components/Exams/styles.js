import styled from "styled-components";
import { CenterText } from "../../utitlities/styles";

export const BroadBodyWrapper = styled.div``;
export const MCQBodyWrapper = styled.div`
  font-size: 18px;
`;
export const BodyWrapper = styled.div`
  overflow: auto;
  padding: 10px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export const TimeDiffWrapper = styled.div`
  font-size: 25px;
  font-weight: 1200;
  -webkit-text-stroke: 1px #315261;
  color: #464141;
  white-space: nowrap;
  color: rgb(9, 151, 255);
  -webkit-text-stroke: 1px #6697c1;
`;

export const ExamTitleWrapper = styled(CenterText)`
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
  align-items: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;