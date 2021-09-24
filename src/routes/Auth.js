import { signInWithEmailAndPassword } from "@firebase/auth";
import { authService, dbService } from "fBase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "components/Auth/Layout";
import { TopBox } from "components/Auth/Topbox";
import LoginImage from "components/Image/LoginImage";
import Title from "components/Auth/Title";
import ErrorMsg from "components/ErrorMsg";
import { useHistory } from "react-router";
import { doc, setDoc } from "@firebase/firestore";
import BottomBox from "components/Auth/BottomBox";

const Auth = () => {
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    formState,
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
          <input type="submit" value={"로그인"} />
          {authError !== "" ? <ErrorMsg message={authError} /> : null}
        </form>
      </TopBox>
      <BottomBox />
    </Layout>
  );
};

export default Auth;
