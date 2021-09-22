import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Btn } from "./Shared";

const Container = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
`;
const GridDiv = styled.div`
  width: 100%;
  display: flex;
`;

const Twitt = ({ twittObj, isOwner }) => {
  const { register, setValue, handleSubmit } = useForm();
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
  const onValid = async (data) => {
    const { edit } = data;
    await updateDoc(doc(dbService, "twitt", twittObj.id), {
      text: edit,
    });
    setEditform(!editForm);
  };
  return (
    <Container>
      {editForm ? (
        <>
          <form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("edit", { required: true })}
              type="text"
              defaultValue={twittObj.text}
            />
            <input type="submit" value={"Update"} />
          </form>
          <Btn onClick={() => setEditform(!editForm)}>cancel</Btn>
        </>
      ) : (
        <GridDiv>
          <FontAwesomeIcon icon={faBitcoin} size={"lg"} />
          <div>
            <h5>{twittObj.text}</h5>
            {twittObj.publicImageUrl && (
              <img width={50} height={50} src={twittObj.publicImageUrl} />
            )}
            {isOwner && (
              <>
                <Btn onClick={onDeleteClick}>Delete Btn</Btn>
                <Btn onClick={onEditClick}>Edit Btn</Btn>
              </>
            )}
          </div>
        </GridDiv>
      )}
    </Container>
  );
};

export default Twitt;
