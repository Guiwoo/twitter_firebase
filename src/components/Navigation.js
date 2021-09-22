import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { CoreTitle } from "./Auth/Title";
import original from "assets/original.jpeg";
import mainImg from "assets/original.jpeg";
import myRoute from "variables/routeName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonBooth, faUser } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid ${(props) => props.theme.fontColor};
  padding: 10px 0px;
  margin-bottom: 50px;
  width: 100%;
`;
const CenterBox = styled.div`
  cursor: pointer;
  width: 33%;
  display: flex;
  justify-content: center;
  &:hover {
    transform: scale(1.1);
  }
`;
const MainImage = styled.img`
  width: 200px;
  height: 70px;
`;
const TheTitle = styled.div`
  font-weight: 600;
  font-family: "Bonheur Royale", cursive;
`;
const Mybox = styled.div`
  margin-top: 20px;
  width: 33%;
  display: flex;
  justify-content: flex-end;
`;
const MyProfile = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: ${(props) => props.theme.fontColor};
  &:hover {
    transform: scale(1.1);
  }
`;
const OnOffDark = styled.div`
  margin-bottom: 10px;
`;
const CheckBoxSection = styled.div`
  display: flex;
  button {
    margin-right: 5px;
  }
`;
const DarkButton = styled.button`
  border: 1px solid white;
  border-radius: 20px;
  background-color: #f68726;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
const InnerDiv = styled.button`
  border: 3px solid gold;
  width: 40px;
  height: 20px;
  border-radius: 20px;
  position: relative;
  background-color: ${(props) => props.theme.bgColor};
  cursor: pointer;
  div {
    position: absolute;
    top: -3px;
    left: -4px;
    width: 20px;
    height: 20px;
    background-color: rgb(0, 150, 255);
    border-radius: 10px;
    margin-left: ${(props) => (props.isDark ? "0px" : "20px")};
  }
`;

const Navigation = ({ userObj, toggleDarkMode, darkMode }) => {
  const history = useHistory();
  return (
    <Container>
      <div style={{ width: "33%" }}>
        <CoreTitle src={original} />
      </div>
      <CenterBox onClick={() => history.push(myRoute.HOME)}>
        <div>
          <MainImage src={mainImg} />
          <TheTitle>Show me your Fantasy ROE</TheTitle>
        </div>
      </CenterBox>
      <Mybox>
        <div>
          <OnOffDark>
            <CheckBoxSection>
              <DarkButton onClick={toggleDarkMode}>
                {darkMode ? "Bright" : "Dark"}
              </DarkButton>
              <InnerDiv isDark={darkMode} onClick={toggleDarkMode}>
                <div></div>
              </InnerDiv>
            </CheckBoxSection>
          </OnOffDark>
          <MyProfile to={myRoute.PROFILE}>
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faUser}
              size={"lg"}
            />
            {userObj.displayName}'s' Profile
          </MyProfile>
        </div>
      </Mybox>
    </Container>
  );
};

export default Navigation;
