import styled from 'styled-components'
import { Button } from 'antd'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { LabelWrapper, PageHeader, RightButtonWrapper, TileHeaderWrapper } from '../../../styles/pageStyles'
import { ButtonStyled } from '../../../../utitlities/styles'

const Container = styled.div`
  border-radius: 8px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  height: calc(100vh - 150px);
`

const Body = styled.div`
  overflow: auto;
  height: calc(100vh - 230px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  padding: 20px;
  border-radius: 5px;
  margin-top: 10px;
  user-select: none;
`

const Card = ({ announcement }) => (
  <Row style={{background: '#de912d', color: 'white'}} columns="repeat(1, 1fr)">
    {announcement}
  </Row>
)

const Announcements = ({
  announcements
}) => {
  const [index, setIndex] = useState(0)
  return (
    <Container rows="55px 55px 1fr">
      <TileHeaderWrapper columns="1fr">
        <PageHeader>Announcements</PageHeader>
      </TileHeaderWrapper>
      
      <Row columns="1fr 1fr">
        <div>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={() => setIndex(Math.max(0, index - 1))}
          >
            Prev
          </FontAwesomeIcon>

          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={() => setIndex(Math.min(announcements.length - 1, index + 1))}
          >
            Next
          </FontAwesomeIcon>
        </div>
        <RightButtonWrapper>
          <ButtonStyled
            onClick={() => setIndex(0)}
            style={{ float: 'right' }}
          >
            Latest
          </ButtonStyled>
        </RightButtonWrapper>
      </Row>
      <Body>
        <Card announcement={announcements[index]} />
      </Body>
    </Container>
  )
}

export default Announcements
