import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 300px;
  height: 300px;
`;

const Preview = ({ preview }) => {
  return <Image src={preview} />;
};

export default Preview;
