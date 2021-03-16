import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { BodyWrapper, Container, Row, Text } from '../../../utitlities/styles'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Calendar } from 'antd'
import DashboardCalender from './DashboardCalender'
import RecentAcivities from './RecentAcivities'

const LinkWrapper = styled.div`
  border: 1px solid green;
  background: #12a512;
  font-weight: 600;
  color: white;
  padding: 3px;
  :hover{
    color: white;
  }
  cursor: pointer;
  width: 60px;
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
`

const Dashboard = ({ dispatch }) => {
  const redirectTo = path => {
    dispatch(push(`/${path}`))
  }
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="40px 1fr">
          <Text>Welcome to Dashboard</Text>
          <FlexBox>
            <DashboardCalender />
            <RecentAcivities />
          </FlexBox>
          
        </Container>
      </BodyWrapper>

    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})
export default connect(null, mapDispatchToProps)(Dashboard)
