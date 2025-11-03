import React from "react";
import { useParams } from "react-router-dom";
import UserDetailClass from "./UserDetailClass";

function UserDetailClassWrapper() {
  const { id } = useParams();
  return <UserDetailClass userId={id} />;
}

export default UserDetailClassWrapper;
