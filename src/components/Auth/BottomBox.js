import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { authService } from "fBase";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import myRoute from "variables/routeName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

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

const BottomBox = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      const result = await signInWithPopup(authService, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
    } else if (name === "github") {
      provider = new GithubAuthProvider();
      const result = await signInWithPopup(authService, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
    }
  };
  return (
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
  );
};

export default BottomBox;
