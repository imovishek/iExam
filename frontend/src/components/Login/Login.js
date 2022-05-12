import { Input, Button, message } from "antd";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import styled from "styled-components";
import api, { apiLogin, logLogin } from "../../utitlities/api";
import { connect } from "react-redux";
import { setUserAction } from "./actions";
import { push } from "connected-react-router";
import backgroundImage from "../../images/loginBackground.svg";
import Loading from "../Common/Loading";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ipInfo from "ipinfo";

const fontColor = "#49006b";

const BodyWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
const TitleColumn = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-left: 6vw;
  padding-top: 25vh;
  width: 60vw;
`;

const FormColumn = styled.div`
  width: 40vw;
  display: flex;
  justify-content: center;
  margin-top: 20vh;
`;

const SubWrapper = styled.div`
  width: 365px;
  height: 300px;
  padding: 30px 20px;
  border-radius: 14px;
  --antd-wave-shadow-color: none;
  .ant-input:hover {
    border-color: white;
    border-right-width: 0px !important;
  }
  .ant-input:focus {
    border-color: white;
    border-right-width: 0px !important;
  }

  input:-internal-autofill-selected {
    appearance: menulist-button;
    background-color: #f6f6f7;
    background-image: none !important;
    color: -internal-light-dark(black, white) !important;
  }
`;

const InputWrapper = styled(Input)`
  margin-bottom: 14px;
  height: 44px !important;
  border-radius: 8px;
  font-size: 14px;
  border: 0px solid grey;
  background-color: #f6f6f7;
`;

const ButtonWrapper = styled(Button)`
  width: 50%;
  height: 44px;
  border-radius: 8px;
  margin-right: 14px;
  margin-bottom: 10px;
  background-color: ${fontColor};
`;
const TextWrapper = styled.p`
  display: inline-block;
`;
const SpinWrapper = styled.div`
  text-align: center;
  width: 40vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 1000;
  background: rgba(225, 223, 223, 0.53);
`;
const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  cursor: pointer;
  height: 44px;
  margin-left: 10px;
  margin: auto;
  ${(props) => (props.loading ? "animation: rotate 2s linear infinite;" : "")}
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const fontStyleObject = { color: "white", padding: "0", margin: "0" };
const SignInText = styled.h3`
  color: #49006b;
  font-size: 280%;
  font-weight: bold;
  margin-top: -2vh;
`;
const setLocalStorage = (user, token) => {
  const {
    firstName,
    lastName,
    credential: { email, userType },
  } = user;
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("email", email);
  localStorage.setItem("userType", userType);
  localStorage.setItem("token", token);
};
const Login = ({ setUser, dispatch }) => {
  const [isForgotPassword, setIsForgotPassword] = useState(
    window.location.pathname === "/forgotPassword"
  );
  const tryToLogin = async (email, password) => {
    try {
      const { data: res } = await apiLogin(email, password);

      if (res.error) {
        setIsLoading(false);
        return message.error(res.message);
      }
      localStorage.clear();
      const user = await jwt.decode(res.token);
      setUser(user);
      if (!user) {
        setIsLoading(false);
        return message.error("Something went wrong please try again later!");
      }
      setLocalStorage(user, res.token);
      if (user.userType === "student") {
        ipInfo("", "dccee228e5daa1", async (err, cLoc) => {
          if (err) cLoc = { Message: "Could not get IP information" };
          await logLogin(user.credential.email, cLoc);
          setIsLoading(false);
          dispatch(push("/"));
        });
      } else {
        setIsLoading(false);
        dispatch(push("/"));
      }
    } catch (e) {
      console.log(e);
      message.error("Something went wrong please try again later!");
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onEnterLogin = () => {
    setIsLoading(true);
    tryToLogin(email, password);
  };

  const onResetPassword = async () => {
    setIsLoading(true);
    try {
      const { error, message: msg } = await api.forgotPassword(email);
      console.log(error, msg);
      if (error) {
        message.error(msg);
      } else {
        message.success(msg);
        dispatch(push("/login"));
      }
    } catch (e) {
      console.log(e);
      message.error("Something went wrong! please try again later!");
    }
    setIsLoading(false);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      onEnterLogin();
    }
  };

  return (
    <BodyWrapper>
      <TitleColumn>
        <h4 style={{ ...fontStyleObject, fontSize: "120%" }}>Welcome To</h4>
        <h1 style={{ ...fontStyleObject, fontSize: "350%" }}>SUST Online</h1>
        <h1 style={{ ...fontStyleObject, fontSize: "420%" }}>
          Exam Management System
        </h1>
      </TitleColumn>

      <FormColumn>
        <SubWrapper>
          <SignInText>Sign In</SignInText>
          <label style={{ color: fontColor, fontWeight: "bold" }}>Email</label>
          <InputWrapper
            placeholder="Enter email"
            value={email}
            onKeyPress={handleKeypress}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isForgotPassword && (
            <>
              <label style={{ color: fontColor, fontWeight: "bold" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <InputWrapper
                  placeholder="Enter password"
                  type={showPassword ? "" : "password"}
                  value={password}
                  onKeyPress={handleKeypress}
                  onChange={(e) => setPassword(e.target.value)}
                  // addonAfter={
                  //   <FontAwesomeIcon
                  //     icon={faEye}
                  //     onClick={() => setShowPassword(!showPassword)}
                  //   />
                  // }
                />
                <div
                  style={{ position: "absolute", right: "10px", top: "0px" }}
                >
                  <FontAwesomeIconStyled
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
            </>
          )}
          <div>
            <ButtonWrapper
              type="primary"
              onClick={isForgotPassword ? onResetPassword : onEnterLogin}
            >
              {isForgotPassword ? "Reset Password" : "Enter"}
            </ButtonWrapper>
            {!isForgotPassword && (
              <TextWrapper>
                {" "}
                <a href="/forgotPassword" style={{ color: fontColor }}>
                  {" "}
                  Forgotten Password
                </a>{" "}
              </TextWrapper>
            )}
            {isForgotPassword && (
              <TextWrapper>
                {" "}
                <a href="/login" style={{ color: fontColor }}>
                  {" "}
                  Login
                </a>{" "}
              </TextWrapper>
            )}
          </div>
          {isLoading ? (
            <SpinWrapper>
              <Loading isLoading={true} style={{ left: "20vw" }} />
            </SpinWrapper>
          ) : null}
        </SubWrapper>
      </FormColumn>
    </BodyWrapper>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUserAction(user)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
