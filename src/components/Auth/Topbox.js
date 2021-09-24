import styled from "styled-components";

export const TopBox = styled.div`
  margin-bottom: 30px;
  form {
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 7px;
      padding: 10px 20px;
      &:last-child {
        border-radius: 20px;
        font-weight: 600;
        &:hover {
          color: gold;
        }
      }
    }
  }
`;
