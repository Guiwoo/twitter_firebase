import { updateProfile } from "@firebase/auth";
import { authService } from "fBase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";

const SetName = styled.div``;

const SetDisplayName = ({ userObj }) => {
  const { handleSubmit, register } = useForm();
  const history = useHistory();
  const onValid = async (data) => {
    const { displayName } = data;
    await updateProfile(authService.currentUser, {
      displayName,
    });
  };
  return (
    <SetName>
      <h3>Before starting set your nickname first !!</h3>
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="displayName">Nickname</label>
        <input
          {...register("displayName", { required: true })}
          id="displayName"
        />
        <input type="submit" value="Done" />
      </form>
    </SetName>
  );
};

export default SetDisplayName;
