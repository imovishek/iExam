import styled from 'styled-components'
import SunEditor from 'suneditor-react'
import katex from 'katex'

const Container = styled.div`
  z-index: -1;
`

const Broad = ({
  question,
  setQuestionValue
}) => (
  <Container>
    <SunEditor
      onImageUpload={() => {}}
      defaultValue={question.body}
      setOptions={{
        toolbarContainer: '#toolbar_container',
        showPathLabel: false,
        charCounter: true,
        katex: katex,
        maxCharCount: 720,
        width: '100%',
        height: '100%',
        minHeight: '300px',
        maxHeight: '300px',
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
        setQuestionValue('body', content)
      }}
    />
  </Container>
)

export default Broad
