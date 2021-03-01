import { Input } from "antd";
import styled from "styled-components";
import _ from "underscore";
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

const BodyWithInputs = ({ isEditing, body, answer, setAnswerValue }) => {
  const array = body.split("$blank$");
  let parsedAnswer = [];
  try {
    parsedAnswer = JSON.parse(answer);
  } catch (e) {}
  return _.map(array, (val, index) => {
    if (index === 0) return <TextWrapper key={index}>{val}</TextWrapper>;
    else
      return (
        <span key={index}>
          <Input
            disabled={!isEditing}
            style={{
              background: isEditing ? "white" : "#ffffff",
              color: "black",
              width: "100px",
              height: "30px",
            }}
            value={parsedAnswer[index - 1]}
            onChange={(e) => {
              parsedAnswer[index - 1] = e.target.value;
              setAnswerValue(JSON.stringify(parsedAnswer));
            }}
          />
          <TextWrapper>{val}</TextWrapper>
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
