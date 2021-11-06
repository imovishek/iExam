import React, { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";
import { Switch } from "antd";


const defaultCode = `#include<bits/stdc++.h>
using namespace std;

int main() {

  return 0;
}
`;

const CodeEditor = ({ question, setQuestionValue }) => {
  const [code, setCode] = useState(defaultCode);
  const [isLightMode, setLightMode] = useState(true);
  function handleEditorChange(value, event) {
    setCode(value);
    setQuestionValue('defaultCode', value);
  }
  useEffect(() => {
    setCode(question.defaultCode);
    if (!question.defaultCode) setQuestionValue('defaultCode', defaultCode);
  }, [question.defaultCode])

  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco)
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }
  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }
  return (
    <>
      <div style={{ marginBottom: '30px'  }}>
        <span> Mode: </span>
        <Switch
          checkedChildren="Light"
          unCheckedChildren="Dark"
          defaultChecked
          onChange={(checked) => setLightMode(checked)}
        />
      </div>
      

      <Editor
        theme={isLightMode ? 'light' : 'vs-dark'}
        height="calc(100% - 60px)"
        width="calc(100% - 5px)"
        defaultLanguage="cpp"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
      />
    </>
    
  );
}

export default CodeEditor;
