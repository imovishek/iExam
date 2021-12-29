import { useEffect } from "react";
import { connect } from "react-redux";
import { onAnExamStarted } from "../Exams/actions";
import moment from "moment";

const VisibilityLogger = ({ runningExam, dispatch }) => {
  const logger = () => {
    if (document.visibilityState !== "visible") {
      if (runningExam === null) return;
      if (moment().isAfter(runningExam.examEnd)) {
        dispatch(onAnExamStarted(null));
        return;
      }

      console.log(runningExam);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", logger);

    return () => {
      document.removeEventListener("visibilitychange", logger);
    };
  });

  return <></>;
};

const mapStateToProps = (state) => ({
  runningExam: state.examData.currentRunningExam,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityLogger);
