import styled from "styled-components";
import { Radio } from "antd";
import { useState, useEffect } from "react";
import { AddPadding } from "./BroadBody";
import { BodyWrapper, MCQBodyWrapper } from "../../styles";

export const RadioWrapper = styled.div`
  padding: 5px;
  width: 50%;
  margin-bottom: 10px;
  border: 1px solid #b3b3b3;
`;

const MCQBody = ({
  question,
  isEditing = false,
  options,
  answer,
  setAnswerValue,
}) => {
  const [checkObj, setCheckObj] = useState({});
  useEffect(() => {
    if (answer) {
      setCheckObj({ [answer]: true });
    }
  }, [answer]);
  return (
    <div>
      <BodyWrapper>
        <AddPadding>
          <MCQBodyWrapper> {question.body}</MCQBodyWrapper>
        </AddPadding>
      </BodyWrapper>
      {options.map((option, index) => (
        <RadioWrapper key={index} rows="auto auto">
          <Radio
            checked={checkObj[index]}
            onClick={() => {
              if (isEditing) {
                setAnswerValue(index);
                setCheckObj({ [index]: true });
              }
            }}
          >
            {option.value}
          </Radio>
        </RadioWrapper>
      ))}
    </div>
  );
};

export default MCQBody;
