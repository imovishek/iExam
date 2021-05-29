import React from "react";
import styled from "styled-components";

const NextExamWrapper = styled.div`
  margin-left: 25px;
  background: linear-gradient(
    180deg,
    rgba(17, 38, 77, 0.82) 0%,
    rgba(73, 0, 107, 0.82) 100%
  );
  padding: 20px 20px 20px 20px;
  min-height: 20vh;
  min-width: max-content;
  padding: 20px 20px 20px 20px;
  border-radius: 20px;
  margin-bottom: 30px;
  display:flex;
  align-items:center;
  justify-content:center;
`;


const headerTextStyleObject = { padding: "0", margin: "0", color: "white"};

const EmptyNextExamCard = () => (
  <NextExamWrapper>
    <h1 style={headerTextStyleObject}>No Upcoming Exams</h1>
  </NextExamWrapper>
);

export default EmptyNextExamCard;
