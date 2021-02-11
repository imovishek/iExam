import styled from "styled-components";
import { Radio } from "antd";
import { useState, useEffect } from "react";
import _ from 'underscore';

export const RadioWrapper = styled.div`
  padding: 5px;
  width: 50%;
  margin-bottom: 10px;
  border: 1px solid #b3b3b3;
`;

const MCQBody = ({
  disabled,
  options,
  answer,
  setAnswerValue
}) => {
  const [checkObj, setCheckObj] = useState({});
  useEffect(() => {
    if (answer) {
      setCheckObj({ [answer]: true });
    }
  }, [answer])
  return (
    <div>
      {options.map((option, index) => (
        <RadioWrapper rows="auto auto">
          <Radio
            disabled={disabled}
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
};

export default MCQBody;