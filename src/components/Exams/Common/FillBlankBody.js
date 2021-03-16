import { Input } from "antd";
import styled from "styled-components";
import _ from "underscore";
import { getQuestionSplitFBlank } from "../../../utitlities/common.functions";
import { Col } from "../../../utitlities/styles";
import { LabelWrapper } from "../../styles/pageStyles";
import { AddPadding } from "../Student/components/BroadBody";
const { TextArea } = Input;
const TextWrapper = styled.span`
  font-size: 15px;
`;
const HeaderWrapper = styled.div`
  font-size: 17px;
  font-weight: 500;
  height: 40px;
  padding-left: 10px;
`;

const BodyWithInputs = ({ isEditing, body: questionBody, answer, setAnswerValue }) => {
  const array = getQuestionSplitFBlank(questionBody);
  let parsedAnswer = [];
  try {
    parsedAnswer = JSON.parse(answer);
  } catch (e) {}
  return _.map(array, (ele, index) => {
    if (index === array.length - 1) return <TextWrapper key={index}>{ele.text}</TextWrapper>;
    else
      return (
        <span key={index}>
          <TextWrapper>{ele.text}</TextWrapper>
          <Input
            disabled={!isEditing}
            style={{
              background: isEditing ? "white" : "#ffffff",
              color: "black",
              width: ele.width,
              height: "30px",
            }}
            value={parsedAnswer[index]}
            onChange={(e) => {
              parsedAnswer[index] = e.target.value;
              setAnswerValue(JSON.stringify(parsedAnswer));
            }}
          />
        </span>
      );
  });
};
const BodyWrapper = styled.div`
  line-height: 35px;
`;
const Container = styled.div`
  padding: 10px;
  margin-top: 10px;
`;
const FillBlankBody = ({
  question,
  isEditing = false,
  answer,
  setAnswerValue,
}) => (
  <Container>
    <Col rows="30px 1fr 10px">
      <HeaderWrapper>Fill in the blanks.</HeaderWrapper>
      <BodyWrapper>
        <BodyWithInputs
          isEditing={isEditing}
          body={question.body}
          answer={answer}
          setAnswerValue={setAnswerValue}
        />
      </BodyWrapper>
    </Col>
  </Container>
);

export default FillBlankBody;
