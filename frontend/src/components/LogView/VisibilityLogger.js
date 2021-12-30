import { useEffect } from "react";
import { connect } from "react-redux";
import { onAnExamStarted } from "../Exams/actions";
import moment from "moment";
import { logVisibility } from "../../utitlities/api";

const VisibilityLogger = ({ user, runningExam, dispatch }) => {
  const logger = async () => {
    if (document.visibilityState !== "visible") {
      if (runningExam === null) return;
      if (moment().isAfter(runningExam.examEnd)) {
        dispatch(onAnExamStarted(null));
        return;
      }

      try {
        await logVisibility(user.credential.email, {
          examStart: runningExam.examStart,
          examEnd: runningExam.examEnd.toISOString(),
          examName: runningExam.examName,
          courseName: runningExam.courseName,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    // console.log(runningExam);
    if (runningExam) document.addEventListener("visibilitychange", logger);
    else document.removeEventListener("visibilitychange", logger);

    return () => {
      document.removeEventListener("visibilitychange", logger);
    };
  }, [runningExam]);

  return <></>;
};

const mapStateToProps = (state) => ({
  runningExam: state.examData.currentRunningExam,
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityLogger);
