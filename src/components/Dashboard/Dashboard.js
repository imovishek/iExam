import CheckAuthentication from '../CheckAuthentication/CheckAuthentication'
import NavBar from '../NavBar/NavBar'
import { BodyWrapper, Container, Text } from '../../utitlities/styles'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

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
const Dashboard = ({ dispatch }) => {
  const redirectTo = path => {
    dispatch(push(`/${path}`))
  }
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="40px 30px">
          <Text>Welcome to dashboard</Text>
          <LinkWrapper onClick={() => redirectTo('logout')}> Logout </LinkWrapper>
        </Container>
      </BodyWrapper>

    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})
export default connect(null, mapDispatchToProps)(Dashboard)
