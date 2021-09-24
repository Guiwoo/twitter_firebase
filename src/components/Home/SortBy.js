import React from "react";
import styled from "styled-components";

const SortTitle = styled.div`
  position: absolute;
  right: 0;
  font-size: 12px;
  display: flex;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;
const ItemBox = styled.div`
  display: flex;
`;

const SortBox = styled.div`
  font-weight: 600;
  opacity: ${(props) => (props.sortLikes ? 0.3 : 1)};
  border: 1px solid ${(props) => props.theme.fontColor};
  padding: 1px 3px;
  border-radius: 20px;
`;

const SortBy = ({ onToggleSort, sortLikes }) => {
  return (
    <SortTitle onClick={onToggleSort}>
      <div>
        <div>Sort By</div>
        <ItemBox>
          <SortBox sortLikes={sortLikes}>Likes</SortBox>
          <div style={{ margin: "0px 3px" }}>/</div>
          <SortBox sortLikes={!sortLikes}>Latest</SortBox>
        </ItemBox>
      </div>
    </SortTitle>
  );
};

export default SortBy;
