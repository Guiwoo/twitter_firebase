import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 160px;
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const TwittInput = styled.input`
  width: 100%;
  padding: 5px 20px;
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 2px solid ${(props) => props.theme.fontColor};
  margin-bottom: 3px;
`;
export const TwittBtn = styled.button`
  position: absolute;
  right: -80px;
  top: -1px;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
`;
export const TwittBox = styled.div`
  margin: 30px 0px;
  width: 400px;
  border: 2px solid ${(props) => props.theme.gold};
  position: relative;
  padding: 10px 5px;
`;
export const TwittTitle = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px 10px;
  top: -10px;
  left: -10px;
`;
