import styled from 'styled-components'
import _ from 'underscore'
import { Button, Input, Radio } from 'antd'
import { LabelWrapper, RightButtonWrapper, TileHeaderWrapper } from '../../../styles/pageStyles'
import React, { useState, useEffect } from 'react'
import { deepCopy } from '../../../../utitlities/common.functions'

const Container = styled.div`
  overflow: auto;

`
const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
`

const InputWrapper = styled(Input)`
  && {
    width: 100%;
  }
`

const MCQ = ({
  question,
  setQuestionValue
}) => {
  const defaultOption = { value: '', isAnswer: false }
  const defaultOptions = [
    deepCopy(defaultOption),
    deepCopy(defaultOption),
    deepCopy(defaultOption),
    deepCopy(defaultOption)
  ]
  const [options, setOptions] = useState(question.options || defaultOptions)

  const setOptionValue = (index, key, value) => {
    const newOptions = [...options]
    newOptions[index][key] = value
    setQuestionValue('options', newOptions)
  }

  useEffect(() => {
    const newOptions = (question.options && question.options.length)
      ? question.options
      : (
        question.options || defaultOptions
      );
    setOptions(newOptions)
  }, [question.options])

  return (
    <Container>
      <InputWrapper
        placeholder="Enter the question"
        value={question.body}
        onChange={(e) => setQuestionValue('body', e.target.value)}
      />
      <Row style={{ width: '100%', marginTop: '20px' }}>
        <TileHeaderWrapper>
          <div></div>
          <RightButtonWrapper>
            <Button
              type="primary"
              onClick={() => {
                const newOptions = [...options, deepCopy(defaultOption)]
                setQuestionValue('options', newOptions)
              }}
            >
              + Option
            </Button>
          </RightButtonWrapper>
        </TileHeaderWrapper>

      </Row>
      <Row columns="1fr" style={{ marginTop: '20px', overflow: 'auto', maxHeight: '300px' }}>
        {
          _.map(options, (option, index) => (
            <div>
              <Radio
                checked={option.isAnswer}
                onClick={() => {
                  const newOptions = _.map(options, (option, optIndex) => ({
                    ...option,
                    isAnswer: optIndex === index
                  }))
                  setQuestionValue('options', newOptions)
                }}
                style={{ width: '500px' }}
              >
                <InputWrapper value={option.value} onChange={(e) => setOptionValue(index, 'value', e.target.value)}/>
              </Radio>
              <Button
                style={{ marginLeft: '30px' }}
                danger
                onClick={() => {
                  const newOptions = _.filter(options, (option, opIndex) => opIndex !== index)
                  setQuestionValue('options', newOptions)
                }}
              > Remove </Button>
            </div>
          ))
        }
      </Row>

    </Container>
  )
}

export default MCQ
