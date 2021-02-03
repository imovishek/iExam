import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import styled from 'styled-components';
import { connect } from "react-redux";
import { BodyWrapper, Container, Box, Text } from "../../utitlities/styles";

const Teachers = () => {
    return (
        <div>
            <CheckAuthentication />
            <BodyWrapper>
                <NavBar />
                <Container>
                    <Text>Teachers</Text>
                    <Box />
                    <Box height='40px' width='250px' bgColor='#39493c'/>
                    <Box height='800px' width='100px' bgColor='#4hj93c'/>
                </Container>
            </BodyWrapper>
            
        </div>
    )
};
const mapStateToProps = state => ({
    ...state
});
  
  
export default connect(mapStateToProps)(Teachers);
  