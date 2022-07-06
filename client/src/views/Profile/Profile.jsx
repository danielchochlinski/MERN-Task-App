import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../utils/userContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.token);
  console.log(user);
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks", {
        method: "GET",
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((response) => {
        console.log(response);
      });
  }, [user]);

  return <div>Profile</div>;
};

export default Profile;
