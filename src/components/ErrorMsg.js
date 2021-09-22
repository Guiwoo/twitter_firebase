import React from "react";
import styled from "styled-components";

const MessageBox = styled.div`
  text-align: center;
  color: red;
  font-size: 12px;
  font-weight: 600;
`;

const ErrorMsg = ({ message }) => {
  return <MessageBox>{message}</MessageBox>;
};

export default ErrorMsg;
