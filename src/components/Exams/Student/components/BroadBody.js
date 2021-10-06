import { Input } from "antd";
import styled from "styled-components";
import SunEditor from 'suneditor-react'
import katex from 'katex'
import { ANSWER_TYPES, ANSWER_TYPE_VALUES } from "../../../../utitlities/constants";
import { BodyWrapper, Col, Row } from "../../../../utitlities/styles";
import { LabelWrapper } from "../../../styles/pageStyles";
import { BroadBodyWrapper } from "../../styles";
import CodeIDE from "../../Common/CodeIDE";
const { TextArea } = Input;

const BroadAnswer = styled.div`
  border: 2px solid #000000;
  max-height: 500px;
  overflow: auto;
  margin: 3px;
  padding: 10px;
  font-size: 16px;
  width: fit-content;
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
        {isEditing && (!question.answerType || question.answerType === ANSWER_TYPE_VALUES.PLAIN_TEXT) && (
          <TextArea
            style={{ width: "500px" }}
            value={answer}
            onChange={(e) => setAnswerValue(e.target.value)}
            rows={4}
          />
        )}
        {isEditing && (question.answerType === ANSWER_TYPE_VALUES.RICH_TEXT) && (
          <SunEditor
            onImageUpload={() => {}}
            defaultValue={answer}
            setOptions={{
              toolbarContainer: '#toolbar_container',
              showPathLabel: false,
              charCounter: true,
              katex: katex,
              maxCharCount: 2048,
              width: '100%',
              height: '100%',
              minHeight: '20px',
              maxHeight: '250px',
              buttonList: [
                ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                ['link', 'math', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
              ],
              callBackSave: function (contents, isChanged) {
              }
            }}
            onChange={(content) => {
              setAnswerValue(content)
            }}
          />
        )}
        {isEditing && (question.answerType === ANSWER_TYPE_VALUES.CODE) && (
          <CodeIDE
            value={answer}
            onChange={(code) => {
              setAnswerValue(code)
            }}
          />
        )}
        {!isEditing && <BroadAnswer>{(answer || "").split('\n').map((line, index) => <div key={index}>{line}</div>)}</BroadAnswer>}
      </AddPadding>
    </Col>
  </div>
);

export default BroadBody;
