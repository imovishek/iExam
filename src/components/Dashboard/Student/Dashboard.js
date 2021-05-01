import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { BodyWrapper, Container } from '../../../utitlities/styles'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import DashboardCalender from './DashboardCalender'
import RecentAcivities from './RecentAcivities'
import { PageHeader } from '../../styles/pageStyles'

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
        <Container rows="80px 1fr">
          <PageHeader>Welcome to Dashboard</PageHeader>
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
