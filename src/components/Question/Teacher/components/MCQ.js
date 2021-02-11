import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { Button, Popconfirm, Select, Input, Radio } from "antd";
import { faTrash, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SunEditor from 'suneditor-react';
import katex from 'katex';
import { LabelWrapper, RightButtonWrapper, TileHeaderWrapper } from "../../../styles/pageStyles";
import React, { useState, useEffect } from "react";
import { deepCopy } from "../../../../utitlities/common.functions";
import { questions } from "../../../../utitlities/dummy";

const { Option } = Select;
const SearchStyled = styled(Search)`
  width: 100%;
`;

const Container = styled.div`
  overflow: auto;

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
const QuestionBodyRow = styled.div`
  padding: 10px;
  height: 500px;
  margin-bottom: 20px;
  margin-top: 30px;
  border: 1px solid rgba(10, 10, 10, 0.3);
`;

const InputWrapper = styled(Input)`
  && {
    width: 100%;
  }
`;

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`;


const MCQ = ({
  question,
  setQuestionValue
}) => {
  const defaultOption = { value: '', isAnswer: false };
  const defaultOptions = [
    deepCopy(defaultOption),
    deepCopy(defaultOption),
    deepCopy(defaultOption),
    deepCopy(defaultOption)
  ];
  const [options, setOptions] = useState(question.options || defaultOptions);

  const setOptionValue = (index, key, value) => {
    const newOptions = [ ...options ];
    newOptions[index][key] = value;
    setOptions(newOptions);
    setQuestionValue('options', newOptions);
  };

  useEffect(() => {
    const newOptions = (question.options && question.options.length) ?
      question.options :
      defaultOptions;
    setOptions(newOptions);
  }, [question.options])

  return (
    <Container>
      <LabelWrapper>Question</LabelWrapper>
      <InputWrapper
        placeholder="Enter the question"
        value={question.body}
        onChange={(e) => setQuestionValue('body', e.target.value)}
      />
      <Row style={{ width: '100%', marginTop: "20px" }}>
        <TileHeaderWrapper>
          <div></div>
          <RightButtonWrapper>
            <Button
              type="primary"
              onClick={() => {
                const newOptions = [...options, deepCopy(defaultOption)];
                setOptions(newOptions);
                setQuestionValue('options', newOptions);
              }}
            >
              + Option
            </Button>
          </RightButtonWrapper>
        </TileHeaderWrapper>
        
      </Row>
      <Row columns="1fr" style={{marginTop: '20px', overflow: 'auto', maxHeight: '300px'}}>
        {
          _.map(options, (option, index) => (
            <div>
              <Radio
                checked={option.isAnswer}
                onClick={() => {
                  const newOptions = _.map(options, (option, optIndex) => ({
                    ...option,
                    isAnswer: optIndex === index,
                  }));
                  setOptions(newOptions);
                  setQuestionValue('options', newOptions);
                }}
                style={{width: '500px'}}
              >
                <InputWrapper  value={option.value} onChange={(e) => setOptionValue(index, 'value', e.target.value)}/>
              </Radio>
              <Button
                style={{marginLeft: '30px'}}
                danger
                onClick={() => {
                  const newOptions = _.filter(options, (option, opIndex) => {
                    return opIndex !== index;
                  });
                  setOptions(newOptions);
                  setQuestionValue('options', options);
                }}
              > Remove </Button>
            </div>
          ))
        }
      </Row>
      
    </Container>
  );
};

export default MCQ;