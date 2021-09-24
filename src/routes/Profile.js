import { updateProfile } from "@firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "components/Home/HomeShared";
import { Btn } from "components/Shared";
import { authService, dbService } from "fBase";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";

const SecondBox = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid gold;
  padding: 40px 40px;
`;

const TitleBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

const Profile = ({ userObj, refreshUser }) => {
  let updateName;
  const history = useHistory();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      update: userObj.displayName,
    },
  });
  const getMyTwitts = async () => {
    const q = query(
      collection(dbService, "twitt"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => console.log(doc.id));
  };
  const onValid = (data) => {
    updateName = data?.update;
    if (updateName !== userObj.displayName) {
      updateProfile(authService.currentUser, {
        displayName: updateName,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getMyTwitts();
  });
  useEffect(() => {}, [updateName]);
  return (
    <Container>
      <div style={{ width: "33%" }} />
      <SecondBox>
        <div>
          <TitleBox>
            <div>닉네임 수정</div>
            <Btn style={{ marginLeft: "5px" }}>
              <FontAwesomeIcon icon={faEdit} size="lg" />
            </Btn>
          </TitleBox>
          <form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("update", { required: true })}
              type="text"
              placeholder="Edit Display Name"
            />
            <input type="submit" value="수정하기" />
          </form>
        </div>
      </SecondBox>
      <div style={{ width: "33%" }} />
    </Container>
  );
};

export default Profile;
