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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import Preview from "components/Home/Preview";
import { Btn } from "components/Shared";
import {
  Container,
  FormBox,
  TwittInput,
  TwittBtn,
  TwittTitle,
  TwittBox,
} from "components/Home/HomeShared";
import SortBy from "components/Home/SortBy";
import ThirdBox from "components/Home/ThirdBox";

const Home = ({ userObj }) => {
  const { location } = useHistory();
  const [twittData, setTwittData] = useState([]);
  const [preview, setPreview] = useState(null);
  const { handleSubmit, register, setValue } = useForm();
  const [sortLikes, setSortLikes] = useState(true);
  if (location.state !== "") {
    updateProfile(authService.currentUser, {
      displayName: location.state,
    });
  }
  const onToggleSort = () => {
    setSortLikes(!sortLikes);
  };
  const onValid = async (data) => {
    const { twitt, file } = data;
    console.log(data);
    let publicImageUrl = "";
    if (file.length > 0) {
      const filePath = `${authService.currentUser.uid}//${file[0].name}`;
      const newImageRef = ref(storageService, filePath);
      await uploadBytesResumable(newImageRef, file[0]);
      publicImageUrl = await getDownloadURL(newImageRef);
    }
    try {
      await addDoc(collection(dbService, "twitt"), {
        text: twitt,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        totalLikes: 0,
        ImageUrl: {
          publicImageUrl,
          isLikes: false,
        },
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
      orderBy(
        !sortLikes ? "totalLikes" : "createdAt",
        !sortLikes ? "desc" : "desc"
      )
    );
    getResult(q);
  }, [sortLikes]);
  const fileOnChnage = (e) => {
    const previewFile = URL.createObjectURL(e.target.files[0]);
    setPreview(previewFile);
  };
  return (
    <Container>
      <div style={{ width: "33%" }}></div>
      <div style={{ width: "33%", marginRight: "180px" }}>
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
          <input
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
          <SortBy onToggleSort={onToggleSort} sortLikes={sortLikes} />
          {twittData.map((t) => (
            <Twitt
              key={t.id}
              twittObj={t}
              isOwner={t.creatorId === userObj.uid}
            />
          ))}
        </TwittBox>
      </div>
      <ThirdBox style={{ width: "33%" }} />
    </Container>
  );
};

export default Home;
