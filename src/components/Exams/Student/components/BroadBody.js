import { Input } from "antd";
import styled from "styled-components";
import { BodyWrapper, Col } from "../../../../utitlities/styles";
import { LabelWrapper } from "../../../styles/pageStyles";
import { BroadBodyWrapper } from "../../styles";
const { TextArea } = Input;

const BroadAnswer = styled.pre`
  border: 1px solid #888888;
  box-shadow: 0 1px 1px 0px;
  margin: 3px;
  padding: 10px;
  font-size: 14px;
`;

export const AddPadding = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const BroadBody = ({ question, isEditing = false, answer, setAnswerValue }) => (
  <div>
    <AddPadding>
      <BroadBodyWrapper dangerouslySetInnerHTML={{ __html: question.body }} />
    </AddPadding>
    <Col rows="30px 1fr 5px">
      <LabelWrapper>Answer:</LabelWrapper>
      <AddPadding>
        {isEditing && (
          <TextArea
            style={{ width: "500px" }}
            value={answer}
            onChange={(e) => setAnswerValue(e.target.value)}
            rows={4}
          />
        )}
        {!isEditing && <BroadAnswer>{answer}</BroadAnswer>}
      </AddPadding>
    </Col>
  </div>
);

export default BroadBody;
