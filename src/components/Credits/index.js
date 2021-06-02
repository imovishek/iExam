import CheckAuthentication from '../CheckAuthentication/CheckAuthentication';
import NavBar from '../NavBar/NavBar';
import { BodyWrapper, Container } from '../../utitlities/styles';
import { PageHeader } from '../styles/pageStyles';
import CreditList from './CreditList'
const Credits=()=>(<div>
  <CheckAuthentication/>
  <BodyWrapper>
    <NavBar />
    <Container rows="80px 1fr">
      
      <CreditList/>
    </Container>
  </BodyWrapper>
</div>
)

export default Credits;