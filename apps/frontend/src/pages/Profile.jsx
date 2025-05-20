import React, { useContext, useEffect } from "react";
import { getProfile } from "../api";
import { AppContext } from "../context/AuthContext";
import UserProfileCard from "../components/profile/UserProfileCard";

const Profile = () => {
  const token = localStorage.getItem("token");
  const { setUser, user } = useContext(AppContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const profileResponse = await getProfile();
        console.log("profileResponse", profileResponse);
        if (profileResponse.success) {
          setUser(profileResponse.data);
        } else {
          setUser(null);
        }
      }
    };
    fetchUser();
  }, [token, setUser]);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5  lg:p-6">
      <h3 className="mb-5 text-xl font-semibold text-gray-800 text-left lg:mb-7">
        Profile
      </h3>
      <UserProfileCard token={token} user={user} setUser={setUser} />
    </div>
  );
};

export default Profile;
