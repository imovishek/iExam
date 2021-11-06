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

const StyledSelect = styled(Select)`
  width: 100%;
`;

const Body = styled.div`
  overflow: auto;
  height: 100%;
`;

const CheckboxStyled = styled(Checkbox)`
  display: flex;
  padding: 10px;
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

const defaultLanguage = "py";
const languageMapping = {
  py: 'python',
  cpp: 'cpp'
}

const BroadAutoEvaluateModal = ({
  visible,
  setVisibility,
  question,
  paper,
  setPaper,
  submitPaperEvaluation,
}) => {

  const [code, setCode] = useState(defaultCode[defaultLanguage]);
  const [evaluationLang, setLang] = useState(defaultLanguage);
  const [isLightMode, setLightMode] = useState(true);
  const [isLoadingEvaluate, setLoadingEvaluate] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const [currentTab, setCurrentTab] = useState('code-editor');
  const [checkObj, setCheckObj] = useState({});
  const closeModal = () => {
    setEvaluations([]);
    setCurrentTab('code-editor');
    setCheckObj({});
    setVisibility(false)
  }

  const onSubmit = () => {
    closeModal()
  }
  const saveCodeHandler = async (showMessage = true) => {
    try {
      await api.updateQuestion(question, { evaluationCode: code, evaluationLang });
      if (showMessage)
        message.success("Code saved!")
    } catch (e) {

    }
  }
  const handleEvaluate = async () => {
    setLoadingEvaluate(true);
    try {
      const values = await Promise.all(paper.answers.map(async answer => {
        const { stdout, value } = await api.evaluateBroadQuestion(code, evaluationLang, (answer.answer || "").trim(), question.marks);
        return {
          answer: answer.answer,
          value,
          stdout,
        }
      }));
      setEvaluations(values);
      setCurrentTab("evaluation");
      saveCodeHandler(false);
    } catch (e) {
      console.log(e);
      message.error("Failed to evaluate!");
    } finally {
      setLoadingEvaluate(false);
    }
  }

  const submitHandler = async () => {
    setIsLoadingSubmit(true);
    paper.answers.map((answer, index) => {
      if (checkObj[index])
        answer.marks = evaluations[index].value;
    });
    setPaper({ ...paper });
    try {
      await submitPaperEvaluation();
    } catch (e) {

    } finally {
      setIsLoadingSubmit(false);
    }
    closeModal();
  }

  const checkAll = (e) => {
    const isChecked = e.target.checked;
    evaluations.forEach((evaluation, index) => {
      checkObj[index] = isChecked;
    })
    setCheckObj({ ...checkObj });
  }
  const checkMe = (e, index) => {
    const isChecked = e.target.checked;
    checkObj[index] = isChecked;
    setCheckObj({ ...checkObj });
  }
  

  function handleEditorChange(value, event) {
    setCode(value);
  }

  useEffect(() => {
    if (!question.evaluationCode) return setCode(defaultCode[defaultLanguage]);
    setCode(question.evaluationCode);
  }, [question.evaluationCode])

  useEffect(() => {
    if (!question.evaluationLang) return setLang(defaultLanguage);
    setLang(question.evaluationLang);
  }, [question.evaluationLang])

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
  const allSelected = _.every(evaluations, (evaluation, index) => checkObj[index]);
  const anySelected = _.any(evaluations, (evaluation, index) => checkObj[index]);
  return (
    <Modal
      title={'Auto Evaluate'}
      visible={visible}
      width={900}
      height={500}
      style={{ height: '700px' }}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      footer={[]}
    >
      <Tabs
        activeKey={currentTab}
        onChange={(activeKey => setCurrentTab(activeKey))}
        tabPosition="top"
      >
        <TabPane tab="Code" key="code-editor" style={{ height: "500px" }}>
          <Row style={{ marginBottom: '30px'  }} columns="120px 60px 1fr">
            <div>
              <StyledSelect
                placeholder="Language"
                value={evaluationLang}
                onChange={(value) => {
                  if (value === question.evaluationLang && question.evaluationCode)
                    setCode(question.evaluationCode);
                  else setCode(defaultCode[value])
                  setLang(value)
                }}
              >
                {_.map(allSupportedLanguage, (label, key) => <Option value={key} key={key}>{label}</Option> )}
                
              </StyledSelect>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Switch
                checkedChildren="Light"
                unCheckedChildren="Dark"
                defaultChecked
                onChange={(checked) => setLightMode(checked)}
              />
            </div>
            <RightButtonWrapper>
              <Button onClick={saveCodeHandler}>Save Code</Button>
            </RightButtonWrapper>
          </Row>
          <Editor
            theme={isLightMode ? 'light' : 'vs-dark'}
            height="100%"
            width="calc(100% - 5px)"
            language={languageMapping[evaluationLang]}
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
          />
        </TabPane>

        <TabPane tab="Evaluation" key="evaluation" style={{ height: "500px" }}>
          <Body>
            {!!evaluations.length && (
              <Row columns="60px 30px 1fr 1fr 1fr">
                <CheckboxStyled checked={allSelected} onChange={checkAll}>All</CheckboxStyled>
                <EvaluationRowHeader>#</EvaluationRowHeader>
                <EvaluationRowHeader>Answer</EvaluationRowHeader>
                <EvaluationRowHeader>Stdout</EvaluationRowHeader>
                <EvaluationRowHeader>Evaluation Mark ({question.marks})</EvaluationRowHeader>
              </Row>
            )}
            {!!evaluations.length && evaluations.map((evaluation, index) => (
              <Row isBodyRow columns="60px 30px 1fr 1fr 1fr" key={Math.random().toString(16)}>
                <CheckboxStyled checked={checkObj[index]} onChange={(e) => checkMe(e, index)}></CheckboxStyled>
                <EvaluationRow>{index+1}</EvaluationRow>
                <EvaluationRow>{(evaluation.answer || "").split("\n").map(line => <div key={Math.random().toString(16)}>{line}</div>)}</EvaluationRow>
                <EvaluationRow>{(evaluation.stdout || "").split("\n").map(line => <div key={Math.random().toString(16)}>{line}</div>)}</EvaluationRow>
                <Input
                  id={`evaluation-${index}`}
                  style={{ height: 'fit-content', width: 'fit-content' }}
                  value={evaluation.value}
                  onChange={e => {
                    evaluations[index].value = e.target.value;
                    setEvaluations([...evaluations]);
                    setTimeout(() => {
                      document.getElementById(`evaluation-${index}`).focus();
                    }, 100);
                  }}
                >
                </Input>
              </Row>
            ))}
            {!evaluations.length && <NoDataComponent title="You didn't evaluate yet"/>}
          </Body>
        </TabPane>
        
      </Tabs>
      
      
      <RightButtonWrapper style={{ marginTop: '10px' }}>
        <Button
          loading={isLoadingEvaluate}
          onClick={() => {
            setLoadingEvaluate(true);
            setTimeout(handleEvaluate, 500)
          }}
        >
          Evaluate
        </Button>

        {!!evaluations.length && (
          <StyledButton loading={isLoadingSubmit} onClick={submitHandler} type="primary" disabled={!anySelected}>
            Submit Evaluation
          </StyledButton>
        )}
        
      </RightButtonWrapper>
      
    </Modal>
  )
}

export default BroadAutoEvaluateModal;
