import styled from "styled-components";

export const Btn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor};
  &:hover {
    color: gold;
    transform: scale(1.1);
  }
`;

export const trimText = (text) => {
  const stringArray = String(text).split(".");
  return `${stringArray[0]}.${stringArray.slice(0, 1)}`;
};

export const ClickHere = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  color: ${(props) => props.theme.gold};
  @keyframes rolling {
    0% {
      transform: translateY(0px);
      transform: scale(1);
    }
    50% {
      transform: translateY(10px);
      transform: scale(1.5);
    }
    100% {
      transform: translateY(0px);
      transform: scale(1);
    }
  }
  animation: rolling 0.5s linear infinite;
`;
