import { Button, Input, message, Tooltip } from "antd";
import styled from "styled-components";
import _ from "underscore";
import { Col, Row } from "../../../utitlities/styles";
import { LabelWrapper, RightButtonWrapper } from "../../styles/pageStyles";
import { AddPadding } from "../../Exams/Student/components/BroadBody";
import DraggableColumn from "./DraggableColumn";
import { useEffect, useState } from "react";
const { TextArea } = Input;
const TextWrapper = styled.span`
  font-size: 15px;
`;
const HeaderWrapper = styled.div`
  font-size: 17px;
  font-weight: 500;
  height: 40px;
  padding-left: 10px;
`;
const BodyWrapper = styled.div`
  line-height: 35px;
`;
const Container = styled.div`
  padding: 10px;
  margin-top: 10px;
`;
const MatchingBody = ({
  question,
  setAnswerValue,
  isEditing,
  isTeacherViewing,
  answer,
}) => {
  console.log(answer);
  const [matchingOptions, setMatchingOptions] = useState({});
  const [matchingIndexes, setMatchingIndexes] = useState({});

  useEffect(() => {
    const newMatchingOptions = getOptionsFromAnswer(
      answer,
      question.matchingOptions
    );
    console.log(answer, newMatchingOptions);
    setMatchingOptions(newMatchingOptions);
    const { leftSide, rightSide } = newMatchingOptions;
    const newIndexes = {};
    _.forEach(leftSide, (item, index) => {
      if (
        isTeacherViewing &&
        rightSide[index] &&
        item.matchingID === rightSide[index].id
      )
        newIndexes[index] = true;
    });
    setMatchingIndexes(newIndexes);
  }, [question, answer]);
  const getOptionsFromAnswer = (answer, matchingOptions) => {
    let parsedAnswer = [];
    try {
      parsedAnswer = JSON.parse(answer);
    } catch (e) {}
    const newLeftSide = [];
    const newRightSide = [];
    const { leftSide, rightSide } = matchingOptions;
    console.log("hhhheeee", answer, parsedAnswer, leftSide, rightSide);
    _.forEach(parsedAnswer, (ara) => {
      const left = _.find(leftSide, (v) => v.id === ara[0]);
      const right = _.find(rightSide, (v) => v.id === ara[1]);
      if (left) newLeftSide.push(left);
      if (right) newRightSide.push(right);
    });
    return {
      leftSide: newLeftSide,
      rightSide: newRightSide,
    };
  };
  const getAnswerFromOptions = ({ leftSide, rightSide }) => {
    const arr = [];
    const len = Math.max(leftSide.length, rightSide.length);
    for (let i = 0; i < len; i++) {
      const subarray = [];
      if (leftSide[i] && leftSide[i].id) subarray.push(leftSide[i].id);
      else subarray.push("");
      if (rightSide[i] && rightSide[i].id) subarray.push(rightSide[i].id);
      else subarray.push("");
      arr.push(subarray);
    }
    return JSON.stringify(arr);
  };
  const { leftSide = [], rightSide = [] } = matchingOptions;
  const minHeight = `${
    70 * Math.max(leftSide.length, rightSide.length) + 20
  }px`;
  return (
    <Container>
      <Col rows="1fr 10px">
        <Row columns="1fr 1fr">
          <DraggableColumn
            isEditing={isEditing}
            values={leftSide}
            matchingIndexes={matchingIndexes}
            minHeight={minHeight}
            setValues={(leftSide) => {
              setAnswerValue(
                getAnswerFromOptions({
                  ...matchingOptions,
                  leftSide,
                })
              );
            }}
          />
          <DraggableColumn
            isEditing={isEditing}
            values={rightSide}
            matchingIndexes={matchingIndexes}
            minHeight={minHeight}
            setValues={(rightSide) =>
              setAnswerValue(
                getAnswerFromOptions({
                  ...matchingOptions,
                  rightSide,
                })
              )
            }
          />
        </Row>
      </Col>
    </Container>
  );
};

export default MatchingBody;
