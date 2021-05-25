import CheckAuthentication from '../CheckAuthentication/CheckAuthentication'
import NavBar from '../NavBar/NavBar'
import { BodyWrapper, Container } from '../../utitlities/styles'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { PageHeader } from '../styles/pageStyles'
import {primaryColor} from '../../utitlities/global.config';

const LinkWrapper = styled.button`
  border: none;
  background: ${primaryColor};
  font-weight: 400;
  color: white;
  padding: 0 10px;
  :hover{
    color: white;
  }
  cursor: pointer;
  width: fit-content;
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
        <Container rows="80px 30px">
          <PageHeader>Welcome to dashboard</PageHeader>
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
