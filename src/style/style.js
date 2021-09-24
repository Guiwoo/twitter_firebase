import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const birghtTheme = {
  bgColor: "white",
  fontColor: "black",
  gold: "gold",
};

export const darkTheme = {
  bgColor: "black",
  fontColor: "white",
  gold: "gold",
};

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  body{
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.fontColor};
  }
`;

export default GlobalStyle;
