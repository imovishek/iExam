import { connect } from "react-redux";
import { push } from "connected-react-router";
import Login from "../Login/Login";
import { useEffect } from "react";
import { onAnExamStarted } from "../Exams/actions";

const Logout = ({ dispatch }) => {
  useEffect(() => {
    localStorage.clear();
    // remove the visibility logger
    dispatch(onAnExamStarted(null));
    dispatch(push("/login"));
  });
  return <Login />;
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(Logout);
