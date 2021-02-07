import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { Button, Popconfirm } from "antd";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SunEditor from 'suneditor-react';
import katex from 'katex';

const SearchStyled = styled(Search)`
  width: 100%;
`;

const Container = styled.div`
  z-index: -1;
`;

const HeaderLabel = styled.div`
  color: grey;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: auto;
  margin-left: 5px;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

const QuestionBody = ({
  question
}) => {

  return (
    <Container>
      <SunEditor
        onImageUpload={() => {}}
        defaultValue="<p>The editor's default value</p>"
        setOptions={{
          toolbarContainer : '#toolbar_container',
          showPathLabel : false,
          charCounter : true,
          katex: katex,
          maxCharCount : 720,
          width : '100%',
          height : '100%',
          minHeight : '300px',
          maxHeight: '300px',
          buttonList : [
              ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
              ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
              ['link', 'math', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
          ],
          callBackSave : function (contents, isChanged) {
              console.log(contents);
          }
        }}
      />
    </Container>
  );
};

export default QuestionBody;