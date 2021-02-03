import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { BodyWrapper, Container, Text } from "../../utitlities/styles";
import styled from "styled-components";

const LinkWrapper = styled(Link)`
  border: 1px solid green;
  background: #12a512;
  font-weight: 600;
  color: white;
  padding: 3px;
  :hover{
    color: white;
  }
`;
const Dashboard = () => {
    return (
        <div>
            <CheckAuthentication />
            <BodyWrapper>
                <NavBar />
                <Container>
                    <Text>Welcome to dashboard</Text>
                    <LinkWrapper to='/logout'> Logout </LinkWrapper>
                </Container>
            </BodyWrapper>
            
        </div>
    )
};

export default Dashboard;
