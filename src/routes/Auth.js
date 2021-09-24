import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "components/Auth/Layout";
import { TopBox } from "components/Auth/Topbox";
import LoginImage from "components/Image/LoginImage";
import Title from "components/Auth/Title";
import ErrorMsg from "components/ErrorMsg";
import { useHistory } from "react-router";
import { doc, setDoc } from "@firebase/firestore";
import styled from "styled-components";
import myRoute from "variables/routeName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const SBottomBox = styled.div``;
const LinkA = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: gold;
    transform: scale(1.1);
  }
`;
const LinkBox = styled.div`
  margin-bottom: 10px;
  text-align: center;
  cursor: pointer;
`;
const SocialLoginBox = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 7px 20px;
    border: none;
    border-radius: 10px;
    &:hover {
      color: gold;
      transform: scale(1.1);
    }
  }
`;
const GoogleLoginBox = styled.button`
  margin-right: 10px;
  font-weight: 600;
`;
const GithubLoginBox = styled.button`
  font-weight: 600;
`;

const Auth = () => {
  const [active, setActive] = useState(true);
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();
  const history = useHistory();
  const onValid = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(authService, email, password);
      await setDoc(doc(dbService, "users", authService.currentUser.uid), {
        id: authService.currentUser.uid,
        displayName: authService.currentUser.displayName,
        isLike: false,
      });
    } catch (error) {
      history.push("/");
      const errorCode = error.code;
      console.log(errorCode);
      if (errorCode === "auth/user-not-found") {
        setAuthError("유저를 찾을수 없습니다.");
      }
      return;
    }
  };
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(authService, provider);
        GoogleAuthProvider.credentialFromResult(result);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      }
    } else if (name === "github") {
      provider = new GithubAuthProvider();
      const result = await signInWithPopup(authService, provider);
      GithubAuthProvider.credentialFromResult(result);
    }
  };
  useEffect(() => {
    if (touchedFields.email && touchedFields.password) {
      setActive(false);
    }
  }, [touchedFields]);
  return (
    <Layout>
      <Title />
      <LoginImage />
      <TopBox>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("email", {
              required: "이메일 을 입력해주세요 !",
              maxLength: 50,
            })}
            type="email"
            placeholder="Email.."
          />
          {errors?.email ? <ErrorMsg message={errors.email.message} /> : null}
          <input
            {...register("password", {
              required: "비밀번호 를 입력해주세요 !",
              minLength: {
                value: 6,
                message: "Password must be at least 6 letters",
              },
            })}
            type="password"
            placeholder="Password.."
          />
          {errors?.password ? (
            <ErrorMsg message={errors.password.message} />
          ) : null}
          <input type="submit" value={"로그인"} disabled={active} />
          {authError !== "" ? <ErrorMsg message={authError} /> : null}
        </form>
      </TopBox>
      <SBottomBox>
        <LinkBox>
          <LinkA to={myRoute.CREATEACC}>
            <span>계정 만들러 가기....</span>
            <FontAwesomeIcon icon={faArrowRight} size={"lg"} />
          </LinkA>
        </LinkBox>
        <SocialLoginBox>
          <GoogleLoginBox name="google" onClick={onSocialClick}>
            <FontAwesomeIcon
              icon={faGoogle}
              size={"lg"}
              style={{ marginRight: "3px" }}
            />
            <sapn>계정으로 시작하기</sapn>
          </GoogleLoginBox>
          <GithubLoginBox name="github" onClick={onSocialClick}>
            <FontAwesomeIcon
              icon={faGithub}
              size={"lg"}
              style={{ marginRight: "3px" }}
            />
            <sapn>계정으로 시작하기</sapn>
          </GithubLoginBox>
        </SocialLoginBox>
      </SBottomBox>
    </Layout>
  );
};

export default Auth;
