import React from "react";
import styled from "styled-components";
import original from "assets/original.jpeg";

const TheTitle = styled.div`
  color: white;
  font-weight: 600;
  font-size: 46px;
  text-align: center;
  margin-bottom: 10px;
`;
export const CoreTitle = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  @keyframes rolling {
    from {
      border: 2px solid white;
    }
    to {
      border: 2px solid gold;
      transform: rotatey(360deg);
    }
  }
  animation: rolling 3s linear infinite;
`;
const SubTitle = styled.div`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
`;
const Title = () => {
  return (
    <TheTitle>
      <CoreTitle src={original} />
      <SubTitle>To the moon..</SubTitle>
    </TheTitle>
  );
};

export default Title;
