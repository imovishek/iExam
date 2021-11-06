import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Input, message, Modal, Select, Switch, Tabs } from 'antd';
import _ from 'underscore';
import Editor from "@monaco-editor/react";
import api from '../../../utitlities/api';
import { RightButtonWrapper } from '../../styles/pageStyles';
import { NoDataComponent } from '../../../utitlities/common.functions';
import { allSupportedLanguage } from '../../../utitlities/constants';

const { Option } = Select
const { TabPane } = Tabs;

const { TextArea } = Input;
const Row = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'none'};
  grid-gap: 10px;
  border-bottom: ${props => props.isBodyRow ? '1px solid #dcdcdc' : 'none'};
`
const EvaluationRowHeader = styled.div`
  font-weight: 800;
  padding: 10px;
`;

const EvaluationRow = styled.div`
  padding: 10px;
  overflow: auto;
  text-overflow: wrap;
  max-height: 100px;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`

const EditorStyled = styled(Editor)`
  border: 1px solid #bbbbbb;
`;

const CollpaseBar = styled.div`
  background: #d5b3e5;
  display: flex;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TextAreaStyled = styled(TextArea)`
  margin-bottom: 10px;
  width: calc(100% - 20px);
  font-family: 'Courier New', monospace;
`;
const defaultCode = {
  py: `import sys
answer = sys.argv[1]
totalMarks = int(sys.argv[2])
print (totalMarks) #giving all the marks
`,
  cpp: `#include<bits/stdc++.h>
using namespace std;
int toNumber(string st) {
    int num = 0;
    for (int i = 0; i<st.size(); i++)
      num = num*10 + st[i] - '0';
    return num;
}

int main(int argc, char const *argv[]) {
    string answer = string(argv[1]);
    int totalMarks = toNumber(string(argv[2]));

    cout << totalMarks << endl;
    return 0;
}
`
};

const defaultLanguage = "cpp";
const languageMapping = {
  cpp: 'cpp'
}

const CodeIDE = ({ value, onChange }) => {

  const [code, setCode] = useState(defaultCode[defaultLanguage]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isBarCollapsed, setBarCollapsed] = useState(true);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setCode(value || '');
    console.log(value || '');
  }, [value]);
  function handleEditorChange(value, event) {
    setCode(value);
    onChange(value);
  }

  const runCode = async () => {
    setLoading(true);
    try {
      const res = await api.runCode(code, input);
      setOutput(res.stdout);
    } catch (e) {

    }
    setLoading(false);
  }


  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco)
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }
  return (
    <Row>
      <div>
        <div>Language: C++</div>
        <EditorStyled
          theme="light"
          height="400px"
          width="calc(100% - 5px)"
          language="cpp"
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          beforeMount={handleEditorWillMount}
          onValidate={() => {}}
        />
      </div>
      <CollpaseBar onClick={() => setBarCollapsed(!isBarCollapsed)}>{isBarCollapsed ? 'v' : '^'}</CollpaseBar>
      {!isBarCollapsed && (
        <div>
          <Row columns="1fr 1fr">
            <div>
              <p>Input:</p>
              <TextAreaStyled
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <p>Output:</p>
              <TextAreaStyled
                value={output}
                rows={4}
              />
            </div>
          </Row>
          
          <Button loading={isLoading} onClick={runCode}> Run </Button>
        </div>
      )}
      
    </Row>
  )
}

export default CodeIDE;
