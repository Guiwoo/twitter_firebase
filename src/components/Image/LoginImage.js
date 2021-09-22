import React from "react";
import styled from "styled-components";
import mainImage from "../../assets/twittMain.png";

const MainImage = styled.img`
  width: 330px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: 2px solid white;
`;

const LoginImage = () => {
  return (
    <>
      <MainImage src={mainImage} />
    </>
  );
};

export default LoginImage;
