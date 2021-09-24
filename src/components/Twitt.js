import { deleteDoc, doc, setDoc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import {
  faCloudUploadAlt,
  faEdit,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Btn } from "./Shared";

const Container = styled.div`
  margin: 30px 10px;
  display: flex;
  justify-content: center;
  padding: 5px;
`;
const GridDiv = styled.div`
  width: 98%;
  height: 80px;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 20px;
  position: relative;
`;
const TwittBoxes = styled.div`
  display: flex;
  margin-left: 20px;
  align-items: center;
`;
const TwittTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const Image = styled.img`
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(10);
    z-index: 22;
  }
`;
const Btns = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;
const LikesBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TimeSection = styled.div`
  position: absolute;
  font-size: 12px;
  right: 8px;
  top: 4px;
  opacity: 0.7;
  font-weight: 600;
`;

const Twitt = ({ twittObj, isOwner }) => {
  const { register, handleSubmit } = useForm();
  const [editForm, setEditform] = useState(false);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this Twitt ?");
    if (ok) {
      await deleteDoc(doc(dbService, "twitt", twittObj.id));
      await deleteObject(ref(storageService, twittObj.publicImageUrl));
    }
  };
  const onEditClick = () => {
    setEditform(!editForm);
  };
  const onLikeClick = async () => {
    const data = {
      text: twittObj.text,
      createdAt: twittObj.createdAt,
      creatorId: twittObj.creatorId,
      totalLikes: twittObj.ImageUrl.isLikes
        ? twittObj.totalLikes === 0
          ? 0
          : twittObj.totalLikes - 1
        : twittObj.totalLikes + 1,
      ImageUrl: {
        publicImageUrl: twittObj.ImageUrl.publicImageUrl,
        isLikes: !twittObj.ImageUrl.isLikes,
      },
    };
    await setDoc(doc(dbService, "twitt", twittObj.id), data);
  };
  const onValid = async (data) => {
    const { edit } = data;
    await updateDoc(doc(dbService, "twitt", twittObj.id), {
      text: edit,
    });
    setEditform(!editForm);
  };
  const timeConversion = (atThatTime) => {
    const pastTime = Date.now() - atThatTime;
    if (pastTime > 3600000) {
      return Math.floor(pastTime / 3600000) + "시간전";
    } else if (60000 <= pastTime <= 360000) {
      return Math.floor(pastTime / 60000) + "분전";
    } else {
      return Math.floor(pastTime / 1000) + "초전";
    }
  };
  const pastTime = timeConversion(twittObj.createdAt);
  return (
    <Container>
      {editForm ? (
        <GridDiv>
          <FontAwesomeIcon icon={faBitcoin} size={"lg"} />
          <TwittBoxes style={{ maxWidth: "100%" }}>
            <form style={{ display: "flex" }} onSubmit={handleSubmit(onValid)}>
              <input
                {...register("edit", { required: true })}
                type="text"
                defaultValue={twittObj.text}
                style={{ padding: "0px 50px" }}
              />
              <Btn type="submit" style={{ marginLeft: "10px" }}>
                <FontAwesomeIcon icon={faCloudUploadAlt} size={"sm"} />
              </Btn>
            </form>
            <Btn onClick={() => setEditform(!editForm)}>cancel</Btn>
          </TwittBoxes>
        </GridDiv>
      ) : (
        <GridDiv>
          <FontAwesomeIcon icon={faBitcoin} size={"lg"} />
          <TwittBoxes>
            {twittObj.ImageUrl.publicImageUrl && (
              <div>
                <Image src={twittObj.ImageUrl.publicImageUrl} />
                <LikesBtn style={{ display: "flex" }}>
                  <FontAwesomeIcon icon={faHeart} size={"sm"} color={"red"} />
                  <div
                    style={{
                      marginLeft: "3px",
                      fontSize: "15px",
                      alignItems: "center",
                    }}
                  >
                    {twittObj.totalLikes}
                  </div>
                </LikesBtn>
              </div>
            )}
            <div>
              <TwittTitle>{twittObj.text}</TwittTitle>
            </div>
            <Btns>
              <Btn onClick={onLikeClick}>
                <FontAwesomeIcon
                  icon={!twittObj.ImageUrl.isLikes ? faThumbsUp : faThumbsDown}
                />
              </Btn>
              {isOwner && (
                <>
                  <Btn onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} size="sm" />
                  </Btn>
                  <Btn onClick={onEditClick}>
                    <FontAwesomeIcon icon={faEdit} size="sm" />
                  </Btn>
                </>
              )}
            </Btns>
          </TwittBoxes>
          <TimeSection>
            <div>{pastTime}</div>
          </TimeSection>
        </GridDiv>
      )}
    </Container>
  );
};

export default Twitt;
