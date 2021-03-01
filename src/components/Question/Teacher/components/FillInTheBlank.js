import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";

const Container = styled.div`
  z-index: -1;
`;

const FillInTheBlank = ({ question, setQuestionValue }) => (
  <Container>
    <TextArea
      value={question.body}
      onChange={(e) => setQuestionValue("body", e.target.value)}
    />
  </Container>
);

export default FillInTheBlank;
