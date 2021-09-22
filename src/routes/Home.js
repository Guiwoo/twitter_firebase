import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import Twitt from "components/Twitt";
import { authService, dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { updateProfile } from "@firebase/auth";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import Preview from "components/Home/Preview";
import { Btn } from "components/Shared";
import { faCamera, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;
const TwittInput = styled.input`
  width: 100%;
  padding: 5px 20px;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.fontColor};
  margin-bottom: 3px;
`;
const FileInput = styled.input``;
const TwittBtn = styled.button`
  position: absolute;
  right: -80px;
  top: -1px;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
`;
const TwittBox = styled.div`
  margin: 30px 0px;
  width: 400px;
  border: 2px solid ${(props) => props.theme.gold};
  position: relative;
`;
const TwittTitle = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px 10px;
  top: -10px;
  left: -10px;
`;

const Home = ({ userObj }) => {
  const { location } = useHistory();
  const [twittData, setTwittData] = useState([]);
  const [preview, setPreview] = useState(null);
  const { handleSubmit, register, setValue } = useForm();
  if (location.state !== "") {
    updateProfile(authService.currentUser, {
      displayName: location.state,
    });
  }
  const onValid = async (data) => {
    const { twitt, file } = data;
    console.log(data);
    let publicImageUrl = "";
    if (file.length > 0) {
      const filePath = `${authService.currentUser.uid}//${file[0].name}`;
      const newImageRef = ref(storageService, filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file[0]);
      publicImageUrl = await getDownloadURL(newImageRef);
    }
    try {
      const docRef = await addDoc(collection(dbService, "twitt"), {
        text: twitt,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        totalLikes: 0,
        publicImageUrl,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setValue("twitt", "");
      setValue("file", "");
      setPreview(null);
    }
  };
  const getResult = async (q) => {
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      const newArray = QuerySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTwittData(newArray);
    });
    return unsub;
  };
  useEffect(() => {
    const q = query(
      collection(dbService, "twitt"),
      orderBy("createdAt", "desc")
    );
    getResult(q);
  }, []);
  const fileOnChnage = (e) => {
    const previewFile = URL.createObjectURL(e.target.files[0]);
    setPreview(previewFile);
  };
  return (
    <Container>
      <div>
        {preview ? (
          <>
            <Preview preview={preview} />
            <Btn onClick={() => setPreview(null)}>Clear</Btn>
          </>
        ) : null}
        <FormBox onSubmit={handleSubmit(onValid)}>
          <TwittInput
            {...register("twitt", {
              required: "Must write something before twitting",
              maxLength: 240,
            })}
            type="text"
            placeholder="당신의 최고의 수익률 을 남겨주세요...!"
          />
          <FileInput
            {...register("file")}
            type="file"
            accept="image/*"
            onChange={fileOnChnage}
          />
          <TwittBtn type={"submit"}>
            <FontAwesomeIcon icon={faBitcoin} size={"2x"} />
          </TwittBtn>
        </FormBox>
        <TwittBox>
          <TwittTitle>Twitt 💚</TwittTitle>
          {twittData.map((t) => (
            <Twitt
              key={t.id}
              twittObj={t}
              isOwner={t.creatorId === userObj.uid}
            />
          ))}
        </TwittBox>
      </div>
    </Container>
  );
};

export default Home;
