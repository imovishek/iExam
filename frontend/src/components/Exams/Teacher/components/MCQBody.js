import styled from 'styled-components'
import { Radio } from 'antd'
import { useState, useEffect } from 'react'

export const RadioWrapper = styled.div`
  padding: 5px;
  width: 50%;
  margin-bottom: 10px;
  border: ${props => props.hasAnswerBorder ? '2px' : '1px'} solid ${props => props.hasAnswerBorder ? '#f7a730' : '#b3b3b3'};
`

const MCQBody = ({
  disabled,
  options,
  answer,
  showAnswer = false,
  setAnswerValue
}) => {
  const [checkObj, setCheckObj] = useState({})
  useEffect(() => {
    if (answer) {
      setCheckObj({ [answer]: true })
    }
  }, [answer])
  return (
    <div>
      {options.map((option, index) => (
        <RadioWrapper key={index} rows="auto auto" hasAnswerBorder={showAnswer && option.isAnswer}>
          <Radio
            checked={checkObj[index]}
            onClick={() => {
              // setAnswerValue(index);
              // setCheckObj({ [index]: true });
            }}
          >{option.value}</Radio>
        </RadioWrapper>
      ))}
    </div>
  )
}

export default MCQBody
