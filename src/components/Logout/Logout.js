import { useHistory } from "react-router-dom";
import { setUserAction } from "../Login/actions";
import { connect } from "react-redux";

const Logout = () => {
    const history = useHistory();
    localStorage.clear();
    history.push('/login');
    return (
      <div></div>
    )
};

export default Logout;