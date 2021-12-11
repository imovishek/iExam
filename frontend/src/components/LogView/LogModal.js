import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { onViewStudentLog } from "../Exams/actions";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ViewLogs = ({ student, dispatch }) => {
  const [isVisible, setVisible] = useState(student._id);

  useEffect(() => {
    if (student._id) setVisible(true);
    else setVisible(false);
  }, [student]);

  const closeModal = () => dispatch(onViewStudentLog({}));

  const banOrUnabn = () => {
    student.bnFunc();
    closeModal();
  };

  return (
    <Modal
      title={`Log of ${student.firstName} ${student.lastName} (${student.registrationNo})`}
      visible={isVisible}
      footer={[
        <Button key="2" danger onClick={banOrUnabn}>
          {student.bnText}
        </Button>,
        <Button key="1" type="primary" onClick={closeModal}>
          Close
        </Button>,
      ]}
      closeIcon={
        <FontAwesomeIcon onClick={closeModal} icon={faTimes}></FontAwesomeIcon>
      }
    >
      Hellow student
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  student: state.examData.viewLogForStudent,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewLogs);
