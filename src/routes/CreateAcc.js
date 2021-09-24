import { createUserWithEmailAndPassword } from "@firebase/auth";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "components/Auth/Layout";
import Title from "components/Auth/Title";
import { TopBox } from "components/Auth/Topbox";
import ErrorMsg from "components/ErrorMsg";
import LoginImage from "components/Image/LoginImage";
import { authService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GoToBack = styled.div`
  display: flex;
  justify-content: center;
`;
const ALink = styled(Link)`
  display: flex;
  text-align: center;
  color: white;
  text-decoration: none;
  align-items: center;
  &:hover {
    color: gold;
    transform: scale(1.1);
  }
`;

const CreateAcc = () => {
  const history = useHistory();
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();
  const onValid = async (data) => {
    const { email, password, password2, displayName } = data;
    if (password !== password2) {
      setAuthError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(authService, email, password);
    } catch (e) {
      console.log(e);
    } finally {
      history.push("/", displayName);
    }
  };
  return (
    <Layout>
      <Title />
      <LoginImage />
      <TopBox>
        <div>
          <form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("email", {
                required: "이메일 이 필요합니다.",
                maxLength: 50,
              })}
              type="email"
              placeholder="이메일.."
            />
            {errors?.email ? <ErrorMsg message={errors.email.message} /> : null}
            <input
              {...register("displayName", {
                required: "닉네임이 필요합니다.",
                maxLength: 20,
                minLength: 4,
              })}
              type="text"
              placeholder="닉네임 설정.."
            />
            {errors?.displayName ? (
              <ErrorMsg message={errors.displayName.message} />
            ) : null}
            <input
              {...register("password", {
                required: "비밀번호가 필요합니다. !",
                minLength: {
                  value: 6,
                  message: "6자 이상의 비밀번호가 필요합니다.",
                },
              })}
              type="password"
              placeholder="비밀번호.."
            />
            <input
              {...register("password2", {
                required: "비밀번호가 일치하지 않습니다. !",
                minLength: {
                  value: 6,
                  message: "6자 이상의 비밀번호가 필요합니다.",
                },
              })}
              type="password"
              placeholder="비밀번호 확인.."
            />
            {authError !== "" ? <ErrorMsg message={authError} /> : null}
            <input type="submit" value="계정 만들기.!" />
          </form>
        </div>
      </TopBox>
      <GoToBack>
        <ALink to={"/"}>
          <span>로그인 페이지로 돌아가기</span>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="s"
            style={{ marginLeft: "5px" }}
          />
        </ALink>
      </GoToBack>
    </Layout>
  );
};

export default CreateAcc;
