import styled from "styled-components";

const Container = styled.div`
  height: 415px;
  width: 100%;
  border: 1px solid #f1f1f1;
  margin-left: 20px;
  border-radius: 8px;
  padding: 10px;
`;

const HeaderWrapper = styled.div`
  color: grey;
`
const RecentAcivities = () => (
  <Container>
    <HeaderWrapper> Recent Activities </HeaderWrapper>
  </Container>
);

export default RecentAcivities;
