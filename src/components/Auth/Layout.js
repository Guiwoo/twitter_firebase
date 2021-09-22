import LoginImage from "components/Image/LoginImage";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c2c2c;
`;
const MainBox = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.8);
  padding: 40px 20px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MainBox>{children}</MainBox>
      </div>
    </Container>
  );
};

export default Layout;
