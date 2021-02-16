import styled from 'styled-components';
import { Button } from 'antd';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';

const MiddleBigText = styled.div`
  font-size: 62px;
  color: red;
  text-align: center;
`;


const NotFound = ({ dispatch }) => (
  <div>
    <MiddleBigText>Not Found!</MiddleBigText>
    <MiddleBigText>
      <Button onClick={() => dispatch(push('/'))}>Go to Dashboard</Button>
    </MiddleBigText>
  </div>
);

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(NotFound);