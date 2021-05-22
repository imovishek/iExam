import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Select } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import { ButtonStyled, Container } from "../../../../utitlities/styles";
import { Row } from "../../../styles/pageStyles";
import { FontAwesomeIconWrapper } from "../../../styles/tableStyles";
import { onUpdateClarificationTab } from "../../actions";
import Announcements from "./Announcements";
import AskClarificationModal from "./AskClarificationModal";
import Clarifications from "./Clarifications";
const { Option } = Select;

const ContainerStyled = styled(Container)`
  border-radius: 8px;
  min-height: 260px;
  height: calc(100vh - 160px);
  padding: 20px;
  box-shadow: 3px 3px 15px #bbbbbb;
`;

const StyledSelect = styled(Select)`
  .ant-select-arrow {
    top: 17px; 
  }
`;
const ClarificationOrAnnouncement = ({
  exam,
  clarifications,
  setClarificationsUpdated,
  clarificationTab,
  dispatch,
  user
}) => {
  const ANNOUNCEMENT = 'Announcements';
  const CLARIFICATION = 'Clarifications';
  const [showAskClarificationModal, setShowAskClarificationModal] = useState(false);
  return (
    <>
      <AskClarificationModal
        visible={showAskClarificationModal}
        setVisibility={setShowAskClarificationModal}
        exam={exam}
        user={user}
        updateClarificationsOnUI={() => setClarificationsUpdated({})}
      />
      <ContainerStyled rows="55px 1fr">
        <Row columns="1fr 1fr">
          <StyledSelect onChange={(v) => dispatch(onUpdateClarificationTab(v))} value={clarificationTab} style={{ width: '200px' }} >
            {[ANNOUNCEMENT, CLARIFICATION].map(item => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </StyledSelect>
          {clarificationTab === CLARIFICATION && (
            <ButtonStyled type="primary" onClick={() => setShowAskClarificationModal(true)}>
              Ask a question
              <FontAwesomeIconWrapper icon={faQuestionCircle}/>
            </ButtonStyled> 
          )}
          
        </Row>
        {clarificationTab === ANNOUNCEMENT && (
          <Announcements exam={exam}/>
        )}
        {clarificationTab === CLARIFICATION && (
          <Clarifications exam={exam} clarifications={clarifications}/>
        )}
      </ContainerStyled>
      
      
    </>
  ); 
};


const mapStateToProps = (state) => ({
  clarificationTab: state.examData.clarificationTab,
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ClarificationOrAnnouncement);
