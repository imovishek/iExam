import { Button, Input, message, Tooltip } from "antd";
import styled from "styled-components";
import _ from "underscore";
import { Col, Row } from "../../../../utitlities/styles";
import { LabelWrapper, RightButtonWrapper } from "../../../styles/pageStyles";
import { AddPadding } from "../../../Exams/Student/components/BroadBody";
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
const MatchingBody = ({ question, setQuestionValue }) => {
  const [matchingOptions, setMatchingOptions] = useState({});
  const [matchingIndexes, setMatchingIndexes] = useState({});

  useEffect(() => {
    setMatchingOptions(question.matchingOptions);
    const { leftSide, rightSide } = question.matchingOptions;
    const newIndexes = {};
    _.forEach(leftSide, (item, index) => {
      if (rightSide[index] && item.matchingID === rightSide[index].id)
        newIndexes[index] = true;
    });
    setMatchingIndexes(newIndexes);
  }, [question]);

  const showAnswerHandler = () => {
    const leftSide = [...matchingOptions.leftSide];
    const rightSide = [...matchingOptions.rightSide];
    const newRightSide = [];
    let error = 0;
    const st = new Set();
    _.forEach(leftSide, (item) => {
      const index = _.findIndex(rightSide, { id: item.matchingID });
      if (index === -1) error++;
      else {
        newRightSide.push(rightSide[index]);
        st.add(index);
      }
    });
    if (error > 0) {
      message.error(`${error} options doesn't have answer, please set answer!`);
      return;
    }
    _.forEach(rightSide, (item, index) => {
      if (!st.has(index)) newRightSide.push(item);
    });

    setQuestionValue("matchingOptions", {
      ...matchingOptions,
      rightSide: newRightSide,
    });
    message.info("Corresponding row shows the answer");
  };

  return (
    <Container>
      <Col rows="30px 50px 1fr 10px">
        <RightButtonWrapper>
          <Tooltip title="Values in the corresponding row will be set as answers">
            <Button onClick={showAnswerHandler}>Show Answer</Button>
            <Button
              onClick={() => {
                const newLeftSide = [...matchingOptions.leftSide];
                _.forEach(newLeftSide, (a, index) => {
                  a.matchingID = matchingOptions.rightSide[index].id;
                });
                setQuestionValue("matchingOptions", {
                  ...matchingOptions,
                  leftSide: newLeftSide,
                });
                message.success(
                  "Values in the corresponding row are set as answers"
                );
              }}
            >
              Set Answer
            </Button>
          </Tooltip>
        </RightButtonWrapper>
        <Row columns="1fr 1fr">
          <DraggableColumn
            values={matchingOptions.leftSide || []}
            matchingIndexes={matchingIndexes}
            setValues={(leftSide) =>
              setQuestionValue("matchingOptions", {
                ...matchingOptions,
                leftSide,
              })
            }
          />
          <DraggableColumn
            values={matchingOptions.rightSide || []}
            matchingIndexes={matchingIndexes}
            setValues={(rightSide) =>
              setQuestionValue("matchingOptions", {
                ...matchingOptions,
                rightSide,
              })
            }
          />
        </Row>
      </Col>
    </Container>
  );
};

export default MatchingBody;
