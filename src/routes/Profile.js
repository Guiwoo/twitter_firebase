import { updateProfile } from "@firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { authService, dbService } from "fBase";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

const Profile = ({ userObj, refreshUser }) => {
  let updateName;
  const history = useHistory();
  const { handleSubmit, setValue, register } = useForm({
    defaultValues: {
      update: userObj.displayName,
    },
  });
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
    refreshUser();
  };

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
  }, []);
  useEffect(() => {}, [updateName]);
  return (
    <div>
      <span>Profile</span>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("update", { required: true })}
          type="text"
          placeholder="Edit Display Name"
        />
        <input type="submit" value="Edit Name" />
      </form>
      <button onClick={onLogoutClick}>Log out</button>
    </div>
  );
};

export default Profile;
