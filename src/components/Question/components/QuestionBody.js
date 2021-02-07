import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { Button, Popconfirm } from "antd";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

const CKEditorStyled = styled(CKEditor)`
  z-index: -1;
  height: 100%;
`;

const renderCKEditor = () => {
  return (
    <CKEditorStyled
          editor={ ClassicEditor }
          data="<p>Hello from CKEditor 5!</p>"
          onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              console.log( { event, editor, data } );
          } }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
      />
  );
};


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