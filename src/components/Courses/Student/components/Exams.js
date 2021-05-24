import styled from "styled-components";
import _ from "underscore";
import {
  stFormatDate,
  splitDuration,
  getExamStatus,
  smartLabel,
  getExamTimeStatus,
  NoDataComponent,
} from "../../../../utitlities/common.functions";
import { useState, useEffect } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { TableRowStyled } from "../../../styles/tableStyles";

const Container = styled.div`
  border-radius: 8px;
  padding: 10px;
`;

const Body = styled.div`
  overflow: auto;
  max-height: 450px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const HeaderLabel = styled.h3`
  padding: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  padding: 10px;
  text-overflow: ellipsis;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${(props) => props.columns || "auto"};
  
  :hover {
    background: #d2e3e8;
  }
  cursor: pointer;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${(props) => props.columns || "auto"};
  border-radius: 8px;
  
`;
const Card = ({ exam, onClick }) => {
  const [detailDuration, setDetailDuration] = useState("");
  useEffect(() => {
    if (exam && exam._id) {
      const interval = setInterval(() => {
        const examTimeStatus = getExamTimeStatus(exam);
        if (examTimeStatus) setDetailDuration(examTimeStatus);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [exam]);

  return (
    <TableRowStyled columns="repeat(5, 1fr)" onClick={onClick}>
      <Wrapper>{exam.title}</Wrapper>
      <Wrapper>{stFormatDate(exam.startDate)}</Wrapper>
      <Wrapper>{splitDuration(exam.duration)}</Wrapper>
      <Wrapper>{smartLabel(getExamStatus(exam))}</Wrapper>
      <Wrapper>{detailDuration}</Wrapper>
    </TableRowStyled>
  );
};

const Exams = ({ exams, dispatch }) => {
  const isNoData = !exams || exams.length === 0;
  return (
    <Container rows="55px 1fr">
      <HeaderRow columns="repeat(5, 1fr)">
        <HeaderLabel>Title</HeaderLabel>
        <HeaderLabel>Start Date</HeaderLabel>
        <HeaderLabel>Duration</HeaderLabel>
        <HeaderLabel>Status</HeaderLabel>
        <HeaderLabel></HeaderLabel>
      </HeaderRow>
      <Body>
        {isNoData && (
          <NoDataComponent title="No exams created for this course" />
        )}
        {!isNoData &&
          _.map(exams, (exam, index) => (
            <Card
              key={`exam_${index}`}
              exam={exam}
              onClick={() => dispatch(push(`/exam/${exam._id}`))}
            />
          ))}
      </Body>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Exams);
