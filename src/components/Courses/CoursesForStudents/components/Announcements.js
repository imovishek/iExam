import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { stFormatDate, getDuration } from "../../../../utitlities/common.functions";
import { Button } from "antd";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SearchStyled = styled(Search)`
  width: 100%;
`;

const Container = styled.div`
  border-radius: 8px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Body = styled.div`
  overflow: auto;
  margin-top: 20px;
  max-height: 120px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const HeaderLabel = styled.div`
  color: grey;
  padding: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  padding: 10px;
  text-overflow: ellipsis;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  padding: 20px;
  border-radius: 5px;
  background: #538850;
  color: white;
  margin-top: 10px;
  user-select: none;
`;

const HeaderRow = styled.div`
  background: #d8d8d8;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  border-radius: 8px;
`;

const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ announcement }) => {
  return (
    <Row columns="repeat(1, 1fr)">
      {announcement}
    </Row>
  );
};

const Announcements = ({
  announcements
}) => {
  const [index, setIndex] = useState(0);
  return (
    <Container>
      <FontAwesomeIcon
        icon={faArrowLeft}
        style={{marginRight: '10px', cursor: 'pointer'}}
        onClick={() => setIndex(Math.max(0, index-1))}
      >
        Prev
      </FontAwesomeIcon>

      <FontAwesomeIcon
        icon={faArrowRight}
        style={{marginRight: '10px', cursor: 'pointer'}}
        onClick={() => setIndex(Math.min(announcements.length-1, index+1))}
      >
        Next
      </FontAwesomeIcon>

      <Button
        onClick={() => setIndex(0)}
        style={{float: 'right'}}
      >
        Latest
      </Button>

      <Body>
        <Card announcement={announcements[index]} />
      </Body>
    </Container>
  );
};

export default Announcements;