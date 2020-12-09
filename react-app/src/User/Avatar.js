import React from "react";
import { useSelector } from "react-redux";

const Avatar = () => {
  const avatar = useSelector((state) => state.avatar.avatar);

  return (
    <>
      <div>
        <h2>Avatar</h2>
        Hair: {avatar.hair}, Face: {avatar.face}, Body: {avatar.body}
      </div>
    </>
  );
};

export default Avatar;
