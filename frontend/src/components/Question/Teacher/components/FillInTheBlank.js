import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";
import { getQuestionSplitFBlank } from "../../../../utitlities/common.functions";
import _ from 'underscore';
import { Input } from "antd";
import { LabelWrapper } from "../../../styles/pageStyles";

const Container = styled.div`
  z-index: -1;
`;
const TextWrapper = styled.span`
  font-size: 15px;
`;
const HeaderWrapper = styled.div`
  font-size: 17px;
  font-weight: 500;
  height: 40px;
  padding-left: 10px;
`;
const renderFBlank = (questionBody) => {
  const array = getQuestionSplitFBlank(questionBody);
  return _.map(array, (ele, index) => {
    if (index === array.length - 1) return <TextWrapper key={index}>{ele.text}</TextWrapper>;
    else
      return (
        <span key={index}>
          <TextWrapper>{ele.text}</TextWrapper>
          <Input
            style={{
              width: ele.width,
              height: "30px",
            }}
          />
        </span>
      );
  });
}

const FillInTheBlank = ({ question, setQuestionValue }) => (
  <Container>
    <TextArea
      width="400px"
      value={question.body}
      onChange={(e) => setQuestionValue("body", e.target.value)}
    />
    <div style={{ marginTop: '30px' }}>
      <LabelWrapper>Preview:</LabelWrapper>
      {renderFBlank(question.body)}
    </div>
  </Container>
);

export default FillInTheBlank;
